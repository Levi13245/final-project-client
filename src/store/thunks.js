/* ===== /src/store/thunks.js ===== */
import * as ac from './actions/actionCreators';
import axios from 'axios';

// Campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/campuses');
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchCampusThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    const res = await axios.post('/api/campuses', campus);
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.error(err);
  }
};

export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(ac.editCampus(res.data));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/students');
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/students/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addStudentThunk = (student) => async (dispatch) => {
  try {
    const res = await axios.post('/api/students', student);
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

export const editStudentThunk = (student) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const enrollStudentThunk = (studentId, campusId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/students/${studentId}/enroll`, { campusId });
    dispatch(ac.editStudent(res.data));
  } catch (err) {
    console.error(err);
    throw err;
  }
};