-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bbs`
--

DROP TABLE IF EXISTS `bbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bbs` (
  `bbs_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `writer` varchar(24) NOT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bbs_id`),
  KEY `fk_bbs_user1_idx` (`user_id`),
  CONSTRAINT `fk_bbs_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bbs`
--

LOCK TABLES `bbs` WRITE;
/*!40000 ALTER TABLE `bbs` DISABLE KEYS */;
INSERT INTO `bbs` VALUES (1,1,'irony','2022-08-02 16:08:12'),(2,2,'peng','2022-08-02 16:08:12'),(3,2,'peng','2022-08-02 16:08:12');
/*!40000 ALTER TABLE `bbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyword` (
  `keyword_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `word` varchar(32) NOT NULL,
  PRIMARY KEY (`keyword_id`),
  UNIQUE KEY `code_UNIQUE` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` VALUES (2,'article'),(4,'Ceci'),(9,'Deuxième'),(1,'first'),(8,'peng'),(5,'premier'),(7,'글'),(3,'첫글'),(6,'펭');
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lang`
--

DROP TABLE IF EXISTS `lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lang` (
  `bbs_id` bigint unsigned NOT NULL,
  `type` varchar(8) NOT NULL,
  `title` varchar(128) NOT NULL,
  PRIMARY KEY (`bbs_id`,`type`),
  KEY `fk_lang_bbs_idx` (`bbs_id`),
  CONSTRAINT `fk_lang_bbs` FOREIGN KEY (`bbs_id`) REFERENCES `bbs` (`bbs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lang`
--

LOCK TABLES `lang` WRITE;
/*!40000 ALTER TABLE `lang` DISABLE KEYS */;
INSERT INTO `lang` VALUES (1,'FR','Ceci est le premier article'),(1,'KO','첫글입니다'),(1,'US','first article'),(2,'KO','펭의 글'),(2,'US','pengs article'),(3,'FR','Deuxième article de peng');
/*!40000 ALTER TABLE `lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lang_and_keyword`
--

DROP TABLE IF EXISTS `lang_and_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lang_and_keyword` (
  `keyword_id` bigint unsigned NOT NULL,
  `bbs_id` bigint unsigned NOT NULL,
  `type` varchar(8) NOT NULL,
  `ord` int unsigned NOT NULL DEFAULT '1',
  KEY `fk_bbs_and_keyword_keyword1_idx` (`keyword_id`),
  KEY `fk_bbs_and_keyword_lang1_idx` (`bbs_id`,`type`),
  CONSTRAINT `fk_bbs_and_keyword_keyword1` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`keyword_id`),
  CONSTRAINT `fk_bbs_and_keyword_lang1` FOREIGN KEY (`bbs_id`, `type`) REFERENCES `lang` (`bbs_id`, `type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lang_and_keyword`
--

LOCK TABLES `lang_and_keyword` WRITE;
/*!40000 ALTER TABLE `lang_and_keyword` DISABLE KEYS */;
INSERT INTO `lang_and_keyword` VALUES (1,1,'US',1),(2,1,'US',2),(3,1,'KO',1),(4,1,'FR',1),(5,1,'FR',2),(2,1,'FR',3),(6,2,'KO',1),(7,2,'KO',2),(8,2,'US',1),(2,2,'US',2),(9,3,'FR',1),(2,3,'FR',2),(8,3,'FR',3);
/*!40000 ALTER TABLE `lang_and_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(24) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'irony'),(3,'likeAdmin'),(2,'peng');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-05  9:44:53
