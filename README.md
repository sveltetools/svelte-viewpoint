# Super tiny, loadable component for SvelteJS with blackjack and data preloading.

[![NPM version](https://img.shields.io/npm/v/svelte-viewpoint.svg?style=flat)](https://www.npmjs.com/package/svelte-viewpoint) [![NPM downloads](https://img.shields.io/npm/dm/svelte-viewpoint.svg?style=flat)](https://www.npmjs.com/package/svelte-viewpoint)

## Features

- Static & dynamic components.
- `loading` placeholder component with delay.
- `waiting` placeholder component after timeout.
- `error` component.
- Proxes any additional props to target component.
- Preloads target component data using Sapper-like `preload` function in context of module.

## Install

```bash
npm i svelte-viewpoint --save-dev
```

```bash
yarn add svelte-viewpoint
```

CDN: [UNPKG](https://unpkg.com/svelte-viewpoint/) | [jsDelivr](https://cdn.jsdelivr.net/npm/svelte-viewpoint/) (available as `window.Viewpoint`)

```html
<script src="https://unpkg.com/svelte-viewpoint/dist/viewpoint.min.js"></script>

<!-- OR in modern browsers -->

<script type="module" src="https://unpkg.com/svelte-viewpoint/dist/viewpoint.min.mjs"></script>
```

## Usage

```html
<Viewpoint {component} />

<script>
	import Viewpoint from 'svelte-viewpoint';

	const component = () => import('./Component.svelte');
</script>
```

### Using loading, waiting & error components.

```html
<Viewpoint {component} timeout={3000} delay={500}>
	<div slot="loading">
		<Spinner />
	</div>
	<div slot="waiting">
		Wait for a few seconds, please...
	</div>
	<div slot="error" let:error>
		<Error {error} />
	</div>
</Viewpoint>

<script>
	import Viewpoint from 'svelte-viewpoint';

	import Error from './Error.svelte';
	import Spinner from './Spinner.svelte';

	const component = () => import('./Component.svelte');
</script>
```

### Pass any additional props and `preload` function.

```html
<Viewpoint {component} {user} />

<script>
	import Viewpoint from 'svelte-viewpoint';

	const component = () => import('./UserProfile.svelte');

	let user = { firstname: 'John', lastname: 'Doe' };
</script>
```

Define `preload` in `UserProfile.svelte`:

```html
<script context="module">
	export async function preload({ user }) {
		const res = await fetch(`/user/${user.id}/messages`);
		const messages = res.json();
		return { messages };
	}
</script>

```

## API

## Props

| Name | Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| `component` | `Function` | Returns target component. | No | null |
| `delay` | `Number` | Delay in ms before the loading component is shown. | No | 200 |
| `timeout` | `Number` | Timeout in ms before the waiting component is shown. If not defined or 0 waiting component won't be shown. | No | 0 |
| `abort` | `Number` | Timeout in ms before target component loading will be aborted. If not defined or 0 loading won't be aborted until the error. | No | 0 |
| `preloading` | `Boolean` | Activates data preloading. | No | true |

## Slots
- `waiting` — elements to be placed on waiting
- `loading` — elements to be placed on loading
- `error` — elements to be placed on error

## License

MIT &copy; [PaulMaly](https://github.com/PaulMaly)
