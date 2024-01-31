import React from 'react';
import back from "../assets/images/backSymbol.svg"

const BoardPage = () => {
    return (
        <>
        <img className="backfish" src={back} alt="" onClick={()=>history.back()}/>
        </>
    );
};

export default BoardPage;