import React from 'react';
import { connect } from 'react-redux';
import { enrollStudent } from '../store';

class StudentEnroller extends React.Component {
  constructor() {
    super();
    this.state = {
      studentId: null,
    };
    this.selectNewStudent = this.selectNewStudent.bind(this);
  }
  selectNewStudent(event) {
    event.preventDefault();
    this.setState({
      studentId: event.target.value,
    });
  }

  render() {
    const { students, schoolId, enroll } = this.props;
    const { selectNewStudent } = this;
    const finalizedStudents = students ? students : [];
    return (
      <div className={schoolId ? '' : 'hidden'}>
        <form>
          <select onChange={selectNewStudent} name="selector">
            <option value={null} />
            {finalizedStudents.map(student => (
              <option value={student.id} key={student.id}>{`${
                student.firstName
              } ${student.lastName}`}</option>
            ))}
          </select>
        </form>
        <button onClick={() => enroll(this.state.studentId, schoolId)}>
          Enroll Student
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enroll: (studentId, schoolId) =>
      dispatch(enrollStudent(studentId, schoolId)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StudentEnroller);

// {students.map(student => (
//     <option key={student.id} value={student.id}>{`${student.firstName} ${
//       student.lastName
//     }`}</option>
//   ))}
// </select>
