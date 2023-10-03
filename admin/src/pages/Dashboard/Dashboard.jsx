import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../Action/UserAction";
import Sidebar from "../Sidebar/Sidebar";
const Dashboard = () => {
  const { users } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUsersAction());
  }, [dispatch]);
  console.log("users" );
  return (
    <Fragment>
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummaryBox2">
          <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users?.user?.length}</p>
              </Link>
          </div>
        </div>
      </div>
  </Fragment>
  );
};

export default Dashboard