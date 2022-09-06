import React, { Component, useState } from 'react';
import { 
	Button,
	Navbar, 
	NavbarBrand, 
	Nav, 
	NavbarToggler, 
	Collapse,
	NavItem,
	Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { signOut } from '../redux/ActionCreators';

const DropdownMenuComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        {/*<DropdownToggle caret>
            <img src={props.user_data.user_data.profile_image} height="30" width="41" alt="My blog" />
        </DropdownToggle>*/}
        <DropdownMenu right>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          {/*<DropdownItem>Foo Action</DropdownItem>*/}
          <DropdownItem>
            <a onClick={signOut} id="loginButton" role="button">
                <span className="fa fa-sign-out fa-lg"></span> Logout
            </a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

class Header extends Component{
	constructor(props) {
	    super(props);

	    this.toggleNav = this.toggleNav.bind(this);

	    this.state = {
		  isNavOpen: false
	    };
	}

	toggleNav() {
	    this.setState({
	      isNavOpen: !this.state.isNavOpen
	    });
    }

    
	render(){
		
		const user_id = localStorage.getItem('user_id');
		return(
			<React.Fragment>
				<Navbar color="light" light expand="md">
                    <div className="container">
						<NavbarToggler onClick={this.toggleNav} />
                        
						{/*<NavbarBrand className="mr-auto">
							<span className="fa fa-superpowers fa-lg"></span>
						</NavbarBrand>*/}
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span> Home  
									</NavLink>
								</NavItem>
							</Nav>	
                            <Nav className="ms-auto" navbar>
                                <NavItem>
                                    { user_id != null  ?
                                        <div>
                                        {/*<div className="navbar-text mr-3">user</div>*/}
                                        <Button outline onClick={signOut}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                        </Button>
                                        </div>
                                        :
										null
									
                                    }
                                </NavItem>
                            </Nav>				

                        </Collapse>
					</div>
				</Navbar>
            </React.Fragment>
		);
	}
}

export default Header;