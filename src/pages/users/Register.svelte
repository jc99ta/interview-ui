<script>
    import {Row, Col, TextField, Icon, Button, Alert} from 'svelte-materialify';
    import {navigate} from 'svelte-routing';
    import {mdiAlert} from "@mdi/js";
    import {post} from "../../util/request";
    import Error from "../../components/form/Error.svelte";

    let firstName;
    let lastName;
    let email;
    let password;
    let passwordConfirm;
    let username;
    let errors = [];

    function handleSubmit(e) {
        if (errors.length < 1) {
            post({
                url: '/users/register',
                body: {
                    email: email,
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }
            }).then(() => navigate("login"))
                .catch(e => console.error(e));
        }
        e.preventDefault();
    }

    function validate(e) {
        errors = [];
        const val = e.target.value;
        const input = e.target.name;
        switch (input) {
            case 'firstName':
                if ('' === val) {
                    errors = [...errors, 'First Name is required'];
                }
                break;

            case 'username':
                if ('' === val) {
                    errors = [...errors, 'Username is required'];
                }
                break;
            case 'lastName':
                if ('' === val) {
                    errors = [...errors, 'Last Name is required'];
                }
                break;
            case 'email':
                if ('' === val) {
                    errors = [...errors, 'Email is required'];
                }
                break;
            case 'password':
                if ('' === val) {
                    errors = [...errors, 'Password is required'];
                }
                break;
            case 'passwordConfirm':
                if ('' === val) {
                    errors = [...errors, 'Password Confirm is required'];
                } else if (password !== passwordConfirm) {
                    errors = [...errors, 'Password and Password Confirm must match'];
                }
                break;
            default:
                break;
        }

        return true;

    }
</script>

<form on:submit={handleSubmit}
      on:input={validate}
      on:changed={validate}
      on:invalid={validate}
      method="POST">
    <Error bind:errors={errors} />

    <Row>
        <Col>
            <TextField name="firstName" required bind:value={firstName} id="firstName">First Name</TextField>
        </Col>
        <Col>
            <TextField name="lastName" required bind:value={lastName} id="lastName">Last Name</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <TextField name="username" required bind:value={username} id="username">Username</TextField>
        </Col>
        <Col>
            <TextField name="email" required bind:value={email} id="email">Email</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <TextField name="password" required type="password" bind:value={password} id="password">Password</TextField>
        </Col>
        <Col>
            <TextField name="passwordConfirm" required type="password" bind:value={passwordConfirm} id="passwordConfirm">Password Confirm</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <Button class="color-primary" type="submit">Register</Button>
        </Col>
    </Row>
</form>
