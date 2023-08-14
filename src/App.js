import React, { useEffect } from 'react'
import Form from './Components/Form'

export default function App() {
  useEffect(() => {
    document.title = "Super App";
  }, []);
 
  return (
    <div>
     <Form></Form>
    </div>
  )
}
