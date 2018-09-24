import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Students extends React.Component {
  render() {
    return (
      <ul>
        {this.props.students.map(student => {
          return (
            <Link to={`/students/${student.id}`} key={student.id}>
              <li>
                {student.firstName} {student.lastName}
              </li>
            </Link>
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
