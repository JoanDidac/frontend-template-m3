import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation();
 
  return (
    <div>
      <p>Sorry, there is no URL called {location.pathname} in this website. You might want to <Link to="/">go to the main site</Link></p>
    </div>
  )
}
