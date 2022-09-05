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
import { removeExtraSpace } from './EmployeesView';


export class AddEmployeeComponent extends Component {

    constructor(props){
        super(props);

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

    }

    validateFields(){
        /**
         * Validations for the fields before making the request
         * to the API, some of them are: 
         * regular expresions to allow only upper cases, letters
         * alphanumeric characters without accents or special
         * characters.
         */

        var result = true;

         if (!this.identity_document.value || 
            this.identity_document.value.trim().length === 0) {
            alert('identity document field cannot be empty');
        }else{
            this.identity_document.value = removeExtraSpace(this.identity_document.value);
            
            if (/[^a-zA-Z0-9 ]/.test(this.identity_document.value) ) {
                alert('Invalid characters identity document: Just alphanumeric characters are allowed');
                result = false;
             }
        }        
        
        if (!this.last_name.value || 
            this.last_name.value.trim().length === 0) {
            alert('first name field cannot be empty');
        }else{
            this.last_name.value = removeExtraSpace(this.last_name.value);
            
            if (/[^A-Z ]/.test(this.last_name.value) ) {
                alert('first name Invalid characters: Just Upper letters without accents are allowed and letters with special characters are not allowed');
                result = false;
             }
        }        
        
        if (!this.second_surname.value || 
            this.second_surname.value.trim().length === 0) {
            alert('second surname  field cannot be empty');
        }else{
            this.second_surname.value = removeExtraSpace(this.second_surname.value);
            
            if (/[^A-Z ]/.test(this.second_surname.value) ) {
                alert('second surname  Invalid characters: Just Upper letters without accents are allowed and letters with special characters are not allowed');
                result = false;
             }
        }        
        
        if (!this.first_name.value || 
            this.first_name.value.trim().length === 0) {
            alert('first name field cannot be empty');
        }else{
            this.first_name.value = removeExtraSpace(this.first_name.value);
            
            if (/[^A-Z ]/.test(this.first_name.value) ) {
                alert('first name Invalid characters:  Just Upper letters without accents are allowed and letters with special characters are not allowed');
                result = false;
             }
        }        
        
        if (this.middle_names.value || 
            this.middle_names.value.trim().length !== 0) {
                
            this.middle_names.value = removeExtraSpace(this.middle_names.value);
            
            if (/[^A-Z ]/.test(this.middle_names.value) ) {
                alert('middle_names Invalid characters: Just Upper letters without accents are allowed and letters with special characters are not allowed');
                result = false;
             }
        }

        return result;
    }

    /**
     * 
     * Send parameters to do the register employee request and clear fields in the view
     */

    handleRegister(event) {
        event.preventDefault();

        this.validateFields();

        // set employee data nested relation
        // one to one field
        const third_parties_employees = {
            country: this.country.value,
            area_id: this.area_id.value,
            date_of_entry: this.date_of_entry.value
        }
        
        this.props.registerEmployee({
            types_of_identity_documents_id : this.types_of_identity_documents_id .value, 
            identity_document: this.identity_document.value, 
            last_name: this.last_name.value, 
            second_surname: this.second_surname.value,
            first_name: this.first_name.value, 
            middle_names: this.middle_names.value,
            email: this.email.value,
            third_parties_employees: third_parties_employees,
        });
        

    }    
 
    /**
     * Event to capture first name and change the state
     * to make the request to the API and generate
     * automatically the email
     */
    handleFirstName(event) {

        event.preventDefault();
        this.validateEmailAndCahngeState({ first_name: event.target.value });
    }
 
    /**
     * Event to capture last name and change the state
     * to make the request to the API and generate
     * automatically the email
     */
    handleLastName(event) {

        event.preventDefault();
        this.validateEmailAndCahngeState({ last_name: event.target.value });

    }   
 
    /**
     * Event to capture the country code that is in the end of the doman and
     * change the state to make the request to the API and generata
     * automatically the email
     */
    handleCountryCode(event) {
        event.preventDefault();

        var get_country_code = event.target.text.split('-');
        var get_country_code = get_country_code[1].trim();

        this.validateEmailAndCahngeState({ country_code: get_country_code });
    }
    
    /**
     * Call function retrieveNewEmail that make the request to the API
     * to generate email automatically with the values of the state
     * and continue the flow of the promise to get the email, change
     * the state and show it in the HTML field
     */
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
                this.state.country_code
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
                                <BreadcrumbItem active>Add employees</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>		
                    <br />
                    <div className="row row-content">
                        <div className="col-12">
                            <h4>Add Employee</h4>
                        </div>
                        <div className="col-12 col-md-9">

                            <Form onSubmit={this.handleRegister}>
                                <FormGroup>
                                    <Label for="types_of_identity_documents_id ">Type of identity document</Label>
                                    <Input type="select" name="types_of_identity_documents_id " 
                                    id="types_of_identity_documents_id " innerRef={(input) => this.types_of_identity_documents_id  = input}>
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
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input type="text" id="last_name" name="last_name"
                                        innerRef={(input) => this.last_name = input}
                                        onChange={this.handleLastName}
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="second_surname">Second Surname</Label>
                                    <Input type="text" id="second_surname" name="second_surname"
                                        innerRef={(input) => this.second_surname = input}
                                        maxLength={20}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="first_name">First name</Label>
                                    <Input type="text" id="first_name" name="first_name"
                                        innerRef={(input) => this.first_name = input}
                                        onChange={this.handleFirstName} 
                                        maxLength={20} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="middle_names">Middle_names</Label>
                                    <Input type="text" id="middle_names" name="middle_names"
                                        innerRef={(input) => this.middle_names = input} 
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
                                    onClick={this.handleCountryCode}>
                                    {this.props.countries.countries.map((field, i) => { 
                                        /*{
                                            if (i==0){
                                                this.setState({
                                                    country: field.country
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
                                    id="area_id" innerRef={(input) => this.area_id = input}>
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
                                        innerRef={(input) => this.date_of_entry = input}  />
                                </FormGroup>
                                
                                <Button type="submit" value="submit" color="primary">
                                    <span className="fa fa-plus-square">&nbsp;</span>  
                                    Add
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
    }

}
