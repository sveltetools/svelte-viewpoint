{#await Promise.resolve().then(wait).then(load).then(preload)}
  {#if !timeoutTimer}
    <slot name="waiting" />
  {:else if !delayTimer}
    <slot name="loading" />
  {/if}
{:then comp}
  {#if comp}
    <svelte:component this={comp} {...props} {...state} />
  {/if}
{:catch error}
  <slot name="error" {error} />
{/await}

<script>
	let component = null,
		preloading = true,
		props = null,
		state = null,
		timeoutTimer,
		delayTimer,
		delay = 200,
		timeout,
		abort;

	$: {
		const {
			preloading,
			component,
			timeout,
			delay,
			abort,
			...other
		} = $$props;

		props = other;
	}

	$: load = function() {
		return new Promise((resolve, reject) => {
			let abortTimer;

			Promise.resolve(
				typeof component === "function" ?
					component() : component
			).then(m => {
				clearTimeout(abortTimer);
				resolve(m);
			});

			abort && (abortTimer = setTimeout(() => {
				reject(new Error("Aborted by timeout."));
			}, abort));
		});
	};

	function wait() {
		delayTimer = setTimeout(() => {
			delayTimer = clearTimeout(delayTimer);
		}, delay || 0);

		timeout && (timeoutTimer = setTimeout(() => {
			timeoutTimer = clearTimeout(timeoutTimer);
		}, timeout));
	}

	function preload(m) {
		return (m && Promise.resolve(
			preloading && typeof m.preload === "function" ?
				m.preload(props) : undefined
		).then((data = {}) => {
			state = data;
			return m.default || m;
		}));
	}

	export { preloading, component, timeout, delay, abort };
</script>
