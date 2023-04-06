import axios from 'axios';

class LikeService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/likes`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

getLikes(){
  return this.api.get('/').then(({ data }) => data);
}

getLike(id){
  return this.api.get(`/${id}`).then(({ data }) => data);
}

deleteLike(id){
  return this.api.delete(`/${id}`).then(({ data }) => data);
}

createLike(body){
  return this.api.post('/', body).then(({ data }) => data);
}

// editLike(id, body){
//   return this.api.put(`/${id}`, body).then(({ data }) => data);
// }
  

}

const likeService = new LikeService();

export default likeService;