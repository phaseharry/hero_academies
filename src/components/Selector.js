import React from 'react';

class Selector extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
  componentDidMount(){
    let students = this.props.students.filter(
      student => student.schoolId !== school.id
    );
    
    if (!students) {
      const data = await axios.get('/api/students');
      students = data.data.filter(student => student.schoolId !== school.id);
    }  
  }
  render(){
    return (
      <select>

      </select>
    )
  }



}

