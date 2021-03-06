import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Schools extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.schools.map(school => {
            return (
              <Link key={school.id} to={`/schools/${school.id}`}>
                <li>{school.name}</li>
              </Link>
            );
          })}
        </ul>
        <Link to="/schools/create">Create School</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
  };
};

// const mapDispatch = dispatch => {
//   return {
//     delete: id => dispatch(deleteSchool(id)),
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Schools);
