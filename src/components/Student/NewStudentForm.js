import React, { Component } from 'react';
import { Form, Grid, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import SelectList from 'react-widgets/lib/SelectList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';


class NewStudentForm extends Component {

  componentDidMount() {

    Moment.locale('en');
    momentLocalizer();

  }


  renderField = ({ input, label, type, meta: { touched, error } }) => (

    <Form.Field className={classnames({ error: touched && error })}>

      <label>{label}</label>
      <input {...input} placeholder={label} type={type} />

      {touched && error && <span className="error">{error.message}</span>}

    </Form.Field>

  );

  renderSelectList = ({ input, data, label, defaultValue, meta: { touched, error } }) => (

    <Form.Field className={classnames({ error: touched && error })} >

      <label>{label}</label>
      <SelectList {...input}
        onBlur={() => input.onBlur()}
        data={data} defaultValue={defaultValue} />

      {touched && error && <span className="error">{error.message}</span>}

    </Form.Field>

  )


  renderDateTimePicker = ({ input: { onChange, value }, label, showTime, meta: { touched, error } }) => {


    return (

      <Form.Field className={classnames({ error: touched && error })} >

        <label>{label}</label>
        <DateTimePicker
          onChange={onChange}
          format="DD MMM YYYY"
          time={showTime}
          value={!value ? null : new Date(value)}
        />
        {touched && error && <span className="error">{error.message}</span>}
      </Form.Field>

    )
  }


  componentWillReceiveProps(newProps) {

    const { student } = newProps;

    if (student.id !== this.props.student.id) {

      this.props.initialize(student);

    }

  }

  render() {

    const { handleSubmit, pristine, submitting, loading } = this.props;

    const genderOptions = ["Not Selected", "Male", "Female"];

    return (

      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{ marginTop: "1em" }}> {this.props.student.id ? 'Edit Student' : 'Add New Student'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>

            <Form.Group widths="equal">
              <Field name="firstName" type="text" component={this.renderField} label="First Name" />
              <Field name="lastName" type="text" component={this.renderField} label="Last Name" />
            </Form.Group>

            <Field name="mobileNumber" type="text" component={this.renderField} label="Mobile Number" />
            <Field name="email" type="text" component={this.renderField} label="Email" />

            <Field name="address" type="text" component={this.renderField} label="Address" />
            <Field name="createdBy" type="text" component={this.renderField} label="Created By" />

            <Field name="gender" component={this.renderSelectList} defaultValue={["not_selected"]} data={genderOptions} label="Gender" />
            <Field name="dateOfBirth" showTime={false} component={this.renderDateTimePicker} label="Date Of Birth" />
            <Field name="registerDate" showTime={false} component={this.renderDateTimePicker} label="Register Date" />

            <Button primary type="submit" disabled={pristine || submitting} > Save </Button>

          </Form>
        </Grid.Column>


      </Grid>

    )
  }
}

const validate = (values) => {

  const errors = {};
  if (!values.firstName) {
    errors.firstName = {
      message: 'You need to provide First Name'
    }
  }
  /*
  if(!values.mobileNumber) {
    errors.mobileNumber = {
      message: 'You need to provide a mobile number number'
    }
  } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.mobileNumber)) {
    errors.mobileNumber = {
      message: 'Mobile number number must be in International format'
    }
  }
  */
  if (!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }
  return errors;
}

export default reduxForm({ form: "student", validate })(NewStudentForm);