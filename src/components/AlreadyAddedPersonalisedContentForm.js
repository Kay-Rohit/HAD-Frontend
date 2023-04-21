import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../reducers/articleReducer';

function AlreadyAddedPersonalizedContentForm({article}) {
    //form data
    const {articleType, articleAuthor, articleThumbnail, articleUrl, articleTitle} = {...article}

    const dispatch = useDispatch();

    const removeFromList = () => {
        const articleToRemove = {
            articleType:articleType,
            articleAuthor:articleAuthor,
            articleThumbnail:articleThumbnail,
            articleUrl:articleUrl
        }
        dispatch(
            deleteArticle(articleToRemove)
        );
    };

  return (
    <>
            <div className='row'>
                <div className="col-12 col-sm-3">
                    <input type="text" id="article-type" className="form-control"
                    placeholder="Article Type" 
                    value={articleType}
                    readOnly
                    disabled
                    />
                    {/* <label className="form-label" htmlFor="firstname">First Name</label> */}
                </div>
                <div className="col-12 col-sm-3">
                    <input type="text" id="author" className="form-control"
                    placeholder="Article Author" 
                    value={articleAuthor}
                    readOnly
                    disabled
                    />
                    {/* <label className="form-label" htmlFor="firstname">First Name</label> */}
                </div>
                <div className="col-12 col-sm-3">
                    <input type="text" id="articleTitle" className="form-control"
                    placeholder="Enter Article Title" 
                    value={articleTitle}
                    readOnly
                    disabled
                    />
                    {/* <label className="form-label" htmlFor="firstname">First Name</label> */}
                </div>
                <div className='col-12 col-sm-auto'>
                    <button 
                        className="btn btn-sm btn-danger" type="button"
                        onClick={removeFromList}
                        >
                        Remove
                    </button>
                </div>
            </div>
            <div className='row mt-2'>
                <div className="col-12 col-sm-3">
                    <input type="text" id="articleUrl" className="form-control"
                    placeholder="Enter URL" 
                    value={articleUrl}
                    readOnly
                    disabled
                    />
                </div>
            </div>
        </>
  )
}

export default AlreadyAddedPersonalizedContentForm;