import React, { Component } from 'react';

import StudentListPage from './Shelf/StudentListPage';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NewStudentPage from './NewStudentPage';
import EditStudentPage from './EditStudentPage';
import ContactListPage from './ContactListPage';

class App extends Component {

  render() {

    return (<Container>

      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Student List
          </NavLink>
        <NavLink className="item" activeClassName="active" exact to="/students/new">
          Add Student
          </NavLink>
      </div>

      <Route exact path="/" component={StudentListPage}/>
      <Route path="/students/new" component={NewStudentPage}/>
      <Route path="/students/edit/:_id" component={EditStudentPage}/>

    </Container>)
  }
}
export default App;
