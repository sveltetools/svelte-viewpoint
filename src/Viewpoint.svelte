{#await ($$restProps, Promise.resolve().then(wait).then(load).then(preload))}
	{#if timeout && !timeoutTimer}
		<slot name="waiting" />
	{:else if !delayTimer}
		<slot name="loading" />
	{/if}
{:then comp}
	{#if comp}
		<svelte:component this={comp} {...$$restProps} {...state} />
	{/if}
{:catch error}
	<slot name="error" {error} />
{/await}

<script>
	let component = null,
		preloading = true,
		state = null,
		timeoutTimer,
		delayTimer,
		delay = 200,
		timeout = 0,
		abort = 0;

	$: load = function () {
		return new Promise((resolve, reject) => {
			let abortTimer;

			Promise.resolve(
				typeof component === "function" &&
					!/^\s*class\s+/.test(component.toString()) // class, not a plain function
					? component()
					: component
			).then((m) => {
				clearTimeout(abortTimer);
				resolve(m);
			});

			abort &&
				(abortTimer = setTimeout(() => {
					reject(new Error("Aborted by timeout."));
				}, abort));
		});
	};

	function preload(m) {
		return (
			m &&
			Promise.resolve(
				preloading && typeof m.preload === "function"
					? m.preload($$restProps)
					: undefined
			).then((data = {}) => {
				state = data;
				return m.default || m;
			})
		);
	}

	function wait() {
		delay &&
			(delayTimer = setTimeout(() => {
				delayTimer = clearTimeout(delayTimer);
			}, delay));

		timeout &&
			(timeoutTimer = setTimeout(() => {
				timeoutTimer = clearTimeout(timeoutTimer);
			}, timeout));
	}

	export { preloading, component, timeout, delay, abort };
</script>
