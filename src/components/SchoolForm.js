import React from 'react';
import StudentEnroller from './StudentEnroller'

const SchoolFrom = props => {
  const {
    name,
    address,
    description,
    deleteSchool,
    handleChange,
    handleSubmit,
    students,
    match,
    history,
    addStudent,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} id="schoolForm">
        <label htmlFor="name">Name:</label>
        <input value={name} name="name" onChange={handleChange} />
        <label htmlFor="description">Description:</label>
        <input value={description} name="description" onChange={handleChange} />
        <label htmlFor="address">Address:</label>
        <input value={address} name="address" onChange={handleChange} />
        <button type="submit">Edit</button>
      </form>
      <button onClick={() => deleteSchool(+match.params.id, history)}>
        Delete School
      </button>
      <h5>Enroll Student</h5>
      <StudentEnroller students={students} schoolId={match.params.id}/>
    </div>
  );
};

export default SchoolFrom;
