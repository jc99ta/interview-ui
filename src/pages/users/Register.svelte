<script>
    import {Row, Col, FormGroup, Label, Input, Button, Alert} from 'sveltestrap';
    import {navigate} from 'svelte-routing';

    let firstName;
    let lastName;
    let email;
    let password;
    let passwordConfirm;
    let username;
    let errors = [];

    function handleSubmit(e) {
        if(errors.length < 1) {
            fetch('http://localhost:3000/users/register', {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    email: email,
                    username:username,
                    password: password,
                    firstName:firstName,
                    lastName:lastName
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(()=>navigate("login"))
                .catch(e=>console.error(e));
        }
        e.preventDefault();
    }
    function validate(e){
        errors = [];
        const val = e.target.value;
        const input = e.target.name;
        switch(input){
            case 'firstName':
                if('' === val){
                    errors.push('First Name is required');
                }
                break;

            case 'username':
                if('' === val){
                    errors.push('Username is required');
                }
                break;
            case 'lastName':
                if('' === val){
                    errors.push('Last Name is required');
                }
                break;
            case 'email':
                if('' === val){
                    errors.push('Email is required');
                }
                break;
            case 'password':
                if('' === val){
                    errors.push('Password is required');
                }
                break;
            case 'passwordConfirm':
                if('' === val){
                    errors.push('Password Confirm is required');
                }else if(password !== passwordConfirm){
                    errors.push("Password and Password Confirm must match");
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
    {#if errors.length > 0}
        <Alert color="danger">
            {#each errors as error}
                <div>{error}</div>
            {/each}
        </Alert>
        <span class="text-red">Submitted: {email}</span>
    {/if}
    <Row>
        <Col>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input name="firstName" required bind:value={firstName} id="firstName"/>
            </FormGroup>
        </Col>
        <Col>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input name="lastName" required bind:value={lastName} id="lastName"/>
            </FormGroup>
        </Col>
    </Row>
    <Row>
        <Col>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input name="username" required bind:value={username} id="username"/>
            </FormGroup>
        </Col>
        <Col>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input name="email" required bind:value={email} id="email"/>
            </FormGroup>
        </Col>
    </Row>
    <Row>
        <Col>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input name="password" required type="password" bind:value={password} id="password"/>
            </FormGroup>
        </Col>
        <Col>
            <FormGroup>
                <Label for="passwordConfirm">Password Confirm</Label>
                <Input name="passwordConfirm" required type="password" bind:value={passwordConfirm} id="passwordConfirm"/>
            </FormGroup>
        </Col>
    </Row>
    <Row>
        <Col>
            <Button type="submit">Register</Button>
        </Col>
    </Row>
</form>
