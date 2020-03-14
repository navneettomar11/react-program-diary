import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


export class AboutMe extends React.Component {

    render() {
        return (
            <div className="clr-row">
                <div className="clr-col-12 text-center">
                   <FontAwesomeIcon icon={faUserCircle} size="8x"/>
                </div>
                <div className="clr-col-6">
                    <p>
                        I have over 15+ years of experiencea as a software enginner, and worked at both small startups and large organization. While I'm a proficient full-stack developer, my expertise is building scalable backend services(API services, stream processing and async mechanism).
                    </p>
                    <p>
                        I love building things. While hard engineering problems are often intrinsically fun to tackle, I'm most attracted to solving real customer problem with a business justification. 
                    </p>
                </div>
                <div className="clr-col-6">
                    <p>Here are a few technologies, I've been working with recently</p>
                    <ul className="list-unstyled">
                        <li>
                            <div aria-hidden="true">
                                Java: <progress  max="10" value="9.5" data-displayval="9.5"></progress>
                            </div>
                        </li> 
                        <li>
                            Javascript
                        </li>
                        <li>
                            Kotlin
                        </li>
                        <li>
                            Node.js
                        </li>
                    </ul>
                </div>
            </div>
           
        );
    }
}