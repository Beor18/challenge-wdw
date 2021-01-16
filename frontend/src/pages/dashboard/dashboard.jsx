import React from "react";
import { useAuthDispatch, logout, getDomain, useAuthState } from "../../context";

const Dashboard = (props) => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    props.history.push("/login");
  };
  
  return (
    <div style={{ padding: 10 }}>
      <div className={""}>
        <h1>Dashboard</h1>
        <button className={""} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {'PEPE'}</p>
    </div>
  );
}

export default Dashboard;
