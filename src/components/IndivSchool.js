import React from 'react';
import { connect } from 'react-redux';
import { editSchool, deleteSchool, fetchSchool, loadData} from '../store';
import SchoolForm from './SchoolForm'


class IndivSchool extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
      enrollingStudents: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.findSchool = this.findSchool.bind(this)
  }
  componentDidMount() {
    let school = this.findSchool()
    if(school){
      this.setState({
        name: school.name,
        address: school.address,
        description: school.description,
      });
    } 
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.schools.length !== this.props.schools.length && prevProps.students.length !== this.props.students.length){
      // this.props.loadData()
      const school = this.findSchool();
      this.setState({
        name: school.name,
        address: school.address,
        description: school.description,
      });
    }
  } 

  findSchool(){
    return this.props.schools.find(
      school => school.id === +this.props.match.params.id
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, address, description } = this.state;
    this.props.edit(
      {
        name,
        address,
        description,
        id: this.props.match.params.id,
      },
      this.props.history
    );
  }

  addStudent(event) {
    console.log(event.target.value)
  }

  render() {
    const { name, address, description, enrollingStudents } = this.state;
    const { match, history, deleteSchool, students} = this.props
    const {handleChange, handleSubmit, addStudent} = this
    return (
      <div>
        <div>Enrolling Students:{enrollingStudents.length}</div>
        <SchoolForm name={name} address={address} description={description} deleteSchool={deleteSchool} handleChange={handleChange} handleSubmit={handleSubmit} match={match} history={history} students={students}/>
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
    fetchSchool : id => fetchSchool(id),
    loadData: () => dispatch(loadData())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(IndivSchool);
