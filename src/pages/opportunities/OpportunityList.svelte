<script>
    import {navigate} from "svelte-routing";
    import { onMount } from 'svelte';
    import {token} from "../../stores/token";
    import {
        Button,
        Card,
        Row,
        Col,
        CardActions,
        CardTitle,
        CardText
    } from 'svelte-materialify';
    import {get, post} from '../../util/request';

    let opportunities = [];

    async function loadOpportunities(){
        const res = await get({url:`opportunities/list`,token:$token});
        opportunities = await res.json();
    }

    onMount(async () => {
       await loadOpportunities();
    });

    function add(){
        navigate("create-opportunity");
    }

    function remove(id) {
        post({url: `opportunities/delete`, body:{id:id}, token: $token}).then(loadOpportunities);


    }

</script>
<h2>Opportunities</h2>
<Row>
    <Col class="text-right"><Button color={'primary'} on:click={add}>Add Opportunity</Button></Col>
</Row>


{#if opportunities.length > 0}
    {#each opportunities as opportunity}
       <Card>
           <CardTitle>{opportunity.name}</CardTitle>
           <CardText>
               {opportunity.description}
               <Row>
                   <Col>
                       Priority:{opportunity.priority}
                   </Col>
               </Row>
           </CardText>
           <CardActions>
               <Button color="danger" outline="true" on:click={()=>remove(opportunity.id)}>Delete</Button>
               <Button color="primary" outline="true">Add Contact</Button>
               <Button color="primary">Add Interview</Button>
           </CardActions>
       </Card>
    {/each}
{/if}
