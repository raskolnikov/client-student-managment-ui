import React, { Component } from 'react';
import {fetchStudentDetail} from '../../services/shelf/actions';

import './style.scss';

class StudentDetail extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount() {

        this.handleFetchStudentDetail();

    }

    state = {

        isLoading: false
    }

    handleFetchStudentDetail() {

        
    }


    render() {

        return <div>Hello detail</div>

    }




}

export default StudentDetail;