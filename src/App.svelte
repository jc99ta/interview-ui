<script>
    import Login from "./pages/users/Login.svelte";
    import Register from "./pages/users/Register.svelte";
    import OpportunityList from './pages/opportunities/OpportunityList.svelte';
    import CreateOpportunity from './pages/opportunities/CreateOpportunity.svelte';
    import Home from "./pages/home/Home.svelte";
    import {mdiViewDashboard, mdiMenu} from "@mdi/js";
    import {
        NavigationDrawer,
        List,
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
    <AppBar>
        <div slot="icon">
            <Button depressed on:click={toggleMenu}>
                <Icon path={mdiMenu} />
            </Button>
        </div>

    </AppBar>
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
                    <ListItem>
                         <span slot="append" class="pa-2">
                             <Button block on:click={logout}>Logout</Button>
                         </span>
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

        </NavigationDrawer>

        <Row>
            <Col>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <ProtectedRoute path="home" component={Home}/>
                <ProtectedRoute path="opportunities" component={OpportunityList}/>
                <ProtectedRoute path="create-opportunity" component={CreateOpportunity}/>
            </Col>
        </Row>
    </Router>
    <Overlay active={isOpen} absolute on:click={toggleMenu} index={1} />

</MaterialApp>
