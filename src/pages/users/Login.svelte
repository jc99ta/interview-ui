<script>
    import {Button, TextField, Alert, Row, Col, Icon} from 'svelte-materialify';
    import {navigate} from "svelte-routing";
    import {token} from '../../stores/token.js';
    import {mdiAlert} from "@mdi/js";
    import {post} from '../../util/request';
    import Error from "../../components/form/Error.svelte";

    let email;
    let password;
    let isSubmitted;
    let errors = [];

    function handleLogin(e) {
        isSubmitted = true;
        errors = [];
        post({
            url: '/users/login', body: {
                email: email,
                password: password
            }, token: $token
        }).then(r => {
            if (r.status !== 200) {
                errors = ["Invalid login"];
                throw new Error(r.statusText);
            }
            return r.json()
        })
            .then(r => {
                localStorage.setItem("token", r.token);
                token.set(localStorage.getItem('token'));
                navigate("opportunities", {replace: true});
            })

            .catch(e => console.error(e));

        e.preventDefault();
        return false;
    }


</script>


<form on:submit={handleLogin} method="POST">
   <Error bind:errors={errors} />
    <Row>
        <Col>
            <TextField bind:value={email}>Email</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <TextField type="password" bind:value={password}>Password</TextField>
        </Col>
    </Row>

    <Row>
        <Col>
            <Button class="primary-color" type="submit">Login</Button>
        </Col>
    </Row>
</form>

