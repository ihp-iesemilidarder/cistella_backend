-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cistella
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `cat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`cat_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Informatica');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `cou_id` int(11) NOT NULL AUTO_INCREMENT,
  `cou_title` varchar(50) NOT NULL,
  `cou_description` varchar(500) NOT NULL,
  `cou_price` decimal(5,2) NOT NULL,
  `cou_price_offer` decimal(5,2) NOT NULL,
  `cou_img` varchar(50) NOT NULL,
  `cou_date_start` date NOT NULL,
  `cou_date_finish` date NOT NULL,
  `cou_schedule_start` time NOT NULL,
  `cou_duration` time NOT NULL,
  `cou_stars` decimal(2,1) NOT NULL,
  `cou_cat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`cou_id`),
  UNIQUE KEY `course_UK` (`cou_title`),
  KEY `cou_cat_FK` (`cou_cat_name`),
  CONSTRAINT `cou_cat_FK` FOREIGN KEY (`cou_cat_name`) REFERENCES `category` (`cat_name`),
  CONSTRAINT `cou_stars_CK` CHECK (`cou_stars` >= 1 and `cou_stars` <= 5)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (6,'Desarrollo Python','Descripcion',50.50,100.50,'picture.jpg','2002-02-03','2003-02-03','20:00:00','01:00:00',3.0,'Informatica');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couxtea`
--

DROP TABLE IF EXISTS `couxtea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `couxtea` (
  `cxt_id` int(11) NOT NULL AUTO_INCREMENT,
  `cxt_cou_id` int(11) NOT NULL,
  `cxt_tea_id` int(11) NOT NULL,
  PRIMARY KEY (`cxt_id`),
  UNIQUE KEY `cxt_UK` (`cxt_cou_id`,`cxt_tea_id`),
  KEY `cxt_tea_FK` (`cxt_tea_id`),
  CONSTRAINT `cxt_cou_FK` FOREIGN KEY (`cxt_cou_id`) REFERENCES `course` (`cou_id`),
  CONSTRAINT `cxt_tea_FK` FOREIGN KEY (`cxt_tea_id`) REFERENCES `teacher` (`tea_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couxtea`
--

LOCK TABLES `couxtea` WRITE;
/*!40000 ALTER TABLE `couxtea` DISABLE KEYS */;
INSERT INTO `couxtea` VALUES (1,6,7),(2,6,11);
/*!40000 ALTER TABLE `couxtea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couxthe`
--

DROP TABLE IF EXISTS `couxthe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `couxthe` (
  `cxt_id` int(11) NOT NULL AUTO_INCREMENT,
  `cxt_cou_id` int(11) NOT NULL,
  `cxt_the_id` int(11) NOT NULL,
  PRIMARY KEY (`cxt_id`),
  UNIQUE KEY `cxt_UK` (`cxt_cou_id`,`cxt_the_id`),
  KEY `couxthe_the_FK` (`cxt_the_id`),
  CONSTRAINT `couxthe_cou_FK` FOREIGN KEY (`cxt_cou_id`) REFERENCES `course` (`cou_id`),
  CONSTRAINT `couxthe_the_FK` FOREIGN KEY (`cxt_the_id`) REFERENCES `theme` (`the_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couxthe`
--

LOCK TABLES `couxthe` WRITE;
/*!40000 ALTER TABLE `couxthe` DISABLE KEYS */;
/*!40000 ALTER TABLE `couxthe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `pro_tea_id` int(11) NOT NULL,
  `pro_username` varchar(100) NOT NULL,
  `pro_password` varchar(500) NOT NULL,
  PRIMARY KEY (`pro_tea_id`),
  CONSTRAINT `pro_tea_FK` FOREIGN KEY (`pro_tea_id`) REFERENCES `teacher` (`tea_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (7,'IVAN','1234'),(11,'ivan','1234');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `tea_id` int(11) NOT NULL AUTO_INCREMENT,
  `tea_name` varchar(50) NOT NULL,
  `tea_surname1` varchar(100) NOT NULL,
  `tea_surname2` varchar(100) NOT NULL,
  PRIMARY KEY (`tea_id`),
  UNIQUE KEY `teacher_UK` (`tea_name`,`tea_surname1`,`tea_surname2`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (7,'IvanModify2','Heredia','Planas'),(11,'IvanModify3','Heredia','Planas'),(13,'IvanModify4','Heredia','Planas');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theme` (
  `the_id` int(11) NOT NULL AUTO_INCREMENT,
  `the_title` varchar(100) NOT NULL,
  `the_description` varchar(500) NOT NULL,
  PRIMARY KEY (`the_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES (1,'Introduccion','Introduccion al desarrollo web');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-07 18:47:12
