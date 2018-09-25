import React from 'react'
import { connect } from 'react-redux'
import { editStudent, deleteStudent, fetchStudent }from '../store'

class IndivStudent extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            gpa: 0,
            schoolId: 0
        }
        this.filterStudent = this.filterStudent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
    }
    async componentDidMount(){
        const student = this.filterStudent(this.props.students)
        if(student){
            const { firstName, lastName, gpa, schoolId} = student
            this.setState({
                firstName, lastName, gpa, schoolId
            })
        }
       
    }
    componentDidUpdate(prevProps, prevState){
        console.log(prevProps)
        console.log(this.props)
        if(prevProps.students.length !== this.props.students.length && prevProps.schools.length !== this.props.schools.length){
            const student = this.filterStudent(this.props.students)
            const {firstName, lastName, gpa, schoolId} = student
            this.setState({
                firstName,
                lastName,
                gpa,
                schoolId
            })
        } 
    }
    filterStudent(students){
        return students.find(student => student.id === +this.props.match.params.id)
    }
    handleChange(event){
        console.log(event.target.name)
        this.setState({
            [event.target.name] : event.target.value
    })
    }
    handleSubmit(event){
      event.preventDefault()
      console.log(typeof this.state.gpa)
      this.props.edit({...this.state, id: this.props.match.params.id}, this.props.history)
    }
    deleteStudent(id, history){
        console.log(this.props)
        this.props.deleteStudent(id, history)
    }
    render(){
        const { firstName, lastName, gpa, schoolId } = this.state
        const { match, history } = this.props
        const { handleChange, handleSubmit, deleteStudent } = this
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input value={firstName} name="firstName" onChange={handleChange} />
                <label htmlFor="lastName">Last Name:</label>
                <input
                value={lastName}
                name="lastName"
                onChange={handleChange}
                />
                <label htmlFor="gpa">GPA:</label>
                <input value={gpa} name="gpa" onChange={handleChange} />
                <label htmlFor="school"></label>
                <button type="submit">Edit</button>
                <button onClick={() => deleteStudent(+match.params.id, history)}>
                Delete Student
                </button>
             </form>
        )
    }


}


const mapStateToProps = state => {
    return {
        students: state.students,
        schools: state.schools
    }
}

const mapDispatchToProps = dispatch => {
    return {
        edit: (student, history) => dispatch(editStudent(student, history)),
        deleteStudent: (id, history) => dispatch(deleteStudent(id,history)),
        fetchStudent: (id) => fetchStudent(id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndivStudent)