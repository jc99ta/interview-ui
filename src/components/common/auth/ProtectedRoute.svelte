<script>
    import { Route, Link } from 'svelte-routing';
    import AccessDenied from '../../../pages/AccessDenied.svelte';
    import { token } from '../../../stores/token.js';

    export let path;
    export let component;

    let isAuthenticated = false;
    token.subscribe((t)=>{
        isAuthenticated = t;
    });
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={AccessDenied} />
{/if}
