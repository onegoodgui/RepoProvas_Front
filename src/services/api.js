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

async function searchFilter(token, filterType){
  const config = createConfig(token);

  return axios.get(`${BASE_URL}/filter/${filterType}`, config)
}

export const api = {
    createConfig,
    signUp,
    signIn,
    searchFilter
}