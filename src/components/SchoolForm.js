import React from 'react';

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
        <button onClick={() => deleteSchool(+match.params.id, history)}>
          Delete School
        </button>
      </form>
      <h5>Enroll Student</h5>
      <select name="enrollingStudents" form="schoolForm">
        <option value={null} />
        {students.map(student => (
          <option key={student.id} value={student.id}>{`${student.firstName} ${
            student.lastName
          }`}</option>
        ))}
      </select>
    </div>
  );
};

export default SchoolFrom;
