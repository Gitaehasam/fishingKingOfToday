import React from 'react';

function LiveEndModal ({ open, close }) {

  return (
    <dialog open={open}>
      <div>라이브가 종료되었습니다.</div>
      <div onClick={close}>확인</div>
    </dialog>
  )

}

export default LiveEndModal;