import React, {  useContext, useState } from "react";
import {   useNavigate } from 'react-router-dom';
import { Adddata } from "./context/ContextProvider"

export default function Register() {

  const {udata, setudata} = useContext(Adddata)
  const navigate = useNavigate();
  const [inptvalue, setinpvalue] = useState({
    name: "",
    age: "",
    work: "",
    email: "",
    mobile: "",
    add: "",
    desc: "",
  });

  const change = (e) => {
    // setvalue(e.target.value)
    console.log(e.target.value);
    const { name, value } = e.target;
    setinpvalue((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const adddata = async (e) => {
    e.preventDefault()
    const {name,age,work,email,mobile,add,desc} = inptvalue;
    const res = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name, age, work, email, mobile, add, desc
      }) 
    })
    const data = await res.json()
    console.log(data);

    if(res.status === 422 || !data){
      alert("error")
    }
    else{
      // alert("data added")
      setudata(data)
      console.log("data added");
      navigate("/")
    }
    // const data = await fetch("/register",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //     name,age,work,email,mobile,add,desc
    //   })
    // })
    // const res = await data.json();
    // console.log(res.status);

    // if(res.status === 404 || !res){
    //   alert("error");
      
    // }
    // else{
    //   alert("data added")
    // }

  };

  return (
    <div className="conatiner m-5">
      <div className="conatiner m-3">
        <form >
          <div className="full-form d-flex w-100 ">
            <div className="left w-50 m-3">
              <div className="form-group ">
                <label htmlFor="exampleInputPassword1">Name</label>
                <input
                  type="text"
                  value={inptvalue.name}
                  onChange={change}
                  name="name"
                  className="form-control"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Age</label>
                <input
                  type="number"
                  onChange={change}
                  value={inptvalue.age}
                  name="age"
                  className="form-control"
                  placeholder="Enter Your Age"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Work</label>
                <input
                  type="text"
                  onChange={change}
                  value={inptvalue.work}
                  name="work"
                  className="form-control"
                  placeholder="About Your Work"
                />
              </div>
            </div>
            <div className="right w-50 m-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  onChange={change}
                  value={inptvalue.email}
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mobile</label>
                <input
                  type="number"
                  onChange={change}
                  value={inptvalue.mobile}
                  name="mobile"
                  className="form-control"
                  placeholder="Enter Your Age"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Address</label>
                <input
                  type="text"
                  onChange={change}
                  value={inptvalue.add}
                  name="add"
                  className="form-control"
                  placeholder="About Your Work"
                />
              </div>
            </div>
          </div>
          <div className="containe">
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
              type="text"
                name="desc"
                onChange={change}
                value={inptvalue.desc}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
          <button
            onClick={adddata}
            type="submit"
            className="btn btn-primary m-3 w-100 d-flex justify-content-center align-item-center"
          >
            Add Data
          </button>
        </form>
      </div>
    </div>
  );
}
