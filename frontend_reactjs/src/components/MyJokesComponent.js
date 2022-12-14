import React  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
    Card, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
} from 'reactstrap';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
 export const MyJokesComponent = (props) => {
	console.log(props);
	
	if (props.favorite_jokes.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.favorite_jokes.errMess) {
        return(
            <h4>{props.favorite_jokes.errMess}</h4>
        );
    }
	else { 
		/**
		 * Array to set colors to Card items with count variable inside map
		 */
        let count = -1;
        const colorsCard = [
            "primary",
            "success",
            "info",
            "warning",
            "danger",
        ];
		return(
			<div className="container">
				<br />
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
							<BreadcrumbItem active>My jokes</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">My jokes</h2>
                {/**
                 * Font awesome icons:
                 * https://fontawesome.com/v4/icons/
                 */}
                        <div className="row row-content">
                            
                    {props.favorite_jokes.favorite_jokes.map((field, i) => { 
                        
                            
                            if(count==4){
                                count = -1;
                            }
                            count += 1;
                            return(
                                <div key={field.id} className="col-12 col-md-4 m-20 postCard">
                                    
                                    <Card body inverse color={colorsCard[count]}>
                                        <CardBody>
                                            <CardTitle>Favorite joke</CardTitle>
                                            <CardSubtitle>Random joke</CardSubtitle>
                                            <CardText>{field.url}</CardText>
                                            <CardText>{field.value}</CardText>
                                        </CardBody>
                                    </Card>

                                </div>		
                                                                
                            );
                            
                        }) 
					}

                        </div>


			</div>

        );
	}
}
