<script>
    import {
        Button,
        Card,
        Row,
        Col,
        CardActions,
        Icon,
        CardTitle,
        CardText
    } from 'svelte-materialify';

    import {mdiCalendarPlus, mdiAccountPlus, mdiDelete} from "@mdi/js";

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function deleteOpportunity(){
        dispatch('deleteOpportunity',{id:opportunity.id});
    }

    function createContact(){
        dispatch('createContact',{id:opportunity.id});
    }

    function createInterview(){
        dispatch('createInterview',{id:opportunity.id});
    }

    export let opportunity;
</script>
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
            <Button class="red-text" text on:click={()=>deleteOpportunity()}><Icon path={mdiDelete} /></Button>
            <Button text on:click={createContact(opportunity.id)}><Icon path={mdiAccountPlus} /></Button>
            <Button text on:click={createInterview(opportunity.id)}><Icon path={mdiCalendarPlus} /></Button>
        </CardActions>
    </Card>
</Col>
