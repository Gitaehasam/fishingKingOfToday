import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ImageResultPage from "./pages/ImageResultPage";
import FishMapPage from "./pages/FishMapPage";
import FishMapDetailPage from "./pages/FishMapDetailPage";
import ImageEditPage from "./pages/ImageEditPage";
import FishBookPage from "./components/fishbook/FishBookPage";
import FishBookDetailPage from "./components/fishbook/FishBookDetailPage";
import LoginPage from "./pages/LoginPage";
import RoomList from "./pages/room/RoomList";
import CreateRoom from "./pages/room/CreateRoom";
import VideoRoomComponent from "./pages/room/openVidu/VideoRoomComponent";
import LiveStream from "./pages/room/LiveStream";
import MediaPage from "./pages/MediaPage";
import BoardPage from "./pages/BoardPage";
import BoardDetail from "./components/board/BoardDetail";
import BoardCreate from "./components/board/BoardCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="fish/image/result" element={<ImageResultPage />} />
        <Route path="media">
          <Route index element={<MediaPage />} />
          <Route path="roomList">
            <Route index element={<RoomList />} />
            <Route path="create">
              <Route index element={<CreateRoom />} />
            </Route>
          </Route>
          <Route path="board">
            <Route index element={<BoardPage />} />
            {/* <Route path="create">
              <Route index element={<CreateRoom />}/>
            </Route> */}
            <Route path=":id" element={<BoardDetail />} />
          </Route>
        </Route>
      </Route>

      <Route path="media">
          <Route index element={<MediaPage />} />
          <Route path="board">
            <Route index element={<BoardPage />} />
            <Route path="create" element={<BoardCreate />} />
          </Route>
        </Route>


      <Route path="/fish">
        <Route path="map">
          <Route index element={<FishMapPage />} />
          <Route path=":idx" element={<FishMapDetailPage />} />
        </Route>
        <Route path="image/edit" element={<ImageEditPage />} />
      </Route>
      <Route path="/fishbook">
        <Route index element={<FishBookPage />} />
        <Route path=":id" element={<FishBookDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />

      // 여기 부분이 계속 충돌나서 아예 최신버전으로 바꿔놨습니다.
      <Route path="/live/:sessionId" element={<VideoRoomComponent />}/>
    </Routes>
  );
}

export default App;
