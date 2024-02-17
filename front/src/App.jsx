import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
const HomePage = lazy(() => import("@pages/HomePage"));
const ImageResultPage = lazy(() => import("@pages/ImageResultPage"));
const FishMapPage = lazy(() => import("@pages/FishMapPage"));
const FishMapDetailPage = lazy(() => import("@pages/FishMapDetailPage"));
const ImageEditPage = lazy(() => import("@pages/ImageEditPage"));
const FishBookPage = lazy(() => import("@components/fishbook/FishBookPage"));
const FishBookDetailPage = lazy(() =>
  import("@components/fishbook/FishBookDetailPage")
);
const LoginPage = lazy(() => import("@pages/LoginPage"));
const RoomList = lazy(() => import("@pages/room/RoomList"));
const CreateRoom = lazy(() => import("@pages/room/CreateRoom"));
const VideoRoomComponent = lazy(() =>
  import("@pages/room/openVidu/VideoRoomComponent copy")
);
const MediaPage = lazy(() => import("@pages/MediaPage"));
const BoardPage = lazy(() => import("@pages/BoardPage"));
const BoardDetail = lazy(() => import("@components/board/BoardDetail"));
const BoardCreate = lazy(() => import("@components/board/BoardCreate"));
const BoardModify = lazy(() => import("@components/board/BoardModify"));
const AuthPage = lazy(() => import("@pages/AuthPage"));
const MyPage = lazy(() => import("@pages/MyPage"));
const TutorialPage = lazy(() => import("@pages/TutorialPage"));
const ChatBot = lazy(() => import("@pages/ChatBot"));
const MyPageEdit = lazy(() => import("@pages/MyPageEdit"));
const TutorialDeatilPage = lazy(() =>
  import("@components/tutorial/TutorialDetailPage")
);
const MyFishPage = lazy(() => import("@pages/MyFishPage"));
const MyLocationPage = lazy(() => import("@pages/MyLocationPage"));
const Aquarium = lazy(() => import("@pages/Aquarium"));

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="fish">
            <Route path="image/result" element={<ImageResultPage />} />
            <Route path="map" element={<FishMapPage />} />
          </Route>
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
            </Route>
          </Route>

          <Route path="user/mypage">
            <Route index element={<MyPage />} />
            <Route path="edit" element={<MyPageEdit />} />
            <Route path="fish" element={<MyFishPage />} />
            <Route path="location" element={<MyLocationPage />} />
          </Route>
        </Route>

        <Route path="media">
          <Route index element={<MediaPage />} />
          <Route path="board">
            <Route index element={<BoardPage />} />
            <Route path="create" element={<BoardCreate />} />
            <Route path="modify/:id" element={<BoardModify />} />
            <Route path=":id" element={<BoardDetail />} />
          </Route>
        </Route>

        <Route path="/tutorial">
          <Route index element={<TutorialPage />} />
          <Route path=":id" element={<TutorialDeatilPage />} />
        </Route>

        <Route path="/fish">
          <Route path="map">
            <Route path=":idx" element={<FishMapDetailPage />} />
          </Route>
          <Route path="image/edit" element={<ImageEditPage />} />
        </Route>
        <Route path="/fishbook">
          <Route index element={<FishBookPage />} />
          <Route path=":id" element={<FishBookDetailPage />} />
        </Route>

        <Route path="/login">
          <Route index element={<LoginPage />} />
          <Route path=":social" element={<AuthPage />} />
        </Route>

        <Route path="/live/:id" element={<VideoRoomComponent />}></Route>

        <Route path="/chatBot">
          <Route index element={<ChatBot />} />
        </Route>

        <Route path="/aquarium">
          <Route index element={<Aquarium />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
