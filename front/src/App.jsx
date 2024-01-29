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
import FishBookPage from "./components/FishBook/FishBookPage"
import FishBookDetailPage from "./components/FishBook/FishBookDetailPage"
import LoginPage from "./pages/LoginPage";
import RoomList from "./pages/room/RoomList";
import CreateRoom from "./pages/room/CreateRoom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="fish/image/result" element={<ImageResultPage />} />
        <Route path="/roomList" >
          <Route index element={<RoomList />}/>
          <Route path="create">
            <Route index element={<CreateRoom />}/>
          </Route>
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
        <Route index element={<FishBookPage/>}/>
        <Route path=":id" element={<FishBookDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
