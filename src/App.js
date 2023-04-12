import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import DronesList from './components/DronesList';
import PostsList from './components/PostsList';
import PostDetails from './components/PostDetails';
// import LandingPage from './components/LandingPage';
import DroneDetails from './components/DronesDetails';
import MyProfile from './components/MyProfile';
import EditReview from './components/EditReview';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/myprofile" element={<IsPrivate><MyProfile /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/drones" element={<DronesList/>} />
        <Route path="/drones/:id" element={<DroneDetails />} />
        <Route path="/reviews/edit/:id" element={<IsPrivate><EditReview /></IsPrivate>} />

        <Route path="/posts" element={<PostsList/>} />
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
