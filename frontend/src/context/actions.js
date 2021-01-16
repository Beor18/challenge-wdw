const ROOT_URL = "http://localhost:4000";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/api/users/login`, requestOptions);
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

export async function getDomain(dispatch, getDomainPayload) {
  const requestOptions = {
    method: "GET",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getDomainPayload),
  };

  try {
    dispatch({ type: "REQUEST_DOMAIN" });
    let response = await fetch(`${ROOT_URL}/api/domain`, requestOptions);
    let data = await response.json();
    console.log('FERNANDO GET DOMAIN >>>> ', data)

  } catch (error) {
    dispatch({ type: "DOMAIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("jwt");
  //localStorage.removeItem("token");
}
