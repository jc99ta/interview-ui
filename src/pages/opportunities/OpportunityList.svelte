<script>
    import {navigate} from "svelte-routing";
    import {onMount} from 'svelte';
    import {token} from "../../stores/token";
    import {
        Button,
        Card,
        Row,
        Col,
        CardActions,
        Snackbar,
        Icon,
        CardTitle,
        CardText
    } from 'svelte-materialify';
    import {mdiCalendarPlus, mdiAccountPlus, mdiDelete} from "@mdi/js";
    import {get, post} from '../../util/request';
    import Timeline from "../../components/timeline/Timeline.svelte";

    let opportunities = [];
    let confirm = false;
    let toDelete = -1;

    async function loadOpportunities() {
        const res = await get({url: `opportunities/list`, token: $token});
        opportunities = await res.json();
    }

    onMount(async () => {
        await loadOpportunities();
    });

    function deleteOpportunity(id) {
        toDelete = id;
        confirm = true;
    }

    function createContact(opportunityId) {
        navigate('create-contact', {state: {opportunityId: opportunityId}});
    }

    function add() {
        navigate("create-opportunity");
    }

    function remove(id) {
        post({url: `opportunities/delete`, body: {id: id}, token: $token}).then(loadOpportunities);


    }

</script>
<style>
    /** TODO: not showing  border **/
    .timeline-wrap{
        border:1px solid #ccc;
        padding:12px;
        margin-right:12px;
        margin-top:12px;
        display:inline-block;
    }
</style>
<h2>Opportunities</h2>
<Row>
    <Col class="timeline-wrap" cols="12" sm="2">
        <Timeline />
    </Col>
    <Col cols="12" sm="10">

        <Row>
            <Col class="text-right"><Button color={'primary'} on:click={add}>Add Opportunity</Button></Col>
        </Row>


        {#if opportunities.length > 0}
            <Row>
                {#each opportunities as opportunity}
                    <Col lg="3" md="4" sm="6" xs="12">
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
                            <CardActions class="text-right">
                                <Button class="red-text" text on:click={()=>deleteOpportunity(opportunity.id)}><Icon path={mdiDelete} /></Button>
                                <Button text on:click={createContact(opportunity.id)}><Icon path={mdiAccountPlus} /></Button>
                                <Button text><Icon path={mdiCalendarPlus} /></Button>
                            </CardActions>
                        </Card>
                    </Col>
                {/each}
            </Row>

            <Snackbar class="flex-column" bind:active={confirm} bottom center timeout={5000}>
                Are you sure you want to delete this opportunity?
                <div class="mt-1">
                    <Button text class="success-text"
                            on:click={() => {
                        confirm = false;

                        remove(toDelete);
                          toDelete = -1;

                      }}>Confirm</Button>
                    <Button
                            class="red-text"
                            text
                            on:click={() => {
                        confirm = false;
                        toDelete = -1;
                      }}>
                        Cancel
                    </Button>
                </div>
            </Snackbar>

        {/if}

    </Col>
</Row>
