import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FishBookDetail from "./FishBookDetail";
import fishImg from "../../assets/images/감성돔.jpg";

const FishBookDetailPage = () => {
  const { id } = useParams();
  const [fishData, setFishData] = useState({
    id: 1,
    name: "감성돔",
    scientificName: "Acantopagrus\nscblegeli",
    fishType: "SEA",
    size: "30~50cm이상",
    habitat: "모래질이나 암초로 된 수심 50m 이내의 연안",
    bait: "참갯지렁이\n크릴\n쏙\n조개류\n갯지렁이",
    interview: {
      FirstQuestion: "이름이 무슨뜻인가요?",
      FirstAnswer: "검은 돔에서 변화한 것입니다.\n감상어, 먹도미, 감성도미, 감셍이,\n구릿, 맹이, 남정바리 등으로\n불리기도 합니다.",
      SecondQuestion: "외모자랑 한번 해주세요",
      SecondAnswer:
        "몸은 타원형이며\n등쪽이 약간 높습니다.\n빗모양의 비늘로 덮여 있으며,\n등쪽은 금속 광택을 띤 회흑색입니다. 배쪽 부분은 연하고,\n옆구리에는 세로로 그어진\n가늘고 불분명한 선이 있습니다.",
      thirdQuestion: "특별한 능력이 있다구요?",
      thirdAnswer: "성전환이 가능합니다.\n1년생동안은 대부분 수컷이지만,\n이후 암수한몸이었다가\n4~5년부터는 암수로 완전히 분리되요.\n대부분이 암컷으로 성전환합니다.",
    },
    imageUrl: fishImg,
    detailImageUrl: "",
  });

  return <FishBookDetail fish={fishData} />;
};

export default FishBookDetailPage;
