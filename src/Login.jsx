import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
function Login (){
  const[email, setEmail] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [same, setSame] = useState(null);

   const navigate = useNavigate();

  function handlePwd1Change(event) {
    const value = event.target.value;
    setPwd1(value);
    checkPasswords(value, pwd2);
  }
  function handlePwd2Change(event) {
    const value = event.target.value;
    setPwd2(value);
    checkPasswords(pwd1, value);
  }

  function checkPasswords(p1, p2) {
    if (p1 === "" && p2 === "") {
      setSame(null);
      return;
    }
 
    if (p1 === p2) {
      console.log("Same");
      setSame(true);
    } else {
      console.log("Not Same");
      setSame(false);
    }
  }
function handleSubmit(e) {
    e.preventDefault(); 
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }
    if (pwd1.trim() === "" || pwd2.trim() === "") {
      alert("Please enter both passwords");
      return;
    }
    if (!same) {
      alert("Passwords do not match");
      return;
    }
    localStorage.setItem("userEmail", email);
    navigate("/create");
  }
  
    return(
<>
<form className="my-5" style={{width:"50%", margin:"auto"}}
  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} id="exampleInputEmail1" onChange={(e)=> setEmail(e.target.value)} aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={pwd1} onChange={handlePwd1Change} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
   <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Confrim Password</label>
    <input value={pwd2} onChange={handlePwd2Change} type="password" className="form-control" id="exampleInputPassword2" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">agree terms and condition</label>
  </div>
  {same === true && <p style={{color:"green"}}> Password Match</p>}
  {same === false && <p style={{color:"red"}}>Passwords Do not Match</p>}
  <button type="submit" className="btn btn-primary">Create an Account</button>
</form>
</>
    );
}
export default Login;