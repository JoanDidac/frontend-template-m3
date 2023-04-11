import axios from 'axios';

class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/posts`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

getPosts(){
  return this.api.get('/').then(({ data }) => data);
}

getPost(id){
  return this.api.get(`/${id}`).then(({ data }) => data);
}

deletePost(id){
  return this.api.delete(`/${id}`).then(({ data }) => data);
}

createPost(body){
  return this.api.post('/', body).then(({ data }) => data);
}

editPost(id, body){
  return this.api.put(`/${id}`, body).then(({ data }) => data);
}
  
getPostsByUser(userId) {
  const query = { user: userId };
  return this.api.get('/', { params: { query } }).then(({ data }) => data);
}



}

const postService = new PostService();

export default postService;
