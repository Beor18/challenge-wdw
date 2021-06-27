import { getApiEndpoint } from "../config/app-config";

export async function loginUser(dispatch, loginPayload) {
  
  const endpoint = getApiEndpoint();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
    credentials: 'same-origin'
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${endpoint}/api/users/login`, requestOptions);
    let data = await response.json();
    
    if (data.jwt) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("jwt", data.jwt);
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", email: data.email, password: data.password });
    console.log(data.email, data.password);
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("jwt");
}
