import React, { useContext, useEffect, useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
// import useHistory from 'use-history'
import { Updatedata } from './context/ContextProvider';

export default function Edit() {

  // const [getuserdata, setGetdata] = useState([])
  // console.log(getuserdata);

  // const history = useHistory("")
  const navigate = useNavigate();

  const {updata,setupdata} = useContext(Updatedata)


  const [intvalue, setinpvalue] = useState({
    name:"",
    age:"",
    work:"",
    email:"",
    mobile:"",
    add:"",
    desc:""

  })

  const onsubmits = (e) =>{
    e.preventDefault()
  }

  const change = (e) =>{
      // setvalue(e.target.value)
      console.log(e.target.value);
      const {name, value} = e.target
      setinpvalue((preval)=>{
        return {
          ...preval, [name]:value
        }
      })
  }

  

  const {id} = useParams("")
  console.log(id);

  const getdata = async (e) => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      // alert("error")
      console.log("Error");
    } else {
      setinpvalue(data);
      console.log("Get added");
      
    }
  };

  useEffect(()=>{
    getdata();
  },[])

  const updateuser = async(e) => {
    const {name,age,work,email,mobile,add,desc} = intvalue;
    e.preventDefault();
    const res2 = await fetch(`/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,age,work,email,mobile,add,desc
      })
    })
    const data2 = await res2.json()
    console.log(data2);

    if(res2.status === 422 || !data2){
      alert("Fill the data")
    }
    else{
      // alert("data added")
      navigate("/")
      setupdata(data2)
    }
  }

  return (
    <div className="conatiner m-5">
      <div className="conatiner m-3">

      <form onSubmit={onsubmits}>
        <div className='full-form d-flex w-100 '>
      <div className='left w-50 m-3'>
 
    <div className="form-group ">
    <label htmlFor="exampleInputPassword1">Name</label>
    <input type="text" value={intvalue.name} onChange={change} name='name' className="form-control"  placeholder="Enter Your Name" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Age</label>
    <input type="number"    onChange={change}  value={intvalue.age} name='age' className="form-control"  placeholder="Enter Your Age" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Work</label>
    <input type="text"  onChange={change}   value={intvalue.work} name='work' className="form-control"  placeholder="About Your Work" />
  </div>
      </div>
      <div className='right w-50 m-3'> 
      <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" onChange={change}   value={intvalue.email} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Mobile</label>
    <input type="number" onChange={change}  value={intvalue.mobile} name='mobile' className="form-control"  placeholder="Enter Your Age" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Address</label>
    <input type="text" onChange={change} value={intvalue.add} name='add' className="form-control"  placeholder="About Your Work" />
  </div>
      </div>
        </div>
    <div className="containe">
    <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea name='desc' onChange={change} value={intvalue.desc} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
  </div>
    </div>
  <button onClick={updateuser} type="submit" className="btn btn-primary m-3 w-100 d-flex justify-content-center align-item-center">Submit</button>
</form>
    </div>
      </div>
  );
}
