import React, { useEffect, useState } from "react";
import profile from "../../src/images/profile.png";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Link, useParams, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Detail() {
  const [getuserdata, setGetdata] = useState([])
  console.log(getuserdata);

  const navigate = useNavigate();

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
      setGetdata(data);
      console.log("Get added");
    }
  };

  useEffect(()=>{
    getdata()
  },[])


  const deleteuser = async(id) =>{
    const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const deletedata = await res2.json()
    console.log(deletedata);

    if(res2.status === 422 || !deletedata){
      console.log("error");
    }
    else{
      console.log("user deleted");
      navigate("/")
    }
  }

  return (
    <div className="container m-4">
      <h1 style={{ fontWeight: "500" }}>Wellcome Govind Deshmukh</h1>
      <Card sx={{ maxWidth: 650, marginTop: 5 }}>
        <CardContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom:"1rem"
            }}
          >
            <img style={{ width: "3rem" }} src={profile} alt="" />
            <div style={{ textAlign: "right" }}>
              <Link to={`/edit/${id}`}>
                <button
                  style={{ marginRight: "2rem", marginBottom: "1rem" }}
                  className="btn btn-primary"
                >
                  <ModeEditIcon />
                </button>
              </Link>
              <button
              onClick={()=>deleteuser(getuserdata._id)}
                style={{ marginBottom: "1rem" }}
                className="btn btn-danger"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div className="box" style={{ display: "flex" }}>
            <div style={{width:"60rem"}} className="left">
              <h3 className="m-3">
                Name : <span>{getuserdata.name}</span>
              </h3>
              <h3 className="m-3">
                Age : <span>{getuserdata.age}</span>
              </h3>
              <h3 className="m-3">
                <EmailIcon style={{ fontSize: "2rem" }} />
                Email : <span>{getuserdata.email}</span>
              </h3>
              <h3 className="m-3">
                <WorkIcon style={{ fontSize: "2rem" }} />
                Occupation : <span>{getuserdata.work}</span>
              </h3>
            </div>
            <div style={{ marginLeft: "2rem",marginTop:"2rem"}} className="right">
              <p>
                <PhoneAndroidIcon /> Mobile: <span>{getuserdata.mobile}</span>
              </p>
              <p>
                <LocationOnIcon /> Location: <span>{getuserdata.add}</span>
              </p>
              <p>
                Description:
                <span style={{width:"100%",height:"3rem"}}>
                  {getuserdata.desc}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
