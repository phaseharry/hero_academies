import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/schools">Schools {this.props.schools.length}</Link>
        </li>
        <li>
          <Link to="/students">Students {this.props.students.length}</Link>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools,
  };
};

export default connect(
  mapStateToProps,
  null
)(Nav);
