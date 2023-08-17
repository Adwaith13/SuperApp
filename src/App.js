import React, { useEffect } from 'react'
import Form from './Components/Form'
import Category from './Components/Category';
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
    </Routes>
    </>
  )
}
