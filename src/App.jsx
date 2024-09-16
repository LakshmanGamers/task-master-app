import { useState } from 'react'
import {Route , Routes , Navigate} from 'react-router-dom';
import Auth from './components/auth/Auth';
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/MainScreen';
import NotFound from './components/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Auth from './components/auth/Auth';

function App() {
 
  

  return (
    <>
     <Routes>
      <Route path='/' element={<HomeScreen/>} />
      <Route path='/auth/login/' element={<Auth/>} />
      <Route path='/auth/signup' element={<Auth/>}/>
      <Route path='/app' element={<Navigate to="/app/all" />} />
<Route path='/app' element={<MainScreen />}>
  <Route index element={<Navigate to="all" />} /> 
  <Route path='all' element={<MainScreen />} /> 
  <Route path=':project' element={<MainScreen />} />
</Route>

      <Route path='*' element={<NotFound/>} />
     </Routes>
    </>

  )
}

export default App
