import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../store';
import Schools from './Schools';
import Students from './Students';
import Nav from './Nav';
import IndivSchool from './IndivSchool';
import IndivStudent from './IndivStudent';

class Main extends React.Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route
                path="/schools/:id"
                render={props => <IndivSchool {...props} />}
              />
              <Route
                path="/students/:id"
                render={props => <IndivStudent {...props} />}
              />
              <Route
                exact
                path="/schools"
                render={props => <Schools {...props} />}
              />
              <Route
                exact
                path="/students"
                render={props => <Students {...props} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Main);
