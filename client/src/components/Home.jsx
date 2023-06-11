import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Adddata } from "./context/ContextProvider";
import { Updatedata } from "./context/ContextProvider";
import { Deletedata } from "./context/ContextProvider";

export default function Home() {
  const [getuserdata, setGetdata] = useState([]);
  // const {udata, setudata} = useContext(Appdata)
  const { udata, setudata } = useContext(Adddata);
  const { updata, setupdata } = useContext(Updatedata);
  const { deldata, setdeldata } = useContext(Deletedata);
  console.log(getuserdata);
  const getdata = async (e) => {
    const res = await fetch("http://localhost:8000/getdata", {
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
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      getdata();
      setdeldata(deletedata);
    }
  };

  return (
    <>
      <div>
        <div>

        {udata ? (
          <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{udata.name}</strong> is added succesfully.
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
        ) : (
          ""
          )}
          </div>
          <div>

        {updata ? (
          <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{updata.name}</strong> updated succesfully.
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                ></button>
            </div>
        ) : (
          ""
          )}
          </div>
          <div>

        {deldata ? (
          <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{deldata.name}</strong> deleted succesfully.
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
        ) : (
          ""
          )}
          </div>
      </div>

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <Link to="/register">
              <button
                style={{ background: "black", color: "wheat" }}
                className="btn btn"
              >
                <span style={{ fontSize: "24px", marginRight: "10px" }}>+</span>{" "}
                Add Data
              </button>
            </Link>
          </div>
          <table className="table mt-4">
            <thead>
              <tr style={{ fontWeight: "600" }} className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((item, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.work}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <Link to={`view/${item._id}`}>
                          <button className="btn btn-info">
                            <RemoveRedEyeIcon />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`edit/${item._id}`}>
                          <button className="btn btn-primary">
                            <ModeEditIcon />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteuser(item._id)}
                          className="btn btn-danger"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
