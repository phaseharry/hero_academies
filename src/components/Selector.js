import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

class Selector extends React.Component {
  constructor() {
    super();
    this.filterStudents = this.filterStudents.bind(this)
  }
  async componentDidMount(){
    // let students = this.props.students.filter(student => student.schoolId !== +this.props.match.params.id);
    // if (!students) {
    //   const data = await axios.get('/api/students');
    //   console.log(data.data)
    //   students = data.data.filter(student => student.schoolId !== school.id);
    // }  
    // console.log(students)
    // this.setState({students})
  }
  // componentDidUpdate(prevProps, prevState){
  //   console.log(prevProps)
  //   console.log(this.props)
  // }
  filterStudents(){
    console.log(this.props.students.filter(student => student.schoolId !== +this.props.match.params.id))
    return this.props.students.filter(student => student.schoolId !== +this.props.match.params.id)
  }
  render(){
    // const {students} = this.state
    return (
      <div>
        {/* <select>  
          {
            students.map(student => <option key={student.id} value={student}>{`${student.firstName} ${student.lastName}`}</option>)
          }
        </select> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    students: state.students,
    schools: state.schools
  }
}

export default connect(mapStateToProps, null)(Selector)