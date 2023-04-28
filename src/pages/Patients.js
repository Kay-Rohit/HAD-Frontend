// import avatar from "../assets/avatar.png"
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {allPatientsURL} from '../assets/URLs'

import {useDispatch, useSelector} from 'react-redux'
import Sidebar from '../components/Sidebar';
import {updateUserState} from '../reducers/users/userReducer'

import Card from 'react-bootstrap/Card';
import avatar from "../assets/avatar.png"
import {Link} from 'react-router-dom'
import { LoggedInUserContext } from '../context/LoggedInUserContext';

const Patients = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const patients = useSelector((state)=>state.users.value)
    const [query, setQuery] = useState("");
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext);

    useEffect(() => {
        fetchPatients();
    }, []);

    const token = loggedinUser.token;
    const user = loggedinUser.user;

    const doctor_name = `Dr. ${user.firstName} ${user.middleName} ${user.lastName}`;

    let config = {
        headers: {
            Authorization: token,
            'ngrok-skip-browser-warning':'true'
        }
    }

    async function fetchPatients(){
        await axios.get(`${allPatientsURL}${user.id}`,config)
        .then((response) => {
            console.log("My patients",response.data);
            dispatch(
                updateUserState(response.data)
            )
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <Sidebar name={doctor_name}>
        <div className='container-fluid mt-3' style={{overflow:"auto", height:"80%"}}>
            <div className="search__container col-md-3 mx-md-4 col-12">
                <input className="search__input" type="text" placeholder="Search" 
                  onChange={event => setQuery(event.target.value)}
                />
            </div>
            <div className="row m-3 align-items-center">
            {
              patients?.filter(patient => {
                if (query === '') {
                  return patient;
                } else if (patient.firstName.toLowerCase().includes(query.toLowerCase())) {
                  return patient;
                }
                else if (patient.lastName.toLowerCase().includes(query.toLowerCase())) {
                  return patient;
                }
              }).map((patient) => (
                  <Card border="light" className="col-md-3 col-12 col-sm-6 p-3 my-2" key={patient.id}>
                      <Card.Header>
                          <div className='avatar rounded-circle'>
                              <img alt="image" src={avatar} style={{objectFit:"contain", width:"25%"}}/>
                          </div>
                          <div className=''>
                              <Card.Title>{patient.firstName} {patient.lastName}</Card.Title>
                              <Card.Text>Patient ID: {patient.id}</Card.Text>
                          </div>
                      </Card.Header>
                      <div className='my-2'>
                          <div style={{backgroundColor:"#d8d8d9"}} className="p-2">
                              {/*<i>More details here</i>*/}
                              <Card.Text>
                                  mail: {patient.email} <br/>
                                  gender: {patient.gender}
                              </Card.Text>
                              <Link to={`/patients/${patient.id}`}>
                                <button className='btn btn-secondary'>More</button>
                              </Link>
                          </div>
                      </div>
                  </Card>
            ))
            }
          </div>
    </div>
    </Sidebar>
  )
}
 
export default Patients;