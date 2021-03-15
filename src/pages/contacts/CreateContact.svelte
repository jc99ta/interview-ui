<script>
    import {TextField, Row, Col, Button} from "svelte-materialify";
    import Error from "../../components/form/Error.svelte";
    import {navigate} from "svelte-routing";
    import {post} from "../../util/request";
    import {token} from "../../stores/token";

    let errors = [];
    let firstName = "";
    let lastName = "";
    let nickname = "";
    let title = "";

    function validate() {

    }

    function cancel(){
        navigate("opportunities");
    }


    function handleSubmit(e) {
        if (errors.length < 1) {
            post({
                url: 'contacts/create',
                body: {
                    firstName: firstName,
                    lastName: lastName,
                    nickname: nickname
                },
                token: $token
            })
                .then(() => navigate("opportunities"))
                .catch(e => console.error(e));
        }
        e.preventDefault();
    }



</script>
<h2>Create Contact</h2>

<form on:submit={handleSubmit}
      on:input={validate}
      on:changed={validate}
      on:invalid={validate}
      method="POST">
    <Error bind:errors={errors} />

    <Row>
        <Col>
            <TextField required bind:value={firstName}>First Name</TextField>
        </Col>
        <Col>
            <TextField required bind:value={lastName}>Last Name</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <TextField bind:value={title}>Title</TextField>
        </Col>
        <Col>
            <TextField bind:value={nickname}>Nickname</TextField>
        </Col>

    </Row>

    <Row>
        <Col>
            <Button class={'secondary-color'} outline="true" on:click={cancel}>Cancel</Button>
            <Button class={'primary-color'} type="submit">Create</Button>
        </Col>
    </Row>
</form>


