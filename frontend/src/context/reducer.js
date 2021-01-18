import React, { useState, useReducer } from "react";

let token = localStorage.getItem("jwt");

export const initialState = {
  token: "" || token,
  loading: false,
  errorEmail: null,
  errorPassword: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        token: action.payload.jwt,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorEmail: action.email,
        errorPassword: action.password
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
