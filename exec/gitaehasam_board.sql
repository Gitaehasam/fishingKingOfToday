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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `image` json DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `fish_book_id` int DEFAULT NULL,
  `fishing_spot_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK60jn05fpinj6cjhqcmtkacu2g` (`category_id`),
  KEY `FKs6u2bn8e83sdcgdf7iv22le2x` (`fish_book_id`),
  KEY `FK44lrforgt3n0yieh52gv1t8jh` (`fishing_spot_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FK44lrforgt3n0yieh52gv1t8jh` FOREIGN KEY (`fishing_spot_id`) REFERENCES `fishing_spot` (`fishing_spot_id`),
  CONSTRAINT `FK60jn05fpinj6cjhqcmtkacu2g` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKs6u2bn8e83sdcgdf7iv22le2x` FOREIGN KEY (`fish_book_id`) REFERENCES `fish_book` (`fish_book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (2,'2024-02-14 03:01:30','2024-02-14 03:01:30','안녕하세요','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',1,1,1,17),(3,'2024-02-14 03:02:34','2024-02-14 03:02:34','안녕하세요','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,1,17),(4,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다1','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,514,4),(5,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다2','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,153,4),(6,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다3','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,359,4),(7,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다4','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,358,4),(8,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다5','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,356,4),(9,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다6','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,357,4),(10,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다7','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,612,4),(11,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다8','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,514,4),(12,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다9','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,153,4),(13,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다10','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,514,4),(14,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다11','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,153,4),(15,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다12','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,359,4),(16,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다13','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,358,4),(17,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다14','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,356,4),(18,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다15','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,357,4),(19,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다16','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,150,4),(20,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다17','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,150,4),(21,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다18','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,514,4),(22,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다19','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,514,4),(23,'2024-02-14 07:31:43','2024-02-14 07:31:43','반갑읍니다20','{\"url\": \"https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/20171221165304957B.jpg\"}',2,NULL,153,4),(32,'2024-02-15 21:53:04','2024-02-15 21:53:04','날씨가 좋네요','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/430a923459951e0234df81bf6ccac50472c0f308e470b093f0fda49749c6785a.jpeg\", \"latitude\": 35.1636, \"createdAt\": null, \"longitude\": 126.839}',1,1,153,17),(34,'2024-02-15 23:24:37','2024-02-15 23:24:37','낚시 포인트 추천합니다.','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3330361706/0ff6c914a7fa0d4ac80700c3eb3744ef7f51549de5c0758560c5e35fb8901d08.jpg\", \"latitude\": 36.0551, \"createdAt\": null, \"longitude\": 128.368}',2,NULL,173,19),(36,'2024-02-15 23:32:13','2024-02-15 23:32:13','노을이 좋습니다','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/1ec58786318a25e3ea9e00e8d0ac820d9d7d6d6b8c6cd680540de35e9491e12c.jpeg\", \"latitude\": 36.6991, \"createdAt\": null, \"longitude\": 129.476}',2,NULL,41,17),(38,'2024-02-15 23:35:27','2024-02-15 23:35:27','사진찍기 참 좋네요','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/932ed941e8f8c5a091250a75be914338e701cf8e0c8b040f4a9d6bc921f570f9.jpeg\", \"latitude\": 37.2812, \"createdAt\": null, \"longitude\": 126.896}',2,NULL,269,17),(39,'2024-02-16 00:35:32','2024-02-16 00:35:32','진짜 물반 고기반이네요.','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/216d5fb5a086cc6d86debfce4b639e3c6e5658350aa0a04aabf96e4a808800c2.jpeg\", \"latitude\": 37.3815, \"createdAt\": null, \"longitude\": 127.975}',2,NULL,595,17),(40,'2024-02-16 00:36:58','2024-02-16 00:36:58','이렇게 많이 잡을 수 있다니','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/e29fd33ae4ada6150d45653223c753220a3d46d7877ac1165935d31195e439f7.jpeg\", \"latitude\": 36.6072, \"createdAt\": null, \"longitude\": 126.793}',2,NULL,389,17),(41,'2024-02-16 00:37:57','2024-02-16 00:37:57','이게 다 물고기라니','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/c24d2a73409dc83737b49df7984056156c1ee89d8295278737d821f41f7a3595.jpeg\", \"latitude\": 35.9869, \"createdAt\": null, \"longitude\": 129.024}',2,NULL,170,17),(42,'2024-02-16 00:38:52','2024-02-16 00:38:52','이게 다 물고기라니','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/c33a677469fdf3645c93faffab3676944d46b5f50c97c347759a1730c43ead36.jpeg\", \"latitude\": 35.9869, \"createdAt\": null, \"longitude\": 129.024}',2,NULL,170,17),(43,'2024-02-16 00:52:49','2024-02-16 00:52:49','낚시하기 좋은 날 입니다.','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/d125b45e5e545d0a93355b35c3b6c83e742a938632c37d1d77cdfb9b00471676.jpeg\", \"latitude\": 35.1636, \"createdAt\": null, \"longitude\": 126.839}',2,NULL,153,17),(44,'2024-02-16 00:53:55','2024-02-16 00:53:55','사진맛집!','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/24dbf46e90b403b80e695dff3ff673164f4f9dd271ad16de7506b9622f332fd0.jpeg\", \"latitude\": 35.1636, \"createdAt\": null, \"longitude\": 126.839}',2,NULL,153,17),(45,'2024-02-16 01:12:01','2024-02-16 01:12:01','나의 망둥어','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/676c5a6dce3ef2c0c3d830f6ea70c5657d0d664b95958bc2955ebb5336aeeac3.jpg\", \"latitude\": 36.7495, \"createdAt\": null, \"longitude\": 126.308}',1,1,138,17),(46,'2024-02-16 01:12:02','2024-02-16 01:12:02','망둥어 잡았어요.','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/676c5a6dce3ef2c0c3d830f6ea70c5657d0d664b95958bc2955ebb5336aeeac3.jpg\", \"latitude\": 36.7495, \"createdAt\": null, \"longitude\": 126.308}',1,1,138,17),(47,'2024-02-16 02:15:51','2024-02-16 02:15:51','제 물고기 귀엽나요?','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3330361706/45b9f5622dbc8d37e3023112eb05509f2a7548c6c495ce61dc23c0c47ce53595.webp\", \"latitude\": 34.3056, \"createdAt\": null, \"longitude\": 126.516}',1,25,20,19),(48,'2024-02-16 02:31:43','2024-02-16 02:31:43','귀여워','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3330361706/146cda579a9bd5dccb66777be9a263b8de3f0a22154fe595fce0fd2086266d86.webp\", \"latitude\": 35.9866, \"createdAt\": null, \"longitude\": 129.262}',1,36,169,19),(49,'2024-02-16 07:40:36','2024-02-16 07:40:36','월척을 기대하며','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/0989277377f283f45602d5fb2bdaaee434c7023f37b56e30a29a22e121426031.jpeg\", \"latitude\": 36.4182, \"createdAt\": null, \"longitude\": 126.429}',2,NULL,107,17),(50,'2024-02-16 08:05:45','2024-02-16 08:05:45','망둥어 한컷','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/43dee33b4366750c9e379c6025edcbd0daa8b2d5619aa8c9df2e3c54d566e545.jpg\", \"latitude\": 37.0413, \"createdAt\": null, \"longitude\": 127.867}',1,27,238,17),(51,'2024-02-16 08:05:46','2024-02-16 08:05:46','망둥어 한컷','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/43dee33b4366750c9e379c6025edcbd0daa8b2d5619aa8c9df2e3c54d566e545.jpg\", \"latitude\": 37.0413, \"createdAt\": null, \"longitude\": 127.867}',1,27,238,17),(52,'2024-02-16 09:28:46','2024-02-16 09:28:46','돌돔이 이쁘게 생겼네요','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/3efac8dd849998e074416ca4c0aea538a3605b4a83797bb11dbd720fbed48684.jfif\", \"latitude\": 35.93, \"createdAt\": null, \"longitude\": 128.469}',1,25,167,17),(53,'2024-02-16 09:32:04','2024-02-16 09:32:04','돌돔이 많이 잡히네요','{\"url\": \"https://d2qe2q8v1imxmh.cloudfront.net/gitaehasam/LIVEROOM/3281079030/ee61a9b9a54180b15102442f4965e0a544e5b6b5360c97c17c886efdeb8479b2.jfif\", \"latitude\": 35.211, \"createdAt\": null, \"longitude\": 129.204}',1,25,154,17);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:27:08
