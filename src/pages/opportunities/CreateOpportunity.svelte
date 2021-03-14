<script>
    import {Button, Alert, Row, Col, TextField, Select} from "svelte-materialify";
    import {navigate} from "svelte-routing";
    import {token} from '../../stores/token.js';
    import {post} from '../../util/request';
    import Error from "../../components/form/Error.svelte";

    const priorities = [
        {name: 1, value: 1},
        {name: 2, value: 2},
        {name: 3, value: 3},
        {name: 4, value: 4},
        {name: 5, value: 5},
        {name: 6, value: 6},
        {name: 7, value: 7},
        {name: 8, value: 8},
        {name: 9, value: 9},
        {name: 10, value: 10},
    ];

    let name = '';
    let description = '';
    let priority = 1;

    let errors = [];

    function cancel() {
        navigate('opportunities');
    }

    function validate() {

    }


    function handleSubmit(e) {
        if (errors.length < 1) {
            post({
                url: 'opportunities/create',
                body: {
                    name: name,
                    description: description,
                    priority: priority
                },
                token: $token
            })
                .then(() => navigate("opportunities"))
                .catch(e => console.error(e));
        }
        e.preventDefault();
    }


</script>

<h2>Create opportunity</h2>

<form on:submit={handleSubmit}
      on:input={validate}
      on:changed={validate}
      on:invalid={validate}
      method="POST">
    <Error bind:errors={errors} />

    <Row>
        <Col>
             <TextField required bind:value={name}>Name</TextField>
        </Col>
        <Col>
            <TextField required bind:value={description}>Description</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <Select items={priorities}>Priority</Select>
        </Col>

    </Row>

    <Row>
        <Col>
            <Button color={'primary'} outline="true" on:click={cancel}>Cancel</Button>
            <Button  color={'primary'} type="submit">Create</Button>
        </Col>
    </Row>
</form>

