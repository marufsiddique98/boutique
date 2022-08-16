-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2022 at 07:52 AM
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
-- Table structure for table `buy`
--

CREATE TABLE IF NOT EXISTS `buy` (
  `user_id` int(11) NOT NULL,
  `account` varchar(256) NOT NULL,
  `trans` varchar(256) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy`
--

INSERT INTO `buy` (`user_id`, `account`, `trans`, `product_id`) VALUES
(1, '+1 (476) 159-4202', 'Eiusmod proident si', 0),
(1, '+1 (476) 159-4202', 'Eiusmod proident si', 0),
(1, '+1 (476) 159-4202', 'Eiusmod proident si', 0),
(1, '+1 (392) 161-3351', 'Duis at possimus te', 4);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `user_id` bigint(20) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`user_id`, `product_id`) VALUES
(1, 4),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `parent` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parent`) VALUES
(1, 'Saree', 0),
(2, 'Burkha', 0),
(3, '3 Piece', 0),
(4, 'Hijab', 0),
(5, 'Orna', 0),
(6, 'Silk', 1),
(7, 'Jamdani', 1),
(8, 'Benarasi', 1),
(9, 'Irani', 2),
(10, 'Arabian', 2),
(11, 'Deshi', 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `sell`, `quantity`, `img`, `category`, `type`) VALUES
(1, 'Silk Saree', 'lorem ipsum dolar sita amet', 3999.00, NULL, 10, '/images/shop/saree1.png', 1, NULL),
(2, 'Art Silk Saree', 'lorem ipsum dolar sita amet', 4999.00, 3499.00, 10, '/images/shop/saree2.png', 1, NULL),
(3, 'Jamdani Saree', 'lorem ipsum dolar sita amet', 5999.00, 4899.00, 10, '/images/shop/saree3.png', 1, NULL),
(4, 'Irani Burkha', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, '/images/shop/burkha(1).png', 2, NULL),
(5, 'Arabian Burkha', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, '/images/shop/burkha(2).png', 2, NULL),
(6, 'Deshi Burkha', 'lorem ipsum dolar sita amet', 399.00, 299.00, 10, '/images/shop/burkha(3).png', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `txt` text NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `name`, `email`, `txt`, `product_id`) VALUES
(1, 'Jordan Ingram', 'xulo@mailinator.com', 'Fugiat voluptatem ', 4999);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`) VALUES
(1, 'Molly Cannon', 'admin@admin.com', '123456', '+1 (513) 616-7536', 'Non omnis voluptas v');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
