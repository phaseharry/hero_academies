import React from 'react';
import SchoolForm from './SchoolForm';
import { createSchool } from '../store';
import { connect } from 'react-redux';

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
    const { name, address, description } = this.state;
    this.props.create({ name, address, description }, this.props.history);
  }
  render() {
    const { name, address, description } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <SchoolForm
        name={name}
        address={address}
        description={description}
        handleChange={handleChange}
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
    create: (school, history) => dispatch(createSchool(school, history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewSchool);
