import React from 'react';
import { connect } from 'react-redux';
import { editStudent, deleteStudent } from '../store';
import StudentForm from './StudentForm';

class IndivStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0,
      schoolId: 0,
    };
    this.filterStudent = this.filterStudent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.filterSchool = this.filterSchool.bind(this);
  }
  componentDidMount() {
    const student = this.filterStudent(this.props.students);
    //console.log(student)
    if (student) {
      const { firstName, lastName, gpa, schoolId } = student;
      this.setState({
        firstName,
        lastName,
        gpa,
        schoolId,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
    console.log(this.props)
    if (
      prevProps.students.length !== this.props.students.length &&
      prevProps.schools.length !== this.props.schools.length
    ) {
      const student = this.filterStudent(this.props.students);
      console.log(student)
      const { firstName, lastName, gpa, schoolId } = student;
      this.setState({
        firstName,
        lastName,
        gpa,
        schoolId,
      });
    }
  }
  filterStudent(students) {
    return students.find(student => student.id === +this.props.match.params.id);
  }
  filterSchool() {
    const student = this.filterStudent(this.props.students);
    if (!student) return null;
    const school = this.props.schools.filter(
      school => school.id !== student.schoolId
    );
    return school;
  }
  handleChange(event) {
    // console.log(event.target.name)
    // console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    this.props.edit(
      { ...this.state, id: this.props.match.params.id },
      this.props.history
    );
  }
  deleteStudent(id, history) {
    // console.log(this.props)
    this.props.deleteStudent(id, history);
  }
  render() {
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { match, history } = this.props;
    const { handleChange, handleSubmit, deleteStudent, filterSchool } = this;
    const schools = filterSchool() || [];
    return (
      <StudentForm
        firstName={firstName}
        lastName={lastName}
        gpa={gpa}
        schoolId={schoolId}
        match={match}
        history={history}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deleteStudent={deleteStudent}
        schools={schools}
      />
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
    edit: (student, history) => dispatch(editStudent(student, history)),
    deleteStudent: (id, history) => dispatch(deleteStudent(id, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndivStudent);
