import React, { Component } from 'react'

export class Newsitem extends Component {
   

     



    render() {
        let {title,description,imageUrl,url,author,publishedAt,name}=this.props;
     
        return (
            <div>
                <div className="card my-3 " style={{width:"23rem"}} >
                    <img  style={{height:"255px", width:"367px"}} src={imageUrl==null?"https://www.reuters.com/resizer/PmgRGckdnOpDnrayGR7jDLq7ytk=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/PJ4L3BJIBFOUDCYGV4IERFLHYU.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title==null?"INTRESTING NEWS AWITS YOU":title+"..."}</h5>
                        <p className="card-text">{description==null?"INTRESTING NEWS AWITS YOU":description+"..."}</p>
                        <p className="card-text"><small className="text-muted">By {author==null ?"Unkown":author} </small></p>
                        <p className="card-text mt-2"><small className="text-muted ">at { new Date(publishedAt).toGMTString()} </small></p>
                        <a href={url} target="_blank" className="btn btn-sm btn-danger">Read Full News &raquo;</a>
                        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"91% "}}>
  {name==null?"new.com":name}
    <span className="visually-hidden">unread messages</span>
  </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
