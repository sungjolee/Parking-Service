-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: i7c103.p.ssafy.io    Database: parking
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Temporary view structure for view `VW_MAPVIEW`
--

DROP TABLE IF EXISTS `VW_MAPVIEW`;
/*!50001 DROP VIEW IF EXISTS `VW_MAPVIEW`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `VW_MAPVIEW` AS SELECT 
 1 AS `ID`,
 1 AS `NAME`,
 1 AS `LATITUDE`,
 1 AS `LONGITUDE`,
 1 AS `ADDRESS`,
 1 AS `PARKING`,
 1 AS `OWNER`,
 1 AS `ADMIN`,
 1 AS `ENABLE`,
 1 AS `TOTAL`,
 1 AS `TIME`,
 1 AS `SERIAL_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `VW_MAPVIEW`
--

/*!50001 DROP VIEW IF EXISTS `VW_MAPVIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `VW_MAPVIEW` AS select `A`.`ID` AS `ID`,`A`.`NAME` AS `NAME`,`A`.`LATITUDE` AS `LATITUDE`,`A`.`LONGITUDE` AS `LONGITUDE`,`A`.`ADDRESS` AS `ADDRESS`,`A`.`PARKING` AS `PARKING`,`A`.`OWNER` AS `OWNER`,`A`.`ADMIN` AS `ADMIN`,`B`.`ENABLE` AS `ENABLE`,`B`.`TOTAL` AS `TOTAL`,`B`.`TIME` AS `TIME`,`B`.`SERIAL_ID` AS `SERIAL_ID` from ((`TB_PARKING_MAIN` `A` join (select `C`.`SERIAL_ID` AS `SERIAL_ID`,`D`.`TIME` AS `TIME`,`C`.`ENABLE` AS `ENABLE`,`C`.`TOTAL` AS `TOTAL` from (`TB_PARKING_LOG` `C` left join (select `TB_PARKING_LOG`.`SERIAL_ID` AS `SERIAL_ID`,max(`TB_PARKING_LOG`.`TIME`) AS `TIME` from `TB_PARKING_LOG` group by `TB_PARKING_LOG`.`SERIAL_ID`) `D` on((`C`.`TIME` = `D`.`TIME`))) where (`D`.`TIME` is not null)) `B`) join `TB_PARKING_DETAIL` `C`) where ((`C`.`ID` = `A`.`ID`) and (`C`.`SERIAL_ID` = `B`.`SERIAL_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19  1:51:13
