import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
	Table,
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
} from 'reactstrap';

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
							<BreadcrumbItem active>Chuck Norris random joke</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Chuck Norris random joke</h2>
                {/**
                 * Font awesome icons:
                 * https://fontawesome.com/v4/icons/
                 */}
                 {/*}
				<Link to='/add_employee' >
					<Button color="primary">
                        <span className="fa fa-plus-square">&nbsp;</span>  
                           Add employee
                    </Button>
                </Link>				*/}

				<div className="row row-content">
                    <Card>
                        <CardBody>
                            <CardTitle>Chuck Norris Random Joke</CardTitle>
                            <CardSubtitle>Random joke</CardSubtitle>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.value}</CardText>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.url}</CardText>
                            <CardText>{props.chuck_norris_random_joke.chuck_norris_random_joke.icon_url}</CardText>
                            <Button>Mark as favorite Joke</Button>
                        </CardBody>
                    </Card>
				</div>

			</div>
        );
	}
}
