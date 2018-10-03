import React from 'react';
import SchoolForm from './SchoolForm';
import { createSchool } from '../store';
import { connect } from 'http2';

class NewSchool extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
      enrollingStudents: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { name, address, description } = this.state;
    const { handleChange, handleSubmit } = this;
    console.log(this.props.students);
    return (
      <SchoolForm
        name={name}
        address={address}
        description={description}
        handleChang={handleChange}
        handleSubmit={handleSubmit}
        history={this.props.history}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: school => dispatch(createSchool(school)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewSchool);
