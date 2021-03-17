<script>

</script>
<style>
    .timeline__marker{
        height:8px;
        width:8px;
        position:absolute;
        background-color:red;
        left:50%;
        border-radius:50%;
        transition:height, width.25s;
        top:24%;
        transform:translateX(-50%);
        box-shadow:1px 1px 1px #999;
        cursor:pointer;

    }
    .timeline__marker:hover{
        height:10px;
        width:10px;
        box-shadow:1px 1px 3px #aaa;

    }
</style>
<div class="timeline__marker"></div>
