import axios from "axios";

const BASE_URL = 'http://localhost:5000'

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signUp(signUpData) {
  return axios.post(`${BASE_URL}/sign-up`, signUpData);
}

function signIn(signInData) {
  return axios.post(`${BASE_URL}/sign-in`, signInData);
}

function searchFilter(token, filterType, search){
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/filter/${filterType}?filterSearch=${search}`, config)
}

function updateViews(token, testId){
  const config = createConfig(token);

  return axios.patch(`${BASE_URL}/tests/${testId}`,null,config);
}

function getTests(token){
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/tests`, config);
}

function getTeachersByDiscipline(token, id){
  const config = createConfig(token);
  return axios.get(`${BASE_URL}/tests/discipline/${id}/teachers`, config)
}

function submitTest(token, test){
  const config = createConfig(token);
  return axios.post(`${BASE_URL}/tests`, test, config);
}

export const api = {
    createConfig,
    signUp,
    signIn,
    searchFilter,
    updateViews,
    getTests,
    getTeachersByDiscipline,
    submitTest
}