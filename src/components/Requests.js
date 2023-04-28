import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {acceptRequestURL, rejectRequestURL} from "../assets/URLs";
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequests } from '../reducers/requests/requestReducer';

import {getDoc, doc , setDoc} from 'firebase/firestore';
import {db} from '../config/FirebaseConfig';
import { useContext } from 'react';
import { LoggedInUserContext } from '../context/LoggedInUserContext';

const Requests = ({token, id}) => {

    const dispatch = useDispatch();
    const requests = useSelector((state)=>state.requests.value);
    console.log(requests);

    // console.log(requests)
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)

    let config = {
        headers: {
            Authorization: `${token}`,
            'ngrok-skip-browser-warning':'true'
        }
    }

    async function acceptResponse({firstname, lastname, patientId, patientEmail}){
        // console.log("patient in accept response", patientEmail)

        // api call to accept patient
        await axios.get(`${acceptRequestURL}${id}/${patientId}`,config)
            .then((response) => {
                let res = response.data;
                console.log(res);
                dispatch(
                    deleteRequests({id: patientId})
                )
                swal("Success!", `${res}`, "success");
            })
            .catch((error) => {
                console.log(error);
            })

        //check if patient is already registered with a doctor in firebase
        const res = await getDoc(doc(db, `doc-${id}`, `${patientId}`));
        if(!res.exists()){

            //register patient to doctor on firebase
            let data = {
                uid: patientId,
                name: `${firstname} ${lastname}`,
                email: patientEmail
            }

            //adding a collection starting with doc-<doctor id> then add a document with id as patient id and this stores patient data
            await setDoc(doc(db, `doc-${id}`, `${patientId}`), data);

            //creating user chats to get track of the last set messages in userChats collection
            // await setDoc(doc(db, "userChats", `${id}`), {});
        }



    }

    async function rejectResponse(patientid){
        await axios.get(`${rejectRequestURL}${id}/${patientid}`,config)
            .then((response) => {
                let res = response.data;
                console.log(res);
                dispatch(
                    deleteRequests({id: patientid})
                )
                // swal("Success!", `${res}`, "success");

            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            {

                (requests?.length !== 0) ? (
                    requests.map((request) => (
                        <div key={request.id} className="col-12 col-md-11 row align-items-center justify-content-between p-2 mt-2" style={{backgroundColor:"#bfbebe", borderRadius:"10px"}}>
                            <div className="col-12 col-md-3" style={{backgroundColor:"#bfbebe"}}>{request.firstName} {request.lastName}</div>
                            <div className="col-12 col-md-7 row justify-content-between" style={{backgroundColor:"#bfbebe"}}>
                                <div className="col-4 col-md-1 offset-md-1">Severity</div>
                                <div className="col-6 col-md-8">
                                    {
                                        <ProgressBar
                                            variant={(request.depressionSeverity < 60) ? (request.depressionSeverity <30 ) ? "success" : "warning" : "danger"} 
                                            now={request.depressionSeverity}
                                        />   
                                    }
                                </div>
                            </div>
                            <div className="col-6 col-md-1" style={{backgroundColor:"#bfbebe"}}><button type="button" className="btn btn-light btn-sm"
                                onClick={()=>{
                                    console.log("my patient id", request.id)
                                    acceptResponse({
                                        firstname: request.firstName,
                                        lastname: request.lastName,
                                        patientId: request.id,
                                        patientEmail: request.email
                                    });
                                }}
                            >Accept</button></div>
                            <div className="col-6 col-md-1" style={{backgroundColor:"#bfbebe"}}><button type="button" className="btn btn-light btn-sm"
                                onClick={()=>{
                                    //remove this dispatch method later, this is just for texting
                                    //usage is in api calls
                                    dispatch(
                                        deleteRequests({id: request.id})
                                    )
                                    rejectResponse(request.id);
                                }}
                            >Reject</button></div>
                        </div>
                    ))
                ) : (
                    <div>No Pending Requests</div>
                )
            }
        </>
    )
}

export default Requests;