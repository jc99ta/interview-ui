<script>
    import {Alert, Icon} from "svelte-materialify";
    import {mdiAlert} from '@mdi/js';
    export let errors = [];
</script>

{#if errors.length > 0}

        {#each errors as error}
            <Alert class="error-color">
                <div slot="icon">
                    <Icon path={mdiAlert} />
                </div>
                {error}
            </Alert>
        {/each}
{/if}
