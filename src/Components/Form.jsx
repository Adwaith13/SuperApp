import React, { useState } from "react";
import emailValidator from "email-validator";
import { useNavigate } from "react-router-dom";
import  './Form.css'

export default function Form() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    number: "",
  });
  const changeHandle = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [email, setEmail] = useState(" ");
  const [isValid, setisValid] = useState(false);
  const [error, setError] = useState(false);
  const[checked,setChecked]=useState(false)
 
  const validemail = emailValidator.validate(email)
  const navigate=useNavigate();

  const checkboxHandle=()=>{
    setChecked(!checked)
    setError(false)
  }
  const submitHandle = (e) => {
    setisValid(validemail);
    console.log(values);
    console.log("email is" + email);
    e.preventDefault();
    if (values.name.length <= 0 || values.username.length <= 0 ||values.number.length < 10 || !checked || !isValid) {
      setError(true);

    } else {
      setError(false);
      localStorage.setItem('Values', values)
      navigate('category')
    }
  
  };

  return (
    <>
     <img src="/image1.png" alt="Image1" className="left-img"></img>
     <span id="image-text">Discover new things on</span><br></br>
     <span id="image-text1">Superapp</span>
     <div className="right">
      <form>
        <h1 id="head">Super app</h1>
        <p id="para">Create your new account</p>
        <input type="input" id='input' name="name" value={values.name} onChange={changeHandle} placeholder="Name"></input>
        <br />
        {error && values.name.length < 1 ? <label id="error">Field is required</label> :""}
        <br></br>
        <input type="input" id='input' name="username" value={values.username} onChange={changeHandle} placeholder="Username"></input>
        <br />
        {error && values.username.length < 1 ? <label id="error">Field is required</label> :""}
        <br></br>
        <input type="input" id='input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <br/>
        {isValid && email.length >= 6 ? "" : <label id="error">Field is required</label>}
        <br></br>
        <input type="text" id='input' name="number" placeholder="Number" value={values.number} onChange={changeHandle}></input>
        <br />
        {error && values.number.length < 10   ? <label id="error">Field is required</label> :""}
        <br></br>
        <input type="checkbox" id='check' checked={checked} onChange={checkboxHandle}></input><span id="check-text">Share my registration data with Superapp</span><br></br>
        {error ?<label id="error">Check the box if you want to proceed</label>:''}<br/>
        <button onClick={submitHandle}>SIGN UP</button>
        <br></br>
        <br></br>
        <span id="terms">By clicking on Sign up. you agree to Superapp</span>    <span id="green">Terms and</span><br></br>
        <span id="green">Conditions of Use</span>
        <br></br>
        <span id="terms2">To learn more about how Superapp collects, uses, shares and </span> <br></br>
        <span id="terms2">protects your personal data please head Superapp</span>   <span id='green2'>Privacy</span> <br></br>
        <span id="green2">Policy</span>
      </form>
      </div>
    </>
  );
}
