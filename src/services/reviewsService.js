import axios from 'axios';

class ReviewsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/reviews`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

getReviews(){
  return this.api.get('/').then(({ data }) => data);
}

getReview(id){
  return this.api.get(`/${id}`).then(({ data }) => data);
}

deleteReview(id){
  return this.api.delete(`/${id}`).then(({ data }) => data);
}

createReview(body){
  return this.api.post('/', body).then(({ data }) => data);
}

editReview(id, body){
  return this.api.put(`/${id}`, body).then(({ data }) => data);
}
  

}

const reviewsService = new ReviewsService();

export default reviewsService;
