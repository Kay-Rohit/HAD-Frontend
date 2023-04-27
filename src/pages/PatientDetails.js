import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import avatar from "../assets/avatar.png"
import Sidebar from '../components/Sidebar';
import axios from 'axios';

// import {assignedArticles} from '../fakeData'
import {useNavigate} from 'react-router-dom'


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext, useEffect, useState } from 'react';
// import AddPersonalizedContentForm from '../components/AlreadyAddedPersonalisedContentForm';
import AlreadyAddedPersonalizedContentForm from '../components/AlreadyAddedPersonalisedContentForm';
import AddContentForm from '../components/AddContentForm';
import { addPersonalisedContentURL, deleteAssignedArticleURL, fetchAlreadyAddedArticlesURl } from '../assets/URLs';
import { updateArticleState } from '../reducers/articleReducer';
import { LoggedInUserContext } from '../context/LoggedInUserContext';

const PatientDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
    const patients = useSelector((state)=>state.users.value);
    const articles = useSelector((state)=>state.articles.value);
    // const token = localStorage.getItem('jwt-token');
    // const user = JSON.parse(localStorage.getItem('user'));

    const token = loggedinUser.token;
    const user = loggedinUser.user;

    const [assignedArticles, setAssignedArticle] = useState([]);

    let {patientId} = useParams();
    let doctorId = user?.id;
    //constant for rendering no. of forms on add button
    // const [noOfForms, setNoOfForms] = useState(1);

    //for modal ============================
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ======================================

    // console.log(patientId);
    const doctor_name = `${user?.firstName} ${user?.middleName} ${user?.lastName}`;

    const addPersonalisedContent = async() => {
        console.log("Articles to be sent to patient",articles);
            const request = new Request(`${addPersonalisedContentURL}`, {
                method: 'POST',
                body: JSON.stringify(articles),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':token,
                  'ngrok-skip-browser-warning':'69420'
                }
              });
              const response = await fetch(request);
              console.log(response);


              handleClose();
              dispatch(
                updateArticleState([])
              );


    }

    const fetchAssignedContent = async() => {
        // fetch(`${fetchAlreadyAddedArticlesURl}${patientId}`, {
        //     method: "get",
        //     headers: new Headers({
        //         'Authorization': token,
        //       'ngrok-skip-browser-warning': "69420",
        //       'Accept':'Content-Type/json'
        //     }),
        //   })
        //     .then((res) => {
        //         console.log(res.body.getReader());
        //     })
        //     .catch((err) => console.log(err));
        let config = {
            headers:{
                Authorization:token,
                "ngrok-skip-browser-warning":"69420"
            }
        }

        await axios.get(`${fetchAlreadyAddedArticlesURl}${patientId}`, config)
        .then((res) => {
            console.log("Assigned Content", res.data);
            setAssignedArticle(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchAssignedContent();
    },[]);


    const deleteAssignedContent = async(articleId) => {
        console.log("articleId", articleId);
        const request = new Request(`${deleteAssignedArticleURL}${articleId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':token,
              'ngrok-skip-browser-warning':'69420'
            }
          });
          const response = await fetch(request);
          console.log(response);
    }
        
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
            <Modal.Title>Add Personalised Content for your Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className=''>
                    {/* Rendering prepopulated Data */}
                {
                    articles?.map((article, index) => {
                        return(
                            <div key={index} className='border-bottom p-2 mb-2'>
                                <AlreadyAddedPersonalizedContentForm article={article} doctorId={doctorId} />
                            </div>
                        )
                    })
                }
                    <AddContentForm doctorId={doctorId}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={addPersonalisedContent}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        <Sidebar name={doctor_name}>
            <div className='container-fluid'>
                {/* This is patient details page */}
                <div className='row mt-2' style={{height:"90vh"}}>
                    <div className='col-md-3 col-12'>
                        {
                            patients.filter(patient => {
                                if (patient.id == patientId) {
                                return patient;
                                }
                            }).map((patient) => {
                                return(
                                    <Card border="light" className="my-2 text-center" key={patient.id}>
                                            <Card.Header>
                                                <div className='avatar rounded-circle'>
                                                    <img alt="image" src={avatar} style={{objectFit:"contain", width:"25%"}}/>
                                                </div>
                                                <div className=''>
                                                    <Card.Title>{patient?.firstName} {patient?.lastName}</Card.Title>
                                                    <Card.Text>Patient ID: {patient?.id}</Card.Text>
                                                    <button className='btn btn-secondary'
                                                        onClick={()=>{navigate("/chats  ")}}
                                                    >Message Patient</button>
                                                </div>
                                                </Card.Header>
                                                <div className='my-2'>
                                                <div style={{backgroundColor:"#d8d8d9"}} className="p-2 text-center">
                                                <i>Patient Details</i>
                                                <Card.Text>
                                                    mail: {patient?.email} <br/>
                                                    gender: {patient?.gender} <br/>
                                                    address: {patient?.address} <br/>
                                                    contact: {patient?.contact} <br/>
                                                    DOB: {patient?.dob.month} {patient?.dob.year}
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    <div className='progress-details col-md-9 col-12'>
                        <div className='row h-50 border-light p-2 rounded' style={{backgroundColor:"#f7f7f7"}}>
                            <i style={{fontSize:'large', fontWeight:'bold'}}> Progress</i>
                        </div>
                        <div className='row border-light p-2 rounded overflow-auto' style={{backgroundColor:"#f7f7f7"}}>
                            <div className='d-flex justify-content-between'>
                                <i style={{fontSize:'large', fontWeight:'bold'}}>Assigned Personalised Articles</i>
                                <button
                                className='btn btn-sm btn-secondary'
                                onClick={handleShow}
                                >Add content</button>
                            </div>
                            {/* <div className='container-fluid'> */}
                            {
                                assignedArticles?.map((article, index) => {
                                    return(
                                        <div key={index} className='row my-2'>
                                            <div className='col-3' style={{backgroundColor:"#bfbebe"}}>
                                                {article?.articleType}
                                            </div>
                                            <div className='col-3' style={{backgroundColor:"#bfbebe"}}>
                                                {article?.articleTitle}
                                            </div>
                                            <div className='col-5' style={{backgroundColor:"#bfbebe"}}>
                                                {article?.articleUrl}
                                            </div>
                                            <button className='btn btn-sm btn-danger col-auto'
                                                onClick={() => {
                                                    deleteAssignedContent(article.id)
                                                }}
                                            >Delete</button>
                                        </div>
                                    )
                                })
                            }
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
        </>
    );
}
 
export default PatientDetails;