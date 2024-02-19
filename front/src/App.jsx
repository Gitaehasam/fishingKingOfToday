import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "@components/Navbar.jsx";
const HomePage = lazy(() => import("@pages/HomePage.jsx"));
const ImageResultPage = lazy(() => import("@pages/ImageResultPage.jsx"));
const FishMapPage = lazy(() => import("@pages/FishMapPage.jsx"));
const FishMapDetailPage = lazy(() => import("@pages/FishMapDetailPage.jsx"));
const ImageEditPage = lazy(() => import("@pages/ImageEditPage.jsx"));
const FishBookPage = lazy(() =>
  import("@components/fishbook/FishBookPage.jsx")
);
const FishBookDetailPage = lazy(() =>
  import("@components/fishbook/FishBookDetailPage.jsx")
);
const LoginPage = lazy(() => import("@pages/LoginPage.jsx"));
const RoomList = lazy(() => import("@pages/room/RoomList.jsx"));
const CreateRoom = lazy(() => import("@pages/room/CreateRoom.jsx"));
const VideoRoomComponent = lazy(() =>
  import("@pages/room/openVidu/VideoRoomComponent copy.jsx")
);
const MediaPage = lazy(() => import("@pages/MediaPage.jsx"));
const BoardPage = lazy(() => import("@pages/BoardPage.jsx"));
const BoardDetail = lazy(() => import("@components/board/BoardDetail.jsx"));
const BoardCreate = lazy(() => import("@components/board/BoardCreate.jsx"));
const BoardModify = lazy(() => import("@components/board/BoardModify.jsx"));
const AuthPage = lazy(() => import("@pages/AuthPage.jsx"));
const MyPage = lazy(() => import("@pages/MyPage.jsx"));
const TutorialPage = lazy(() => import("@pages/TutorialPage.jsx"));
const ChatBot = lazy(() => import("@pages/ChatBot.jsx"));
const MyPageEdit = lazy(() => import("@pages/MyPageEdit.jsx"));
const TutorialDeatilPage = lazy(() =>
  import("@components/tutorial/TutorialDetailPage.jsx")
);
const MyFishPage = lazy(() => import("@pages/MyFishPage.jsx"));
const MyLocationPage = lazy(() => import("@pages/MyLocationPage.jsx"));
const Aquarium = lazy(() => import("@pages/Aquarium.jsx"));

// import preloadedImageSrc1 from "./assets/images/main/aquarium.webp";
import preloadedImageSrc2 from "./assets/images/main/fishbook.webp";
import preloadedImageSrc3 from "./assets/images/main/tutorial.webp";

function App() {
  useEffect(() => {
    // const link1 = document.createElement("link");
    const link2 = document.createElement("link");
    const link3 = document.createElement("link");
    // link1.rel = "preload";
    // link1.as = "image";
    // link1.href = preloadedImageSrc1;
    link2.rel = "preload";
    link2.as = "image";
    link2.href = preloadedImageSrc2;
    link3.rel = "preload";
    link3.as = "image";
    link3.href = preloadedImageSrc3;
    // document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);

    return () => {
      // 컴포넌트가 언마운트될 때 preload 링크를 제거
      // document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return (
    <Suspense fallback={<div />}>
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
