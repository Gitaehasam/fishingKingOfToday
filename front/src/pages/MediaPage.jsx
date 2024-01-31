import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/board/choose.scss";
import back from "../assets/images/backSymbol.svg"

const MediaPage = () => {
    return (
        <>
        <img className="backfish" src={back} alt="" onClick={()=>history.back()}/>
        <div className='choose-list'>
        <Link to={"/media/roomlist"}>
            <div className='choose-item shadow'>
                <div className='bg-blue liveroom shadow'>Live</div>
            </div>
        </Link>
        <Link to={"/media/board"}>
            <div className='choose-item s'>
                <div className='bg-blue card photo'>Photo</div>
            </div>
        </Link>
        </div>        
        </>
      
    );
}

export default MediaPage;