import React from 'react';
import { connect } from 'react-redux';

class Students extends React.Component {
  render() {
    return (
      <ul>
        {this.props.students.map(student => {
          console.log(student);
          return (
            <li key={student.id}>
              {student.firstName} {student.lastName}
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         delete:
//     }
// }

export default connect(
  mapStateToProps,
  null
)(Students);
