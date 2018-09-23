import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

//action types
const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const EDIT_SCHOOL = 'EDIT_SCHOOL';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_SCHOOL = 'DELETE_SCHOOL';

//action creators
const _loadSchools = schools => ({ type: LOAD_SCHOOLS, schools });
const _loadStudents = students => ({ type: LOAD_STUDENTS, students });
const _editSchool = school => ({ type: EDIT_SCHOOL, school });
const _editStudent = student => ({ type: EDIT_STUDENT, student });
const _deleteSchool = id => ({ type: DELETE_SCHOOL, id });

export const loadSchools = () => {
  return async dispatch => {
    const schools = await axios.get('/api/schools');
    dispatch(_loadSchools(schools.data));
  };
};

export const loadStudents = () => {
  return async dispatch => {
    const students = await axios.get('/api/students');
    dispatch(_loadStudents(students.data));
  };
};

export const editSchool = (school, history) => {
  return async dispatch => {
    const data = await axios.put(`/api/schools/${school.id}`, school);
    console.log(data);
    dispatch(_editSchool(data.data));
    history.push('/schools');
  };
};

export const editStudent = (student, history) => {
  return async dispatch => {
    const data = await axios.put(`/api/schools/${id}`, student);
    dispatch(_editStudent(data.data));
    history.push('/students');
  };
};

export const deleteSchool = (id, history) => {
  //console.log(id);
  return async dispatch => {
    await axios.delete(`/api/schools/${id}`);
    dispatch(_deleteSchool(id));
    history.push('/schools');
  };
};

const reducer = (state = { schools: [], students: [] }, action) => {
  switch (action.type) {
    case DELETE_SCHOOL:
      return {
        ...state,
        schools: state.schools.filter(school => {
          return school.id !== action.id;
        }),
      };
    case EDIT_SCHOOL:
      return {
        ...state,
        schools: state.schools.map(school => {
          if (school.id === action.school.id) return action.school;
          return school;
        }),
      };
    case EDIT_STUDENT:
      return {
        ...state,
        students: state.students.map(student => {
          if (student.id === action.student.id) return action.student;
          return student;
        }),
      };
    case LOAD_SCHOOLS:
      return { ...state, schools: action.schools };
    case LOAD_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
