import axios from "axios";
import Select from "react-select";
import { limit } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { registerDoctorURL } from "../assets/URLs";

function Registration() {
  const navigate = useNavigate();

  const [enabled, setEnabled] = useState(true);

  //form data
  const [firstname, setFirstname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [contact, setContact] = useState("");
  const [imageUrl, setImageUrl] = useState("dummy/image/imageurl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regnum, setRegnum] = useState("");
  const [regStamp, setRegStamp] = useState("");
  const [address, setAddress] = useState("");
  const [patientLimit, setPatientLimit] = useState("");
  const patientCount = 0;
  const [exp, setExp] = useState("");
  const [age, setAge] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([{}]);

  //enabe or disable button
  // const enabled = username.length>0 && pwd.length>0;
  const data = {
    firstName: firstname,
    lastName: lastname,
    middleName: middleName,
    gender: gender,
    age: age,
    degree: degree,
    specialisation: specialisation,
    experience: exp,
    address: address,
    contact: contact,
    imageUrl: imageUrl,
    registrationNumber: regnum,
    registrationStamp: regStamp,
    PatientLimit: patientLimit,
    PatientCount: patientCount,
    email: email,
    password: password,
    languages: selectedLanguages,
  };

  let config = {
    header: {
      "ngrok-skip-browser-warning": true,
    },
  };

  const handleRegistration = async () => {
    console.log(data);
    await axios
      .post(`${registerDoctorURL}`, data, config)
      .then((res) => {
        console.log(res.data);
        swal("Registered Successfully", `${res.data}`, "success");
      })
      .catch((err) => {
        console.log(err.response.data);
        swal(`${err.response.data}`, "Something went wrong!", "error");
      });
  };

  const handleSelectChange = (languages) => {
    var arr = [];
    languages.map(({ value }) => {
      arr.push(value);
    });
    console.log(arr);
    setSelectedLanguages(arr);
  };

  const options = [
    { value: "hindi", label: "Hindi" },
    { value: "english", label: "English" },
    { value: "kannada", label: "Kannada" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
  ];

  return (
    <div>
      <section
        className="vh-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card rounded-3 text-black">
              <div className="card-body">
                <div className="text-center">
                  <form className="mt-3 py-3">
                    <h4>Please fill the form to register!</h4>

                    <div className="m-3">Personal Details</div>
                    <div className="row">
                      <div className="col-12 col-md mb-4">
                        <input
                          type="text"
                          id="firstname"
                          className="form-control"
                          placeholder="First Name"
                          value={firstname}
                          onChange={(event) => setFirstname(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="firstname">First Name</label> */}
                      </div>
                      <div className="col-12 col-md mb-4">
                        <input
                          type="text"
                          id="middlename"
                          className="form-control"
                          placeholder="Middle Name"
                          value={middleName}
                          onChange={(event) =>
                            setMiddlename(event.target.value)
                          }
                          required
                        />
                        {/* <label className="form-label" htmlFor="firstname">First Name</label> */}
                      </div>
                      <div className="col-12 col-md mb-4">
                        <input
                          type="text"
                          id="lastname"
                          className="form-control"
                          placeholder="First Name"
                          value={lastname}
                          onChange={(event) => setLastname(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="lastname">Last Name</label> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="gender"
                          className="form-control"
                          placeholder="Gender"
                          value={gender}
                          onChange={(event) => setGender(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="gender">Gender</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="number"
                          id="age"
                          className="form-control"
                          placeholder="Enter age here"
                          value={age}
                          onChange={(event) =>
                            setAge(parseInt(event.target.value))
                          }
                          required
                        />
                        {/* <label className="form-label" htmlFor="age">Age</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={contact}
                          onChange={(event) => setContact(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="phone">Contact</label> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4 mb-4">
                        <label
                          className="form-label text-secondary text-sm"
                          htmlFor="languages"
                        >
                          Languages Spoken
                        </label>
                        <Select
                          //   defaultValue={options[0]}
                          isMulti
                          name="languages"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="Languages Known"
                          onChange={handleSelectChange}
                        />
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <textarea
                          type="text"
                          id="address"
                          className="form-control"
                          placeholder="Clinic Address"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="address">Address</label> */}
                      </div>
                    </div>
                    <div className="m-3">Professional Details</div>
                    <div className="row">
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="degree"
                          className="form-control"
                          placeholder="Enter your degree"
                          value={degree}
                          onChange={(event) => setDegree(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="degree">Degree</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="specialisation"
                          className="form-control"
                          placeholder="Enter specialisation here"
                          value={specialisation}
                          onChange={(event) =>
                            setSpecialisation(event.target.value)
                          }
                          required
                        />
                        {/* <label className="form-label" htmlFor="age">Specialisation</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="exp"
                          className="form-control"
                          placeholder="Experience"
                          value={exp}
                          onChange={(event) =>
                            setExp(parseInt(event.target.value))
                          }
                          required
                        />
                        {/* <label className="form-label" htmlFor="exp">Experience</label> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="regNum"
                          className="form-control"
                          placeholder="Enter your Registration Number"
                          value={regnum}
                          onChange={(event) => setRegnum(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="regNum">Registration Number</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="stamp"
                          className="form-control"
                          placeholder="Enter your Registration Stamp"
                          value={regStamp}
                          onChange={(event) => setRegStamp(event.target.value)}
                          required
                        />
                        {/* <label className="form-label" htmlFor="stamp">Registration Stamp</label> */}
                      </div>
                      <div className="col-12 col-md-4 mb-4">
                        <input
                          type="text"
                          id="limit"
                          className="form-control"
                          placeholder="Set patient limit count"
                          value={patientLimit}
                          onChange={(event) =>
                            setPatientLimit(parseInt(event.target.value))
                          }
                          required
                        />
                        {/* <label className="form-label" htmlFor="limit">Patient limit</label> */}
                      </div>
                    </div>
                    <div className="row border-top pt-5">
                      <div className="mb-4 col-12 col-md-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                      <div className="mb-4 col-12 col-md-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Your Password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                        className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3"
                        type="button"
                        onClick={handleRegistration}
                        disabled={!enabled}
                      >
                        Register
                      </button>
                      <br />
                    </div>
                  </form>
                  <br />
                  <span>
                    Already have an account?
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      SignIn
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
