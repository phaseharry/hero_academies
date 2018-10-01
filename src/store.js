import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

//action types
const LOAD_DATA = 'LOAD_DATA';
const EDIT_SCHOOL = 'EDIT_SCHOOL';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
//action creators
const _loadData = (schools, students) => ({
  type: LOAD_DATA,
  schools,
  students,
});

const _editSchool = school => ({ type: EDIT_SCHOOL, school });
const _editStudent = student => ({ type: EDIT_STUDENT, student });
const _deleteSchool = id => ({ type: DELETE_SCHOOL, id });
const _deleteStudent = id => ({ type: DELETE_STUDENT, id });
const _enrollStudent = student => ({ type: ENROLL_STUDENT, student})

export const loadData = () => {
  return async dispatch => {
    const schools = await axios.get('/api/schools');
    const students = await axios.get('/api/students');
    dispatch(_loadData(schools.data, students.data));
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
    const data = await axios.put(`/api/students/${student.id}`, {
      ...student,
      schoolId: +student.schoolId,
      gpa: +student.gpa,
    });
    console.log(data);
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

export const deleteStudent = (id, history) => {
  return async dispatch => {
    await axios.delete(`/api/students/${id}`);
    dispatch(_deleteStudent(id));
    history.push('/students');
  };
};

export const enrollStudent = (studentId, schoolId) => {
  return async dispatch => {
    const student = await axios.put(`/api/students/${studentId}`, { schoolId: +schoolId })
    dispatch(_enrollStudent(student.data))
  }
}


const reducer = (state = { schools: [], students: [] }, action) => {
  switch (action.type) {
    case ENROLL_STUDENT: 
      return {...state, students: state.students.map(student => {
        if (student.id === action.student.id){
          return action.student
        }
        return student
      })
    }
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.id),
      };
    case DELETE_SCHOOL:
      return {
        ...state,
        students: state.students.map(student => {
          if (student.schoolId === action.id) {
            student.schoolId = null;
            return student;
          }
          return student;
        }),
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
    case LOAD_DATA:
      return { ...state, schools: action.schools, students: action.students };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
