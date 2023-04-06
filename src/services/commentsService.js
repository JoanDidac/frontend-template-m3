import axios from 'axios';

class CommentsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/comments`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

getComments(){
  return this.api.get('/').then(({ data }) => data);
}

getComment(id){
  return this.api.get(`/${id}`).then(({ data }) => data);
}

deleteComments(id){
  return this.api.delete(`/${id}`).then(({ data }) => data);
}

createComment(body){
  return this.api.post('/', body).then(({ data }) => data);
}

editComment(id, body){
  return this.api.put(`/${id}`, body).then(({ data }) => data);
}
  

}

const commentsService = new CommentsService();

export default commentsService;
