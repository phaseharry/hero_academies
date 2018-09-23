import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadSchools, loadStudents } from '../store';
import Schools from './Schools';
import Students from './Students';
import Nav from './Nav';
import IndSchool from './IndivSchool';

class Main extends React.Component {
  componentDidMount() {
    this.props.loadSchools();
    this.props.loadStudents();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route
              path="/schools/:id"
              render={props => <IndSchool {...props} />}
            />
            <Route path="/schools" render={props => <Schools {...props} />} />
            <Route path="/students" render={props => <Students {...props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSchools: () => dispatch(loadSchools()),
    loadStudents: () => dispatch(loadStudents()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Main);
