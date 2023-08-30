import React, { useEffect } from 'react'
import Form from './Components/Form'
import Category from './Components/Category';
import Homepage from './Components/Homepage';
import Browse from './Components/Browse';
import { Routes,Route } from 'react-router-dom';

export default function App() {
  useEffect(() => {
    document.title = "Super App";
  },[]);
 
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Form/>}/>
      <Route path='category' element={<Category/>}/>
      <Route path='homepage' element={<Homepage/>}></Route>
      <Route path='browse' element={<Browse/>}></Route>
    </Routes>
    </>
  )
}
