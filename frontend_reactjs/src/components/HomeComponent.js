import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
	Table,
	FormGroup, 
	Input, 
} from 'reactstrap';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
 export const HomeComponent = (props) => {
	console.log(props);
	/*
	if (props.employees.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.employees.errMess) {
        return(
            <h4>{props.employees.errMess}</h4>
        );
    }
	else { */
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
							<BreadcrumbItem active>Main menu</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Main menu</h2>
                {/**
                 * Font awesome icons:
                 * https://fontawesome.com/v4/icons/
                 */}
				<Link to='/chuck_norris_random_joke' >
					<Button color="primary">
                        {/*<span className="fa fa-plus-square">&nbsp;</span>*/}
                           Chuck Norris Random Joke
                    </Button>
                </Link>				
				<Link to='/my_jokes' >
					<Button color="primary">
                        {/*<span className="fa fa-plus-square">&nbsp;</span>*/}
                           My Jokes
                    </Button>
                </Link>				

			</div>
        );
	//}
}
