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

import { supabase } from '../shared/supabaseClient';

export class LoginComponent extends Component {

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        

    }
    //Call loginUser functions
    async handleLogin(event) {
        event.preventDefault();
        //this.props.signInWithEmail();
        const { user, error } = await supabase.auth.signInWithPassword({
            email: this.email.value,
            password: this.password.value,
        })
        
    }
    /**
     * Render form with their respective validations
     */
    render(){
        
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

                            <Form onSubmit={this.handleLogin}>
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
