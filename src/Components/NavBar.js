import { useState } from 'react';
import PopUpForm from './PopUpForm';
import { Container, Button, Navbar, Nav, Image, Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import RedditLogo from "../imgs/reddit-logo.png";

function NavBar({ setPosts }) {
    const [modalShow, setModalShow] = useState(false);
    const success = () => {
        NotificationManager.success('Post Added Successfully', 'success');
    }
    return (
        <div >
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Image className='logo' src={RedditLogo}></Image>
                <Container>
                    <Navbar.Brand href='/'>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 search-bar"
                                    aria-label="Search"
                                />
                            </Form>
                        </Nav>
                        <div>
                            <Button variant='danger ' onClick={() => setModalShow(true)}>New Post</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            < PopUpForm show={modalShow}
                onHide={() => setModalShow(false)}
                setPosts={setPosts}
                success={success}
            />
            <NotificationContainer />
        </div >
    );
}

export default NavBar;




