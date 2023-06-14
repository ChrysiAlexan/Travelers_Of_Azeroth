-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 10:48 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelagency`
--
CREATE DATABASE IF NOT EXISTS `travelagency` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `travelagency`;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postal_code` varchar(50) NOT NULL,
  `mobile_phone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `firstname`, `lastname`, `email`, `password`, `address`, `city`, `postal_code`, `mobile_phone`) VALUES
(1, 'asdsad', 'adssad', 'sa@sg.s', 'Aaaaaaa6', 'sad', 'sad', 'sad', 'sad'),
(2, 'Sad', 'Sosad', 'so@sa.d', 'Aaaaaaa6', 'sad 3', 'Sadville', '1234', '123456778'),
(3, 'admin', 'admin', 'admin@admin', 'admin', 'admin', 'admin', 'admin', 'admin'),
(4, 'happy', 'ha', 'ha@ha', '123456aA', 'qw', 'rfe', 'trere', '5453'),
(5, 'sdf', 'sdf', 'john@john', '123456aA', 'erfe', 'rte', 'thuu', 'trrrrri');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `packageid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `packageid`, `userid`, `date`) VALUES
(1, 1, 1, '2023-06-10'),
(2, 2, 2, '2023-06-11'),
(3, 2, 2, '2023-06-11'),
(4, 4, 1, '2023-06-12'),
(5, 3, 1, '2023-06-12'),
(6, 2, 3, '2023-06-12'),
(7, 3, 3, '2023-06-12'),
(8, 7, 4, '2023-06-13');

-- --------------------------------------------------------

--
-- Table structure for table `travelpackage`
--

CREATE TABLE `travelpackage` (
  `packageid` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `fromCity` varchar(50) NOT NULL,
  `toCity` varchar(50) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `duration` int(11) NOT NULL,
  `photoURL` varchar(50) NOT NULL,
  `availableSeats` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `travelpackage`
--

INSERT INTO `travelpackage` (`packageid`, `price`, `fromCity`, `toCity`, `fromDate`, `toDate`, `duration`, `photoURL`, `availableSeats`, `description`) VALUES
(1, 150, 'Stormwind', 'Ironforge', '2023-07-01', '2023-07-07', 7, 'images/iron.jpg', 2, 'is the capital city of the dwarves, proud members of the Alliance. It is the one of the oldest cities of Azeroth.'),
(2, 200, 'Stormwind', 'Darnassus', '2023-07-08', '2023-07-14', 7, 'images/Darnassus.jpg', 100, 'Darnassus is the capital city of the night elves of the Alliance, found in western Teldrassil. The High Priestess, Tyrande Whisperwind, resided in the Temple of the Moon, surrounded by other sisters of Elune and her mate, the Archdruid Malfurion Stormrage'),
(3, 300, 'Stormwind', 'Shrine of Seven Stars', '2023-08-01', '2023-08-20', 20, 'images/Shrine.jpg', 250, 'The Shrine of Seven Stars is an ancient mogu structure located south of Mogu\'shan Palace in the eastern part of the Vale of Eternal Blossoms. '),
(4, 30, 'Stormwind', 'Dalaran', '2023-07-10', '2023-07-12', 2, 'images/dalaran.jpg', 750, 'Dalaran is the capital of the magocratic nation, floating above the western side of Crystalsong Forest. The city\'s inner fortress has served as the focal point for magi and the study of the arcane throughout human history. '),
(5, 80, 'Stormwind', 'Exodar', '2023-08-20', '2023-08-25', 5, 'images/Exodar.jpg', 70, 'The Exodar is the draenei\'s enchanted capital city located on Azuremyst Isle. It is a dimensional ship satellite structure of the dimensional fortress known as Tempest Keep that crashed on Azeroth.'),
(6, 50, 'Stormwind', 'Suramar', '2023-08-25', '2023-08-30', 5, 'images/suramar.jpg', 500, 'Suramar is located in the central Broken Isles, it was famously the hometown of several important night elve. Today it is the home of the Nightborne, is built on ley lines, and arcane coils in the tunnel system running beneath Suramar.'),
(7, 126, 'Orgrimmar', 'Undercity', '2023-09-01', '2023-09-05', 5, 'images/Undercity.jpg', 300, 'The Undercity is the capital city of the Forsaken undead of the Horde. Its located right under the Ruins of Lordaeron in Tirisfal Glades, at the northwestern edge of the continent of Lordaeron.'),
(8, 276, 'Orgrimmar', 'Silvermoon City', '2023-08-15', '2023-08-25', 10, 'images/Silvermoon.jpg', 70, 'Silvermoon City is the crown jewel of the blood elves and their capital city. It is nestled in the northern reaches of the Eversong Woods in their ancestral homeland of Quel\'Thalas.'),
(9, 63, 'Orgrimmar', 'Thunder Bluff', '2023-08-01', '2023-06-05', 5, 'images/ThunderBluff.jpg', 100, 'Thunder Bluff is the tauren capital city located in the northern part of the region of Mulgore. The entire city is built on bluffs several hundred feet above the surrounding landscape.'),
(10, 30, 'Orgrimmar', 'Dalaran', '2023-07-12', '2023-07-14', 2, 'images/dalaran.jpg', 750, 'Dalaran is the capital of the magocratic nation, floating above the western side of Crystalsong Forest. The city\'s inner fortress has served as the focal point for magi and the study of the arcane throughout human history. '),
(11, 588, 'Orgrimmar', 'Shrine of Two Moons', '2023-08-30', '2023-09-05', 6, 'images/shrine2.jpg', 200, 'The Shrine of Two Moons is an ancient mogu structure located north of Mogu\'shan Palace in the eastern part of the Vale of Eternal Blossoms. The Golden Lotus have allowed use of the shrine by the Horde.'),
(12, 139, 'Orgrimmar', 'Dazar\'alor', '2023-10-20', '2023-10-30', 10, 'images/dazaralor.jpg', 300, 'Cloistered between two mountain ranges in Zuldazar, Dazar\'alor is the seat of power of the Zandalari Empire and a lively trade port that boasts exotic goods from all over Azeroth.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `travelpackage`
--
ALTER TABLE `travelpackage`
  ADD PRIMARY KEY (`packageid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `travelpackage`
--
ALTER TABLE `travelpackage`
  MODIFY `packageid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
