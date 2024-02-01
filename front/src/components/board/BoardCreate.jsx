import React, {useState} from 'react';
import { useLocation } from 'react-router-dom'; 
import BoardFormItem from './BoardFormItem';


const BoardCreate = () => {
    const location = useLocation();

    const [categoryId, setCategoryId] = useState(
        location.state?.categoryId
    )

    return (
        <>
        <div className="post-title">글쓰기</div>
        <div className="post-btn">
            등록하기
        </div>
        <div>
            <BoardFormItem type={"create"} categoryId={categoryId}/>
        </div>
        </>
    );
};

export default BoardCreate;