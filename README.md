# Loadable component for Svelte 3

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

If you are **not** using ES6, instead of importing add 

```html
<script src="/path/to/svelte-viewpoint/index.js"></script>
```

just before closing body tag.

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

## LEGEND

### Viewpoint does exactly 2 things:
1) Switches components (mounts them), in the same way for static and dynamic components (via `import()`). Also proxies all additional props on the Viewpoint tag directly into the component.
2) If there is a preload () inside the mounted component in `<script context="module">`, before mounting it, it resolves the result of this function (an object or a promise with an object) and rolls this object over the props of the component - that is, the component is mounted immediately with the data.

But, when we deal with asynchronous operations, especially when it comes to Network, we need to track several states at once and somehow reflect them for the user.

PROMISE:
- resolved - show the component;
- rejected - then show the content of the error slot;
- pending - then it would seem that we show the content of the loading slot.

![alt text](https://in-sign.ru/tmp/vp-timeline.jpg)

However, most often the components arrive super-fast, but sometimes not as fast as the svelte can render the slot. Because of this, the loading slot blinks for a second and is immediately replaced by a component. This is no good.

The `delay:Number` props helps us with this, it postpones the loading slot by several ms so as not to show the loader at all, if everything is flying.

But there is also the opposite situation, when a component or preload (follow each other) was delayed. And after a certain number of seconds of showing the loader, the user may have the feeling that everything is frozen.

To avoid this, there is an optional opportunity to set the `timeout:Number` props and put additional content in the waiting slot, which will somehow ask the user to “wait a little longer, they say all the rules, we are working and are not frozen”. That is, after the timeout expires, the waiting slot is shown instead of the loading slot. Of course, if it is set and timeout! == 0 (zero disables this feature, the default value).

In addition, the patience of the user is not infinite, or the download may freeze and not fall into reject long enough until the network timeout expires. This can be prohibitively long for an application. Therefore, there is an `abort:Number` props that manually drops the promise into the rejected state and shows the content of the error slot.

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
