import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
	Form, 
	FormGroup, 
	Input, 
    Label,
} from 'reactstrap';


export class LoginComponent extends Component {

    constructor(props){
        super(props);
        /*
        this.handleRegister = this.handleRegister.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleCountryCode = this.handleCountryCode.bind(this);
        this.validateEmailAndCahngeState = this.validateEmailAndCahngeState.bind(this);
        //this.handleValidacionEmail = this.handleValidacionEmail.bind(this);

	    this.state = {
            first_name: '',
            last_name: '',
            email: '',
            country_code: 'AF'
	    };
        */

    }

    /**
     * Render form with their respective validations
     */
    render(){
        /*
        if (this.props.countries.isLoading) {
		
            return(
                <Loading />
            );
        }
        else if (this.props.countries.errMess) {
            return(
                <h4>{this.props.errMess}</h4>
            );
        }
        else { */
            return(
                <div className="container">
                    
                    <br />
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem>Home</BreadcrumbItem>
                                <BreadcrumbItem active>Login</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>		
                    <br />
                    <div style={{display: 'flex', justifyContent: 'center'}} className="row row-content">
                        <div style={{display: 'flex', justifyContent: 'center'}}  className="col-12">
                            <h4>Login</h4>
                        </div>
                        <div className="col-12 col-md-4">

                            <Form>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email"
                                        innerRef={(input) => this.email = input}
                                        maxLength={300} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input}
                                        maxLength={20} />
                                </FormGroup>
                                
                                <Button type="submit" value="submit" color="primary">
                                    {/*<span className="fa fa-plus-square">&nbsp;</span>  */}
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        //}
    }

}
