import React, {useEffect, useRef, useState} from "react";

function SwitchCameraModal ({state, onDevice}) {
  const switchCameraModal = useRef()
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [device, setDevice] = useState(null)

  useEffect(async () => {
    let devices = await OV.getDevices();
    let videoDevices = devices.filter(device => device.kind === 'videoinput');
    setVideoDevices(videoDevices);
    setSelectedCamera(videoDevices[0]?.deviceId);
    switchCameraModal.current.showModal()
  }, [])

  const closeSwitchCameraModal = (e) => {
    const target = e.target
    const rect = target.getBoundingClientRect()
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      switchCameraModal.current.close()
      state(!state)
    }
  }

  const handleChangeCamera = (e) => {
    const newDevice = e.target.value;
    setDevice(newDevice);
    onDevice(newDevice);
  }
  

  return (
    <>
      <dialog ref={switchCameraModal} onClick={closeSwitchCameraModal}>
        <header>
          <h3>전환 할 카메라를 선택해주세요</h3>
        </header>

        <div>
          {videoDevices.map(device =>
            <div key={device.deviceId}>
              <input type="radio" id={device.deviceId} name="camera" value={device.deviceId}
                checked={selectedCamera === device.deviceId}
                onChange={handleChangeCamera} />
              <label htmlFor={device.deviceId}>{device.label}</label>
            </div>
            )}
          </div>
      </dialog>
    </>
  )
}

export default SwitchCameraModal