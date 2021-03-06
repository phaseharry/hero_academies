import React from 'react'
import {connect} from 'react-redux'
import StudentForm from './StudentForm'
import { createStudent } from '../store'


class NewPerson extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            gpa: 0,
            schoolId: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidUpdate(prevProps,prevState){
        // console.log(prevProps)
        // console.log(this.props)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.create(this.state, this.props.history)
        
    }
    render(){  
        const {firstName, lastName, gpa, schoolId} = this.state 
        const { schools, history } = this.props
        const { handleChange, handleSubmit} = this
        return (
            <StudentForm firstName={firstName} lastName={lastName} gpa={gpa} schoolId={schoolId} schools={schools} history={history} handleChange={handleChange} handleSubmit={handleSubmit}/>
        )
    }
}


const mapStateToProps = state => {
    return {
        schools: state.schools
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: (student, history) => dispatch(createStudent(student, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPerson)