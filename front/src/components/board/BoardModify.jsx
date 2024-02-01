import React from 'react';
import BoardFormItem from './BoardFormItem';

const BoardModify = () => {
    return (
        <>
        <div className="post-title">글쓰기</div>
        <div className="post-btn">
            수정하기
        </div>
        <div>
            <BoardFormItem type={"modify"}/>
        </div>        
        </>
    );
};

export default BoardModify;