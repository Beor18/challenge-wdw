import React, { useState, useEffect } from "react";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthDispatch, logout } from "../../context";
import { getApiEndpoint } from "../../config/app-config";
import useFetch from "../../hooks/useFetch";

import Paper from "@material-ui/core/Paper";
import NavBar from "../../components/navbar/navbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: 10,
      padding: "10px",
      width: theme.spacing(50),
      height: theme.spacing(16),
    },
  },
  title: {
    fontSize: "24px",
    padding: 5,
  },
  url: {
    fontSize: "20px",
    padding: 5,
  },
  seen: {
    padding: 5,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  //const [item, setItem] = useState([]);
  const handleLogout = () => {
    logout(dispatch);
    props.history.push("/login");
  };

  const endpoint = getApiEndpoint();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: 'same-origin'
  };

  const user = useFetch(`${endpoint}/api/profile`, requestOptions);
  const mercadopago = get(user, "data.mercadopago[0]", []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const result = newData;
  //     setItem(result);
  //   }, 1000);
  // }, [newData]);

  return (
    <div>
      <div className={classes.root}>
        <NavBar
          name={user.data.name}
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        />
      </div>
      <div className={classes.paper}>
        <Paper elevation={3}>
          <Typography className={classes.title} variant="h4" noWrap>
            Status: {mercadopago.status ? "ACTIVO" : "DESACTIVADO"}
          </Typography>
        </Paper>

        <a
          href={`https://auth.mercadopago.com.ar/authorization?client_id=2126285233834033&response_type=code&platform_id=mp&redirect_uri=http://localhost:4000/api/callback`}
        >
          {mercadopago.status
            ? "Desenlazar cuenta mercadopago"
            : "Enlazar cuenta mercadopago"}
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
