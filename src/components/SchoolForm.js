import React from 'react'
import Selector from './Selector'

const SchoolFrom = props => {
    const {name, address, description, deleteSchool, handleChange, handleSubmit, students, match, history, addStudent} = props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input value={name} name="name" onChange={handleChange} />
          <label htmlFor="description">Description:</label>
          <input
            value={description}
            name="description"
            onChange={handleChange}
          />
          <label htmlFor="address">Address:</label>
          <input value={address} name="address" onChange={handleChange} />
          <button type="submit">Edit</button>
          <button onClick={() => deleteSchool(+match.params.id, history)}>
            Delete School
          </button>
         
        </form>
      </div>
    )
}

export default SchoolFrom