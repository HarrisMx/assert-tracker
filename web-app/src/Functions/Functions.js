import axios from 'axios';

const  getAll = async () => {
  const baseURL = 'https://atracking.azurewebsites.net/api';
  let token = localStorage.getItem('jwt');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const [items, departments, shelves, assignments] = await Promise.all([
    axios.get(`${baseURL}/Items`, {headers:headers}),
    axios.get(`${baseURL}/Department`, {headers:headers}),
    axios.get(`${baseURL}/ShelveTypes`, {headers:headers}),
    axios.get(`${baseURL}/ItemEmployeeAssignment`, {headers:headers})
  ]);

  return { items: items.data, departments: departments.data, shelves: shelves.data, assignments: assignments.data }
}
  
export default getAll;