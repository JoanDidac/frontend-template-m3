import axios from 'axios';

class DroneService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/drones`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

getDrones(){
  return this.api.get('/').then(({ data }) => data);
}

getDrone(id){
  return this.api.get(`/${id}`).then(({ data }) => data);
}

deleteDrone(id){
  return this.api.delete(`/${id}`).then(({ data }) => data);
}

createDrone(body){
  return this.api.post('/', body).then(({ data }) => data);
}

editDrone(id, body){
  return this.api.put(`/${id}`, body).then(({ data }) => data);
}
  

}

const droneService = new DroneService();

export default droneService;
