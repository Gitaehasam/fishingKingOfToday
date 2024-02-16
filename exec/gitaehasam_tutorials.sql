-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i10c203.p.ssafy.io    Database: gitaehasam
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tutorials`
--

DROP TABLE IF EXISTS `tutorials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorials` (
  `tutorial_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tutorial_info` json DEFAULT NULL,
  PRIMARY KEY (`tutorial_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorials`
--

LOCK TABLES `tutorials` WRITE;
/*!40000 ALTER TABLE `tutorials` DISABLE KEYS */;
INSERT INTO `tutorials` VALUES (1,'낚시 가기 좋은 날','[{\"order\": \"1\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(1).webp\", \"description\": \"바람이 많이 안 불어야 해요.\"}, {\"order\": \"2\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(2).webp\", \"description\": \"파도의 높이는 적당해야 해요.\"}, {\"order\": \"3\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(3).webp\", \"description\": \"수온은 15도 이상이 좋아요.\"}, {\"order\": \"4\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(4).webp\", \"description\": \"⭐위치 선정이 중요해요.\"}, {\"order\": \"5\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(5).webp\", \"description\": \"해가 뜰때, 물고기가 잘 잡혀요.\"}, {\"order\": \"6\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EA%B0%80%EA%B8%B0+%EC%A2%8B%EC%9D%80+%EB%82%A0+(6).webp\", \"description\": \"물이 많이 들어올 때가 좋아요.\"}, {\"order\": \"7\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C-%EA%B0%80%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EB%82%A0-_7_.webp\", \"description\": \"물때는 3 ~ 5물이 좋아요.\"}]'),(2,'준비물','[{\"order\": \"1\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC1_%EB%82%9A%EC%8B%AF%EB%8C%80.webp\", \"description\": \"낚싯대\"}, {\"order\": \"2\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC2_%EB%A6%B4.webp\", \"description\": \"릴\"}, {\"order\": \"3\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC3_%EB%82%9A%EC%8B%AF%EC%A4%84.webp\", \"description\": \"낚시줄\"}, {\"order\": \"4\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC4_%EB%AF%B8%EB%81%BC.webp\", \"description\": \"미끼\"}, {\"order\": \"5\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC5_%EB%AC%B6%EC%9D%8C%EC%B6%94.webp\", \"description\": \"묶음추\"}, {\"order\": \"6\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC6_%EC%9E%A5%EA%B0%91.webp\", \"description\": \"목장갑\"}, {\"order\": \"7\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC7_%EA%B0%80%EC%9C%84.webp\", \"description\": \"가위\"}, {\"order\": \"8\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC8_%EC%93%B0%EB%A0%88%EA%B8%B0%EB%B4%89%ED%88%AC.webp\", \"description\": \"쓰레기 봉투\"}, {\"order\": \"9\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC9_%EC%9D%98%EC%9E%90.webp\", \"description\": \"[선택] 의자\"}, {\"order\": \"10\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%A4%80%EB%B9%84%EB%AC%BC10_%EB%B0%94%EA%B5%AC%EB%8B%88.webp\", \"description\": \"낚시 바구니\"}]'),(3,'원투 낚시','[{\"order\": \"1\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%9B%90%ED%88%AC%EB%82%9A%EC%8B%9C.webp\", \"description\": \"기본적인 낚시\"}]'),(4,'낚시대 세팅','[{\"order\": \"1\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%A7%A4%EB%93%AD%EC%A7%93%EA%B8%B01.gif\", \"description\": \"원을 만드세요.\"}, {\"order\": \"2\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%A7%A4%EB%93%AD%EC%A7%93%EA%B8%B02.gif\", \"description\": \"4바퀴 돌리세요.\"}, {\"order\": \"3\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%A7%A4%EB%93%AD%EC%A7%93%EA%B8%B03.gif\", \"description\": \"가운데에 줄을 넣으세요.\"}, {\"order\": \"4\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%A7%A4%EB%93%AD%EC%A7%93%EA%B8%B04.gif\", \"description\": \"잡아당기세요.\"}, {\"order\": \"5\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C%EB%8C%80+%EC%85%8B%ED%8C%85.gif\", \"description\": \"낚시대를 위에서부터 빼세요.\"}]'),(5,'미끼 끼우기','[{\"order\": \"1\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%AF%B8%EB%81%BC1.gif\", \"description\": \"지렁이를 바늘을 따라 쭉 끼우세요\"}, {\"order\": \"2\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%AF%B8%EB%81%BC2.gif\", \"description\": \"지렁이의 입부터 바늘에 끼우세요.\"}, {\"order\": \"3\", \"imageUrl\": \"https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/TUTORIAL/%EB%AF%B8%EB%81%BC3.gif\", \"description\": \"바늘의 끝까지 지렁이를 끼웠다면, 지렁이를 꾹 눌러 자르세요.\"}]'),(6,'낚시 캐스팅 & 입질','[{\"order\": \"1\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EB%82%9A%EC%8B%9C+%EC%BA%90%EC%8A%A4%ED%8C%85+1.png\", \"description\": \"검지 손가락으로 줄을 당겨 낚싯대를 잡으세요.\"}, {\"order\": \"2\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%BA%90%EC%8A%A4%ED%8C%85%EC%82%AC%EC%A0%84%EC%A4%80%EB%B9%842.gif\", \"description\": \"줄을 당겨 잡은 상태에서 릴을 젖히세요.\"}, {\"order\": \"3\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%BA%90%EC%8A%A4%ED%8C%851.gif\", \"description\": \"어깨 위로 낚싯대를 잡으세요.\"}, {\"order\": \"4\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%BA%90%EC%8A%A4%ED%8C%852.gif\", \"description\": \"낚싯대가 얼굴 앞으로 왔을 때 검지로 걸고 있는 손가락을 놓으세요.\"}, {\"order\": \"5\", \"imageUrl\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/TUTORIAL/%EC%BA%90%EC%8A%A4%ED%8C%853.gif\", \"description\": \"낚싯대를 던진 후, 릴을 다시 젖히고 차분히 기다리세요.\"}]');
/*!40000 ALTER TABLE `tutorials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:27:06
