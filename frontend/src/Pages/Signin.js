import React, { useContext, useState } from "react";
import "./Signin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import Switch from "@material-ui/core/Switch";

function Signin() {
  const [isStudent, setIsStudent] = useState(true);
  const [admissionId, setAdmissionId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal
  const { dispatch } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(API_URL + "api/auth/signin", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError("Wrong Password Or Username");
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    isStudent
      ? loginCall({ admissionId, password }, dispatch)
      : loginCall({ employeeId, password }, dispatch);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title">Log in</h2>
          <p className="line"></p>
          <div className="persontype-question">
            <p>Are you a Staff member?</p>
            <Switch
              onChange={() => setIsStudent(!isStudent)}
              color="primary"
            />
          </div>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <label htmlFor={isStudent ? "admissionId" : "employeeId"}>
              <b>{isStudent ? "Admission ID" : "Employee ID"}</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder={
                isStudent ? "Enter Admission ID" : "Enter Employee ID"
              }
              name={isStudent ? "admissionId" : "employeeId"}
              required
              onChange={(e) => {
                isStudent
                  ? setAdmissionId(e.target.value)
                  : setEmployeeId(e.target.value);
              }}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="signin-button">Log In</button>
          <a className="forget-pass" href="#home">
            Forgot password?
          </a>
        </form>
        <div className="signup-option">
          <p className="signup-question">
            Don't have an account?{" "}
            <span
              className="contact-librarian"
              onClick={toggleModal}
            >
              Contact Librarian
            </span>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Contact Librarian</h3>
            <p>
              If you don't have an account, please contact the librarian at:
            </p>
            <ul>
              <li>Email: librarian@library.com</li>
              <li>Phone: +123-456-7890</li>
              <li>Visit: Room 101, Main Library</li>
            </ul>
            <button className="modal-close-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
