import { SvelteComponent, SvelteComponentTyped } from 'svelte';

type DynamicSvelteComponent = () => Promise<typeof import('*.svelte')>;

export interface Props {
    component: SvelteComponent | DynamicSvelteComponent | null;
    preloading?: boolean;
    timeout?: number;
    delay?: number;
    abort?: number;
    [name: string]: any;
}

declare class Viewpoint extends SvelteComponentTyped<Props> {}
export default Viewpoint;
