import React, { useState, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { baseURL, loginURL, loginURL_v2 } from "../assets/URLs";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import loginImage from "../assets/loginpage.png";
import { Modal, Button } from "react-bootstrap";

function LoginComponent() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);

  var enabled = username.length > 0 && pwd.length > 0;

  //for modal ============================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ======================================

  const sendPasswordResetMail = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    };
    await axios
      .get(`${baseURL}/forgot-password/${email}`, config)
      .then((res) => {
        console.log(res);
        setEmail("");
        alert("Check your email!");
        handleClose();
      })
      .catch((err) => console.log(err));

    await fetch(`${baseURL}/forgot-password/${email}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  //code to skip ngrok browser error part

  const handleLogin = async (event) => {
    event.preventDefault();
    enabled = !enabled;
    try {
      const response1 = await axios.post(
        loginURL,
        {
          username: username,
          password: pwd,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const token = response1.headers["authorization"];
      // console.log(token);

      //authority role check
      var decoded = jwt_decode(token.substring(7));
      const roleDoctor = decoded.authorities[3].authority;
      const roleAdmin = decoded.authorities[7].authority;

      // console.log("decoded", decoded);

      //ONLY DOCTORS are allowed to LOGIN
      if (roleDoctor === "ROLE_DOCTOR" || roleAdmin === "ROLE_DOCTOR") {
        // localStorage.setItem('jwt-token', token);
        let config = {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        };

        const response2 = await axios.post(
          loginURL_v2,
          {
            username: username,
            password: pwd,
          },
          config
        );

        // console.log("logged in user data :", response2.data);
        // localStorage.setItem('jwt-token', token);
        // localStorage.setItem('user', JSON.stringify(response2.data));
        // localStorage.setItem('role', role);
        setLoggedinUser({
          ...loggedinUser,
          token: token,
          user: response2.data,
          role: roleDoctor,
        });
        console.log("Logged in user details from context api", loggedinUser);
        navigate("/");
      } else if (roleAdmin === "ROLE_ADMIN" || roleDoctor === "ROLE_ADMIN") {
        //ONLY ADMINS
        // localStorage.setItem('jwt-token', token);
        // localStorage.setItem('role', role)

        //not setting admin user-details on admin login
        setLoggedinUser({ ...loggedinUser, token: token, role: roleAdmin });
        console.log("Logged in user details from context api", loggedinUser);
        navigate("/admin");
      } else {
        swal("This is doctor portal", "use the app instead", "error");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      swal(
        "invalid Credentials",
        "please check your login id or password",
        "error"
      );
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Forget Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={sendPasswordResetMail}>
            <label className="form-label mb-3" htmlFor="email">
              Enter your registered email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button className="btn btn-primary mt-3" type="submit">
              Send Mail
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <section
        className="vh-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div
                className="card rounded-3 text-black"
                // style={{
                //     backgroundImage:`url("https://img.freepik.com/premium-vector/mental-health-care-concept-with-doctors-give-treatment-patient-symbol-illustration_185038-481.jpg?w=1380")`,
                //     maxHeight:"100%",
                //     maxWidth:"100%"
                // }}
              >
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <form className="mt-3 py-3">
                          <p>Please login to your account</p>

                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="username"
                              className="form-control"
                              placeholder="UserName"
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                              required
                            />
                            <label className="form-label" htmlFor="email">
                              Username
                            </label>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Your Password"
                              value={pwd}
                              onChange={(event) => setPwd(event.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <div>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-secondary text-sm"
                                onClick={handleShow}
                              >
                                Forget Password?
                              </button>
                            </div>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3"
                              type="button"
                              onClick={handleLogin}
                              disabled={!enabled}
                            >
                              Login
                            </button>
                          </div>
                        </form>
                        <br />
                        <span className="text-muted">
                          Don't have an account?{" "}
                          <button
                            className="btn btn-sm btn-light"
                            type="button"
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Register
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 d-flex align-items-center">
                    <img
                      className="px-2"
                      src={loginImage}
                      alt="some image of mental health"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginComponent;
