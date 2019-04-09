{#await
	Promise.resolve()
		.then(wait)
		.then(component)
		.then(preload)
}
	{#if showWaiting}
    <slot name="waiting">
        <svelte:component this={waiting()} />
    </slot>
	{:else if showLoading}
	<slot name="loading">
		<svelte:component this={loading()} />
	</slot>
	{/if}
{:then comp}
	{#if comp}
    <svelte:component this={comp} {...props} />
    {/if}
{:catch err}
	<slot name="error">
		<svelte:component this={error()} {err} />
	</slot>
{/await}

<script>
	let component = () => null,
		loading = () => null,
		waiting = () => null,
		error = () => null,
		preloading = false,
		delay = 200,
		timeout,
		props = null,
		showWaiting = false,
		showLoading = false,
		timeoutTimer,
		delayTimer;

	$: {
		let	{
			component, loading, waiting,
			error, delay, timeout, preloading, ...p
		} = $$props;

		props = p;
	}

	$: showLoading = !delayTimer;
	$: showWaiting = !timeoutTimer;

	function wait() {
		delayTimer = setTimeout(() => {
			delayTimer = clearTimeout(delayTimer);
		}, delay || 0);

		timeout && (timeoutTimer = setTimeout(() => {
			timeoutTimer = clearTimeout(timeoutTimer);
		}, timeout));
	}

	function preload(m) {
		return (
			preloading && typeof m.preload === 'function' ?
			m.preload(props) : Promise.resolve()
		).then((state = {}) => {
			props = { ...props, ...state };
			console.log('preload', props);
			return m.default || m;
		});
	}

	export {
		component,
		loading,
		waiting,
		error,
		delay,
		timeout,
		preloading
	};
</script>