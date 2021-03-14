<script>
    import Login from "./pages/users/Login.svelte";
    import Register from "./pages/users/Register.svelte";
    import OpportunityList from './pages/opportunities/OpportunityList.svelte';
    import CreateOpportunity from './pages/opportunities/CreateOpportunity.svelte';
    import CreateContact from './pages/contacts/CreateContact.svelte';
    import Home from "./pages/home/Home.svelte";
    import {mdiViewDashboard, mdiMenu} from "@mdi/js";
    import {
        NavigationDrawer,
        List,
        Container,
        ListItem,
        AppBar,
        Overlay,
        Button,
        Row,
        Col,
        MaterialApp,
        Icon

    } from 'svelte-materialify/src';
    import {Router, Link, Route, navigate} from "svelte-routing";
    import {token} from './stores/token.js';
    import ProtectedRoute from "./components/common/auth/ProtectedRoute.svelte";

    let isOpen = false;
    let isAuthenticated = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function logout() {
        localStorage.removeItem("token");
        token.set(localStorage.getItem('token'));
        navigate('login',{replace:true});
    }

    token.subscribe((t) => {
        isAuthenticated = t;
    });


</script>
<MaterialApp>

    <AppBar flat="true">
        <div slot="icon">
            <Button depressed on:click={toggleMenu}>
                <Icon path={mdiMenu} />
            </Button>
        </div>

    </AppBar>
    <Container>
    <Router>

        <NavigationDrawer style="height:350px;top:65px" class="primary-color theme--dark" absolute active={isOpen}>
            <List>
                {#if isAuthenticated}
                    <ListItem>
                         <span slot="prepend">
                          <Icon path={mdiViewDashboard}/>
                        </span>
                        <Link to="opportunities">Opportunities</Link>
                    </ListItem>

                {:else}
                    <ListItem>
                        <Link to="login">Login</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="register">Register</Link>
                    </ListItem>
                {/if}

            </List>
            {#if isAuthenticated}
                <span class="pa-2">
                     <Button block on:click={logout}>Logout</Button>
                 </span>
            {/if}
        </NavigationDrawer>

        <Row>
            <Col>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <ProtectedRoute path="home" component={Home}/>
                <ProtectedRoute path="create-contact" component={CreateContact}/>
                <ProtectedRoute path="opportunities" component={OpportunityList}/>
                <ProtectedRoute path="create-opportunity" component={CreateOpportunity}/>
            </Col>
        </Row>
    </Router>
    </Container>
    <Overlay active={isOpen} absolute on:click={toggleMenu} index={1} />

</MaterialApp>
