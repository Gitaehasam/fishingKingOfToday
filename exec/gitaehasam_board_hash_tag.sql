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
-- Table structure for table `board_hash_tag`
--

DROP TABLE IF EXISTS `board_hash_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_hash_tag` (
  `board_hash_tag_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int DEFAULT NULL,
  `hashtag_id` int DEFAULT NULL,
  PRIMARY KEY (`board_hash_tag_id`),
  KEY `FKkghppb3xgwy9gknmyqbbjs3lg` (`board_id`),
  KEY `FK9ntdqg7p34kfpl7642m4bhcfi` (`hashtag_id`),
  CONSTRAINT `FK9ntdqg7p34kfpl7642m4bhcfi` FOREIGN KEY (`hashtag_id`) REFERENCES `hash_tag` (`hashtag_id`),
  CONSTRAINT `FKkghppb3xgwy9gknmyqbbjs3lg` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_hash_tag`
--

LOCK TABLES `board_hash_tag` WRITE;
/*!40000 ALTER TABLE `board_hash_tag` DISABLE KEYS */;
INSERT INTO `board_hash_tag` VALUES (1,4,1),(2,4,2),(3,4,3),(4,5,1),(5,5,1),(6,6,2),(7,7,3),(8,7,1),(9,8,2),(10,9,1),(11,10,3),(12,11,2),(13,12,1),(14,13,2),(15,14,1),(16,15,3),(17,16,3),(18,17,2),(19,18,1),(20,19,2),(21,20,2),(22,21,2),(23,22,3),(24,22,4),(25,19,5),(29,34,1),(30,36,2),(33,38,1),(34,38,8),(35,40,5),(36,42,5),(37,47,9),(38,48,10),(39,49,3);
/*!40000 ALTER TABLE `board_hash_tag` ENABLE KEYS */;
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
