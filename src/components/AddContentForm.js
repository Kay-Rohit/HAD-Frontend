import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { addArticle, updateArticleState } from '../reducers/articleReducer';

function AddContentForm({doctorId}) {
    const userId = useParams();
    const dispatch = useDispatch();

    //form data
    const [articleType, setArticleType] = useState('you tube');
    const [articleAuthor, setArticleAuthor] = useState('');
    const [articleThumbnail, setarticleThumbnail] = useState('');
    const [articleTitle, setarticleTitle] = useState('');
    const [articleUrl, setArticleUrl] = useState('');

    //enabe or disable button

    const addToList = () => {
        if(articleType === 'you tube' || articleType === 'video'){
            setarticleThumbnail("https://img.freepik.com/free-vector/video-media-player-interface-mockup-template_1017-23408.jpg")
        }
        else if(articleType === 'reading'){
            setarticleThumbnail("https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVhZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80")
        }
        else{
            setarticleThumbnail('https://media.istockphoto.com/id/1282891289/vector/music-cloud-concept-cloud-shape-sound-waves-and-headphones-online-music-streaming-service.jpg?s=612x612&w=0&k=20&c=9_9C1ItPqgljbBoy10Zv2bLNBgNNdM-WbzVkGyvtyF4=')
        }
        const data = {
            articleType: articleType,
            articleAuthor: articleAuthor,
            articleThumbnail: articleThumbnail,
            articleUrl: articleUrl,
            articleTitle: articleTitle,
            doctorId: doctorId,
            userId: userId.patientId
        }
        dispatch(
            addArticle(data)
        );
    };

  return (
    <>
            <div className='row mt-5'>
                <div className="col-12 col-md mb-4">
                    <select className="form-select" aria-label="select aritcle type"
                        onChange={(e) => {setArticleType(e.target.value)}}
                    >
                        <option defaultValue={articleType}>Youtube Video</option>
                        {/* <option value="you tube">Youtube Video</option> */}
                        <option value="reading">Article</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                </div>
                <div className="col-12 col-md mb-4">
                    <input type="text" id="author" className="form-control"
                    placeholder="Article Author" 
                    value={articleAuthor}
                    onChange={event => setArticleAuthor(event.target.value)}
                    required
                    />
                </div>
                <div className="col-12 col-md mb-4">
                    <input type="text" id="articletitle" className="form-control"
                    placeholder="Enter Title" 
                    value={articleTitle}
                    onChange={event => setarticleTitle(event.target.value)}
                    required
                    />
                </div>
            </div>
            <div className='row'>
                <div className="col-12 col-md-4 mb-4">
                    <input type="text" id="articleUrl" className="form-control"
                    placeholder="Enter URL" 
                    value={articleUrl}
                    onChange={event => setArticleUrl(event.target.value)}
                    required
                    />
                </div>
            </div>
            <div className="text-end pt-1">
                <button 
                    className="btn btn-sm btn-secondary" type="button"
                    onClick={() => {
                        addToList();
                        setArticleAuthor('');
                        setArticleUrl('');
                        setarticleTitle('');
                    }}
                    >
                    ADD
                </button>
            </div>
        </>
  )
}

export default AddContentForm;