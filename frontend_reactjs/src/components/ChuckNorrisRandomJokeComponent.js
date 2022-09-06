import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
    Card, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
	Form, 
	Input, 
} from 'reactstrap';

import { getSession } from '../redux/ActionCreators';

export class RegisterFavoriteChuckNorrisJokeCOmponent extends Component {

    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        
    }
    //Call loginUser functions
    handleRegister(event) {
		const user_id = localStorage.getItem('user_id');
        //console.log(session)
        event.preventDefault();
        this.props.registerFavoriteJoke({
            icon_url: this.icon_url.value, 
            joke_id: this.joke_id.value, 
            url: this.url.value, 
            value: this.value.value, 
            user_id: user_id
        });

    }
    /**
     * Render form with their respective validations
     */
    render(){
        
            return(
                <Form onSubmit={this.handleRegister}>
                    <Input type="hidden" id="icon_url" name="icon_url"
                        innerRef={(input) => this.icon_url = input}
                        maxLength={300}
                        defaultValue={this.props.chuck_norris_random_joke.icon_url} />
                    <Input type="hidden" id="joke_id" name="joke_id"
                        innerRef={(input) => this.joke_id = input}
                        maxLength={300}
                        defaultValue={this.props.chuck_norris_random_joke.id} />
                    <Input type="hidden" id="url" name="url"
                        innerRef={(input) => this.url = input}
                        maxLength={300}
                        defaultValue={this.props.chuck_norris_random_joke.url} />
                    <Input type="hidden" id="value" name="value"
                        innerRef={(input) => this.value = input}
                        maxLength={300}
                        defaultValue={this.props.chuck_norris_random_joke.value} />                                                
                    <Button type="submit" value="submit" color="primary">
                        {/*<span className="fa fa-plus-square">&nbsp;</span>  */}
                        Mark as favorite
                    </Button>
                </Form>
            );
        //}
    }

}


/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
 export const ChuckNorrisRandomJokeComponent = (props) => {
	console.log(props);
	
	if (props.chuck_norris_random_joke.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.chuck_norris_random_joke.errMess) {
        return(
            <h4>{props.chuck_norris_random_joke.errMess}</h4>
        );
    }
	else { 
		/**
		 * Iterate over object that is in the store
		 */
		return(
			<div className="container">
				<br />
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
							<BreadcrumbItem active>Get Jokes</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Chuck Norris random joke</h2>
                {/**
                 * Font awesome icons:
                 * https://fontawesome.com/v4/icons/
                 */}
                 
				<div className="row row-content">
                    <Card>
                        <CardBody>
                            <CardTitle>Chuck Norris Random Joke</CardTitle>
                            <CardSubtitle>Random joke</CardSubtitle>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.value}</CardText>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.url}</CardText>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.icon_url}</CardText>
                            <RegisterFavoriteChuckNorrisJokeCOmponent 
                                        chuck_norris_random_joke={props.chuck_norris_random_joke.chuck_norris_random_joke} 
                                        registerFavoriteJoke={props.registerFavoriteJoke}
                            />

                        </CardBody>
                    </Card>
				</div>

			</div>
        );
	}
}
