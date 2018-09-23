import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { editSchool, deleteSchool } from '../store';
import Selector from './Selector';

class IndivSchool extends React.Component {
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
  async componentDidMount() {
    let school = this.props.schools.find(
      school => school.id === +this.props.match.params.id
    );

    if (!school) {
      const data = await axios.get(
        `/api/schools/${this.props.match.params.id}`
      );
      school = data.data;
    }

    this.setState({
      name: school.name,
      address: school.address,
      description: school.description,
      potentialStudents: students,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, address, description, enrollingStudents } = this.state;
    this.props.edit(
      {
        name,
        address,
        description,
        enrollingStudents,
        id: this.props.match.params.id,
      },
      this.props.history
    );
  }
  addStudent() {}
  render() {
    const { name, address, description, potentialStudents } = this.state;
    const { deleteSchool, match, history } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input value={name} name="name" onChange={this.handleChange} />
          <label htmlFor="description">Description:</label>
          <input
            value={description}
            name="description"
            onChange={this.handleChange}
          />
          <label htmlFor="address">Address:</label>
          <input value={address} name="address" onChange={this.handleChange} />
          <button type="submit">Edit</button>
          <button onClick={() => deleteSchool(+match.params.id, history)}>
            Delete School
          </button>
          <Selector id={+match.params.id} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    edit: (school, history) => dispatch(editSchool(school, history)),
    deleteSchool: (id, history) => dispatch(deleteSchool(id, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndivSchool);
