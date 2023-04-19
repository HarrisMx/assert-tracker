import axios from 'axios';

const  getAll = async () => {
  const baseURL = 'https://atracking.azurewebsites.net/api';
  let token = localStorage.getItem('jwt');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const [items, departments, shelves] = await Promise.all([
    axios.get(`${baseURL}/Items`, {headers:headers}),
    axios.get(`${baseURL}/Department`, {headers:headers}),
    axios.get(`${baseURL}/ShelveTypes`, {headers:headers}),
  ]);

  return { items: items.data, departments: departments.data, shelves: shelves.data }
}
  
export default getAll;