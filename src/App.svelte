<svelte:head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
</svelte:head>
<script>
    import Login from "./pages/users/Login.svelte";
    import Register from "./pages/users/Register.svelte";
    import Home from "./pages/home/Home.svelte";
    import {
        Container,
        Row,
        Col,
        Nav,
        NavLink,
        Navbar,
        NavItem,
        Collapse,
        NavbarToggler,
        NavbarBrand
    } from 'sveltestrap';
    import {Router, Link, Route, navigate} from "svelte-routing";
    import {token} from './stores/token.js';
    import ProtectedRoute from "./components/common/auth/ProtectedRoute.svelte";

    let isOpen = false;
    let isAuthenticated = false;

    function handleUpdate(e) {
        isOpen = e.detail.isOpen;
    }

    function logout() {
        localStorage.removeItem("token");
        token.set(localStorage.getItem('token'));
    }

    token.subscribe((t)=>{
        isAuthenticated = t;
    });
</script>
<Container>
    <Router>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Offender</NavbarBrand>
            <NavbarToggler on:click={() => (isOpen = !isOpen)} />
            <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
            <Nav class="ml-auto" navbar>
                {#if isAuthenticated}
                    <NavItem><NavLink><Link to="home">Home</Link></NavLink></NavItem>
                    <NavItem><NavLink><Link on:click={logout} to="login">Logout</Link></NavLink></NavItem>
                {:else}
                    <NavItem><NavLink><Link to="login">Login</Link></NavLink></NavItem>
                    <NavItem><NavLink><Link to="register">Register</Link></NavLink></NavItem>
                {/if}
            </Nav>
            </Collapse>
        </Navbar>
    <Row>
        <Col>
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <ProtectedRoute path="home" component={Home} />
        </Col>
    </Row>
    </Router>
</Container>
