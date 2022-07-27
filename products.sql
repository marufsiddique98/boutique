-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2022 at 05:56 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boutique`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` float(8,2) NOT NULL,
  `sell` float(8,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `img` text NOT NULL,
  `category` int(11) DEFAULT NULL,
  `type` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `sell`, `quantity`, `img`, `category`, `type`) VALUES
(1, 'Simple product', 'lorem ipsum dolar sita amet', 399.00, NULL, 10, 'images/shop/product3.jpg', 0, NULL),
(2, 'Simple product', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, 'images/shop/product4.jpg', 0, NULL),
(3, 'Simple product', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, 'images/shop/product5.jpg', 0, NULL),
(4, 'Simple product', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, 'images/shop/product6.jpg', 0, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
