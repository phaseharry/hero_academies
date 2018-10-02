import React from 'react';

const StudentForm = props => {
  const {
    firstName,
    lastName,
    gpa,
    schoolId,
    match,
    history,
    handleChange,
    handleSubmit,
    deleteStudent,
    schools,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} id="studentForm">
        <label htmlFor="firstName">First Name:</label>
        <input value={firstName} name="firstName" onChange={handleChange} />
        <label htmlFor="lastName">Last Name:</label>
        <input value={lastName} name="lastName" onChange={handleChange} />
        <label htmlFor="gpa">GPA:</label>
        <input value={gpa} name="gpa" onChange={handleChange} />
        <button type="submit">{match? 'Edit' : 'Create'}</button>
      </form>
      <button onClick={() => deleteStudent(+match.params.id, history)} className={match? '' : 'hidden'}>
        Delete Student
      </button>
      <div>
        <h5>Enroll</h5>
        <select name="schoolId" form="studentForm" onChange={handleChange}>
          <option value={schoolId? schoolId : null}>{match? 'Keep Enrollment' : 'Scroll down to enroll'}</option>
          {schools.map(school => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StudentForm;
