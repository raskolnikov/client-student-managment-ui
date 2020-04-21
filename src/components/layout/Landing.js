import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Context from '../../utils/context'
import history from '../../utils/history';

const Landing = () => {

    const context = useContext(Context)
    const styleNames = 'btn btn-large waves-effect waves-light hoverable blue accent-3'

    useEffect(() => {

        if (context.authObj.isAuthenticated()) {

            history.push("/students");

        }

    }, []);


    return (

        <div
            style={{ height: '75vh' }}
            className="container valign-wrapper"
            data-testid="landing-page"
        >
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        Welcome to&nbsp;<b>Open Banking system</b>
                    </h4>
                    <p className="flow-text grey-text text-darken-1">Please Register or Log in</p>
                    <br />
                    <div className="col s6">
                        <Link
                            to="/register"
                            style={{
                                width: '140px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className={styleNames}
                        >
                            Register
                        </Link>
                    </div>
                    <div className="col s6">
                        <Link
                            to="/login"
                            style={{
                                width: '140px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className="btn btn-large btn-flat waves-effect white black-text"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Landing