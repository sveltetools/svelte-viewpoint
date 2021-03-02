import { SvelteComponent, SvelteComponentTyped } from 'svelte';

export interface ViewpointProps {
    component: SvelteComponent | null;
    preloading: boolean;
    timeout: number;
    delay: number;
    abort: number;
}

export declare class Viewpoint extends SvelteComponentTyped<ViewpointProps> {}
