import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/reviews`;

// const checkReviewExists = async (droneId, userId) => {
//   const response = await this.api.get(`${baseUrl}/check-review/${droneId}/${userId}`);
//   return response.data;
// };

class ReviewsService {
  constructor() {
    this.api = axios.create({
      baseURL: baseUrl
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
  return this.api.put(`/edit/${id}`, body).then(({ data }) => data);
}

getReviewsByUser() {
  return this.api.get('/user', {}).then(({ data }) => data);
}



async checkReviewExists(droneId, userId) {
  const response = await this.api.get(`${baseUrl}/check-review/${droneId}/${userId}`);
  return response.data;
}

}


const reviewsService = new ReviewsService();

export default reviewsService;
