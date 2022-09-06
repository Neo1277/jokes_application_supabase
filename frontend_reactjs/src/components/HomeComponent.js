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
				<div className="row main-container">
					<div className="class-col">
						<Link to='/chuck_norris_random_joke' >
							<Button color="primary" size="lg" active>
								{/*<span className="fa fa-plus-square">&nbsp;</span>*/}
								Chuck Norris Random Joke
							</Button>
						</Link>
					</div>
					<div className="class-col">
						<Link to='/my_jokes' >
							<Button color="danger" size="lg" active>
								{/*<span className="fa fa-plus-square">&nbsp;</span>*/}
								My Jokes
							</Button>
						</Link>
					</div>
				</div>
			</div>
        );
	//}
}
