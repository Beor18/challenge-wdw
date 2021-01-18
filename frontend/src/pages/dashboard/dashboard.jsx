import React, { useState, useEffect } from "react";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthDispatch, logout } from "../../context";
import { getApiEndpoint } from "../../config/app-config";
import useFetch from "../../hooks/useFetch";

import Paper from "@material-ui/core/Paper";
import NavBar from "../../components/navbar/navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px"
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 10,
      padding: "10px",
      width: theme.spacing(50),
      height: theme.spacing(16),
    },
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const [item, setItem] = useState([]);
  const handleLogout = () => {
    logout(dispatch);
    props.history.push("/login");
  };

  const endpoint = getApiEndpoint();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  const { data } = useFetch(`${endpoint}/api/domain`, requestOptions);
  const user = useFetch(`${endpoint}/api/profile`, requestOptions);
  const newData = get(data, "result", []);

  useEffect(() => {
    setTimeout(() => {
      const result = newData;
      setItem(result);
    }, 1000);
  }, [newData]);

  return (
    <div>
      <div className={classes.root}>
        <NavBar name={user.data.name} onClick={(e) => {
          e.preventDefault()
          handleLogout()
        }} />
      </div>
      <div className={classes.paper}>
      {item.map((items) => {
        return (
          <Paper elevation={3} key={"id-" + items._id}>
            {items.name} - {items.link} - {items.seen}
          </Paper>
        );
      })}
      </div>
    </div>
  );
};

export default Dashboard;
