import React, { Fragment } from 'react';
import CountdownComponent from './countdown-data';
import {Container} from 'reactstrap' 
const ComingSoon = () => {
    return (
        <Fragment>
             <div className="page-wrapper">
                <Container fluid={true}  className="p-0">
                    <div className="comingsoon">
                    <div className="comingsoon-inner text-center">
                        <img src={require("../../../assets/images/coming-soon-Logo.png")} alt=""/>
                        <h5>WE ARE COMING SOON</h5>
                        <div className="countdown" id="clockdiv">
                        <CountdownComponent />
                        </div>
                    </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    );
};

export default ComingSoon;