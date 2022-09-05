import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from '../LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
	Form, 
	FormGroup, 
	Input, 
    Label, 
} from 'reactstrap';
import { AddEmployeeComponent } from './AddEmployeesView';

/**
 * Edit employee component
 */
export class EditEmployeeComponent extends AddEmployeeComponent {

    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleCountryCode = this.handleCountryCode.bind(this);
        this.validateEmailAndCahngeState = this.validateEmailAndCahngeState.bind(this);
        //this.handleValidacionEmail = this.handleValidacionEmail.bind(this);

	    this.state = {
            first_name: this.props.employee.first_name,
            last_name: this.props.employee.last_name,
            email: this.props.employee.email,
            country_code: this.props.employee.country.code
	    };

    }

    /**
     * 
     * Send parameters to do the edit employee request and clear fields in the view
     */

    handleUpdate(event) {
        event.preventDefault();
        
        this.validateFields();

        // set employee data nested relation
        // one to one field
        const third_parties_employees = {
            country: this.country.value,
            area_id: this.area_id.value,
            date_of_entry: this.date_of_entry.value
        }
        
        this.props.editEmployee({
            types_of_identity_documents_id: this.types_of_identity_documents_id.value, 
            identity_document: this.identity_document.value, 
            last_name: this.last_name.value, 
            second_surname: this.second_surname.value,
            first_name: this.first_name.value, 
            middle_names: this.middle_names.value,
            email: this.email.value,
            third_parties_employees: third_parties_employees,
            third_party_id: this.props.employee.third_party_id
        });
        

    }    
 
    validateEmailAndCahngeState(dataState) {
        
        /**
         * Change the state with use of callback asynchronous to be able to
         * see the new state
         * https://stackoverflow.com/a/34237449/9655579
         */
        this.setState(
            dataState
        , () => {
            this.props.retrieveNewEmail(
                this.state.last_name, 
                this.state.first_name, 
                this.state.country_code, 
                this.props.employee.third_party_id
            )
            .then(response => {
                if (response.ok) {
                  return response;
                } else {
                  var error = new Error('Error ' + response.status + ': ' + response.statusText);
                  error.response = response;
                  throw error;
                }
              },
              error => {
                    throw error;
              })
            .then(response => response.json())
            .then(response => { 
                console.log('Email obtained', response); 
                //alert('Email obtained!\n'+JSON.stringify(response.email)); 
                this.setState({
                    email: response.email
                });
            })
            .catch(error =>  { console.log('Error get email', error.message); });

        });
    }

    /**
     * Render form with their respective validations
     */
    render(){
        
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
        else { 
            return(
                <div className="container">
                    
                    <br />
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Edit employee</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>		
                    <br />
                    <div className="row row-content">
                        <div className="col-12">
                            <h4>Edit Employee</h4>
                        </div>
                        <div className="col-12 col-md-9">

                            <Form onSubmit={this.handleUpdate}>
                                <FormGroup>
                                    <Label for="types_of_identity_documents_id">Type of identity document</Label>
                                    <Input type="select" name="types_of_identity_documents_id" 
                                    id="types_of_identity_documents_id" innerRef={(input) => this.types_of_identity_documents_id = input}
                                    defaultValue={this.props.employee.types_of_identity_documents_id}>
                                    {this.props.types_of_identity_documents.types_of_identity_documents.map((field, i) => { 
                                        return(
                                            <>
                                                <option value={field.id}>{field.description}</option>
                                            </>
                                        );
                                    }) }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="identity_document">Identity Document</Label>
                                    <Input type="text" id="identity_document" name="identity_document"
                                        innerRef={(input) => this.identity_document = input}
                                        defaultValue={this.props.employee.identity_document} 
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input type="text" id="last_name" name="last_name"
                                        innerRef={(input) => this.last_name = input} 
                                        defaultValue={this.props.employee.last_name}
                                        onChange={this.handleLastName} 
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="second_surname">Second Surname</Label>
                                    <Input type="text" id="second_surname" name="second_surname"
                                        innerRef={(input) => this.second_surname = input} 
                                        defaultValue={this.props.employee.second_surname}
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="first_name">first name</Label>
                                    <Input type="text" id="first_name" name="first_name"
                                        innerRef={(input) => this.first_name = input} 
                                        defaultValue={this.props.employee.first_name}
                                        onChange={this.handleFirstName} 
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="middle_names">middle_names</Label>
                                    <Input type="text" id="middle_names" name="middle_names"
                                        innerRef={(input) => this.middle_names = input} 
                                        defaultValue={this.props.employee.middle_names} 
                                        maxLength={50} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email"
                                        innerRef={(input) => this.email = input}
                                        value={this.state.email} 
                                        maxLength={300} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="country">Country employment</Label>
                                    <Input type="select" name="country" 
                                    id="country" innerRef={(input) => this.country = input} 
                                    defaultValue={this.props.employee.country.code}
                                    onClick={this.handleCountryCode}>
                                    {this.props.countries.countries.map((field, i) => { 
                                        /*{
                                            if (i==0){
                                                this.setState({
                                                    country_code: field.code
                                                });
                                            }
                                        }*/
                                        return(
                                            <>
                                                <option value={field.code}>{field.name} - {field.code}</option>
                                            </>
                                        );
                                    }) }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="area_id">Area</Label>
                                    <Input type="select" name="area_id" 
                                    id="area_id" innerRef={(input) => this.area_id = input}
                                    defaultValue={this.props.employee.area_id}>
                                    {this.props.areas.areas.map((field, i) => { 
                                        return(
                                            <>
                                                <option value={field.id}>{field.description}</option>
                                            </>
                                        );
                                    }) }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="date_of_entry">Date of entry</Label>
                                    <Input type="datetime-local" id="date_of_entry" name="date_of_entry"
                                        innerRef={(input) => this.date_of_entry = input}  
                                        defaultValue={this.props.employee.date_of_entry} />
                                </FormGroup>
                                
                                <Button type="submit" value="submit" color="success">
                                    <span className="fa fa-pencil">&nbsp;</span>  
                                    Edit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

