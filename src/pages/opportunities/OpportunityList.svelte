<script>
    import {navigate} from "svelte-routing";
    import {onMount} from 'svelte';
    import {token} from "../../stores/token";
    import {Button, Col, Row, Snackbar} from 'svelte-materialify';

    import {get, post} from '../../util/request';
    import Timeline from "../../components/timeline/Timeline.svelte";
    import Opportunity from "./Opportunity.svelte";

    let opportunities = [];
    let confirm = false;
    let toDelete = -1;
    let showInterviewModal = false;
    let interviewOpportunityId;

    async function loadOpportunities() {
        const res = await get({url: `opportunities/list`, token: $token});
        opportunities = await res.json();
    }

    onMount(async () => {
        await loadOpportunities();
    });

    function createInterview(event) {
        showInterviewModal = true;
        interviewOpportunityId = event.detail.id;

    }

    function deleteOpportunity(event) {
        toDelete = event.detail.id;
        confirm = true;
    }

    function createContact(event) {
        navigate('create-contact', {state: {opportunityId: event.detail.id}});
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
    .timeline-wrap {
        border: 1px solid #ccc;
        padding: 12px;
        margin-right: 12px;
        margin-top: 12px;
        display: inline-block;
    }
</style>
<h2>Opportunities</h2>
<Row>
    <Col class="timeline-wrap" cols="12" sm="2">
        <Timeline/>
    </Col>
    <Col cols="12" sm="10">

        <Row>
            <Col class="text-right">
                <Button color={'primary'} on:click={add}>Add Opportunity</Button>
            </Col>
        </Row>


        {#if opportunities.length > 0}
            <Row>
                {#each opportunities as opportunity}
                    <Opportunity on:createInterview={createInterview}
                                 on:createContact={createContact}
                                 on:deleteOpportunity={deleteOpportunity}
                                 opportunity={opportunity}/>
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

                      }}>Confirm
                    </Button>
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
