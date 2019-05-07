# Svelte loadable components for Svelte 3 [demo]()

## Install

```bash
npm i svelte-viewpoint
```

## Simple usage

```html
<Viewpoint {component} />

<script>
	import Viewpoint from 'svelte-viewpoint';
	const component = () => import('./Component.svelte');
</script>
```