-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 17, 2021 at 02:47 PM
-- Server version: 5.6.51
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coronati_alphacapital_july_2021`
--

--
-- Dumping data for table `shares`
--

INSERT INTO `shares` (`share_id`, `company_symbol`, `company_name`, `isin_number`, `current_price`, `is_active`) VALUES
(11359, 'ANGELBRKG', 'Angel Broking Limited', 'INE732I01013', 330.2, 1),
(11358, 'SPICEJET', 'SPICEJET LTD', 'INE216A01030', 82.95, 1),
(11357, 'SBICARD', 'SBI Cards and Payment Services Ltd', 'INE018E01016', 1069.3, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
