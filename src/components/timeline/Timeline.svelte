<script>
    import EventMarker from "./EventMarker.svelte";



</script>
<style>
    .timeline{
        width:3px;
        background-color:#ccc;
        height:90vh;
        border-radius:3px;
        margin-top:2rem;
        margin-bottom:2rem;
        position:relative;
        display:inline-block;
        left:50%;
        transform: translateX(-50%);

    }
</style>

<div class="timeline"><EventMarker /></div>
