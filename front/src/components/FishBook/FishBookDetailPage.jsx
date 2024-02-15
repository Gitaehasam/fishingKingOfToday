import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FishBookDetail from "./FishBookDetail";
import { getFishDetail } from "../../api/fish";

const FishBookDetailPage = () => {
  const { id } = useParams();
  const [fishdetail, setFishDetail] = useState([]);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    await getFishDetail(id).then((res) => setFishDetail(res));
    console.log(fishdetail);
  };

  return <FishBookDetail fish={fishdetail} />;
};

export default FishBookDetailPage;
