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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL,
  `image_url` varchar(255) DEFAULT 'https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/admin/%EA%B8%B0%EB%B3%B8+%ED%94%84%EC%82%AC.jfif',
  `name` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-02-09 18:19:16','2024-02-15 03:43:39','https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/PROFILE/2462171811/bdff2acf488a8c09fe59a3e094a44047719666489d5bc1c437331174dc82a02a.jpg','강민정','피카츄','kakao','2462171811'),(2,'2024-02-09 18:43:44','2024-02-09 18:43:44','https://phinf.pstatic.net/contact/20180706_71/1530871632640J8j0K_JPEG/%C7%EF%B7%CE%C5%B0%C6%BC.jpg','강민정','대단한보리멸','naver','-bWboOEvxHpszbubaTTEe5YKF4cqKaeaa7egGwkHNoc'),(3,'2024-02-09 20:19:15','2024-02-09 20:19:15','https://gitaehasam-bucket.s3.ap-northeast-2.amazonaws.com/gitaehasam/LIVEROOM/3321154153/a57d17e0abae8669a738c35ec48435929ee7acbe3aca4e906b69705f427a764d.jpg','김민준','흥미로운가물치','kakao','3321154153'),(4,'2024-02-10 18:34:47','2024-02-10 18:34:47','https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/admin/%EA%B8%B0%EB%B3%B8+%ED%94%84%EC%82%AC.jfif','김지연','독특한쏨뱅이','kakao','3281088436'),(6,'2024-02-11 11:23:44','2024-02-11 11:23:44','https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/admin/%EA%B8%B0%EB%B3%B8+%ED%94%84%EC%82%AC.jfif','허승경','자상한자리돔','kakao','3281128938'),(17,'2024-02-12 09:32:24','2024-02-16 07:56:10','https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/PROFILE/3281079030/fe89cbd472df1f4c22613f15f9425d3379814d81b64a5e2529b4da93dcfdae97.jpg','정태윤','훌륭한망둥어','kakao','3281079030'),(19,'2024-02-12 16:00:38','2024-02-12 16:00:38','https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/admin/%EA%B8%B0%EB%B3%B8+%ED%94%84%EC%82%AC.jfif','자영','기뻐하는자리돔','kakao','3330361706'),(20,'2024-02-13 17:16:10','2024-02-13 17:16:10','https://ssl.pstatic.net/static/pwe/address/img_profile.png','정태윤','훈훈한송어','naver','MsK3JUp0pmV2nOsdjEMCwhC-b3ARc7QnmJwdavI1qbI'),(21,'2024-02-15 01:07:55','2024-02-15 01:07:55',NULL,'희승','친절한전갱이','kakao','3343283424'),(22,'2024-02-15 12:36:15','2024-02-15 12:36:15',NULL,'도훈','화려한방어','kakao','3344581710'),(23,'2024-02-15 13:31:09','2024-02-15 13:31:09',NULL,'예림','고요한잉어','kakao','3344670995'),(24,'2024-02-15 14:04:04','2024-02-15 14:04:04',NULL,'송아람','재치있는쏨뱅이','kakao','3344725447'),(25,'2024-02-16 00:12:38','2024-02-16 00:12:38',NULL,'서정빈','즐거운뽈락','kakao','3345623313'),(26,'2024-02-16 04:44:22','2024-02-16 04:44:22',NULL,'유상진','유능한상어','kakao','3345759040');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:27:07
