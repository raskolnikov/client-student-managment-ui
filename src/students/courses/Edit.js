import React, { useEffect, useState } from 'react'
import {Grid} from 'semantic-ui-react'


const Edit = (props) => {

    const studentId = props.match.params.studentId
    const studentIdCourseId = props.match.params.id


    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">

                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Edit Student Course</h1>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        </div>

    )




}

export { Edit }
