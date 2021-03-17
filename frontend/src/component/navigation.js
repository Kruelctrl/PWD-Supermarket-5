import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Fat Man Paradise</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Dropdown style={{ margin: '0 40px' }}>
                        <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                            {this.props.username || 'username'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.username
                                ?
                                <>
                                    <Dropdown.Item as={Link} to='/' onClick={this.props.logout}>Logout</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/profile'>Cart</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/profile'>History</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/profile'>Cart</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/profile'>History</Dropdown.Item>
                                </>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default navigation


