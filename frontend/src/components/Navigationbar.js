import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

    const NavigationBar = () => {
        return (
            <>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='secondary'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href='/'><h5>Home</h5></Nav.Link>
                            <Nav.Link href="/episodes"><h5>Episoden</h5></Nav.Link>
                            <Nav.Link href="/about"><h5>Über uns</h5></Nav.Link>
                            <Nav.Link href="/aktuelles"><h5>Aktuelles</h5></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </>
        )
    }

    export default NavigationBar