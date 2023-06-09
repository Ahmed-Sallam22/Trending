import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { ToastContainer } from 'react-toastify';




function App() {
  
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveUserData();
    }
  },[])
  const [UserData, setuserData] = useState(null);


  function saveUserData(){
    let encodedToken= localStorage.getItem('userToken');
    let decodedToken= jwtDecode(encodedToken);
    setuserData(decodedToken)
  }
  let routers = createBrowserRouter([
    { path: "", element: <Layout setuserData={setuserData}  UserData={UserData}/> , children: [
      {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute> },
      {path:"movies" , element:<ProtectedRoute> <Movies/> </ProtectedRoute> },
      {path:"tvshow" , element:<ProtectedRoute> <Tvshow/> </ProtectedRoute> },
      {path:"people" , element:<ProtectedRoute> <People/> </ProtectedRoute>},
      {path:"MovieDetails/:id/:mediaType" , element:<ProtectedRoute> <MovieDetails /> </ProtectedRoute>},
      {path:"login" , element: <Login saveUserData={saveUserData}/>},
      {path:"register" , element: <Register/>},
      {path:"*" , element: <ProtectedRoute> <Notfound/> </ProtectedRoute> },
    ]}
  ])
  return<> 
          <ToastContainer theme='colored'/>
  <RouterProvider router={routers}></RouterProvider></>
}

export default App;
