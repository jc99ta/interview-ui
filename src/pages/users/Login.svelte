<script>
    import {Button, FormGroup, Label, Input, Alert} from 'sveltestrap';
    import {navigate} from "svelte-routing";
    import {token} from '../../stores/token.js';

    let email;
    let password;
    let isSubmitted;
    let errors = [];

    function handleLogin(e) {
        isSubmitted = true;
        errors = [];

        fetch('http://localhost:3000/users/login', {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                email: email,
                password: password
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
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
                navigate("home",{replace:true});
            })

            .catch(e => console.error(e));

        e.preventDefault();
        return false;
    }

    $: hasErrors = errors.length > 0;


</script>


<form on:submit={handleLogin} method="POST">
    {#if hasErrors}
        <Alert color="danger">
            {#each errors as error}
                <div>{error}</div>
            {/each}
        </Alert>
    {/if}
    <FormGroup>
        <Label for="email">Email</Label>
        <Input name="email" bind:value={email} id="email"/>
    </FormGroup>
    <FormGroup>
        <Label for="pass">Password</Label>
        <Input
                type="password"
                name="password"
                id="pass"
                bind:value={password}
        />
    </FormGroup>
    <FormGroup>
        <Button color="primary" type="submit">Login</Button>
    </FormGroup>
</form>

