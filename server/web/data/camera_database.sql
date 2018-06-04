-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 04, 2018 at 02:51 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `camera_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `ct_don_dat_hang`
--

DROP TABLE IF EXISTS `ct_don_dat_hang`;
CREATE TABLE IF NOT EXISTS `ct_don_dat_hang` (
  `ma_ddh` int(10) NOT NULL,
  `ma_may_anh` int(10) NOT NULL,
  `so_luong` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_ddh`,`ma_may_anh`),
  KEY `ma_may_anh` (`ma_may_anh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ct_hoa_don`
--

DROP TABLE IF EXISTS `ct_hoa_don`;
CREATE TABLE IF NOT EXISTS `ct_hoa_don` (
  `ma_hd` int(10) NOT NULL,
  `ma_may_anh` int(10) NOT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `gia_ban` int(11) DEFAULT NULL,
  PRIMARY KEY (`ma_hd`,`ma_may_anh`),
  KEY `ma_may_anh` (`ma_may_anh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cung_ung`
--

DROP TABLE IF EXISTS `cung_ung`;
CREATE TABLE IF NOT EXISTS `cung_ung` (
  `ma_ncc` int(10) NOT NULL,
  `ma_may_anh` int(10) NOT NULL,
  PRIMARY KEY (`ma_ncc`,`ma_may_anh`),
  KEY `ma_may_anh` (`ma_may_anh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `don_dat_hang`
--

DROP TABLE IF EXISTS `don_dat_hang`;
CREATE TABLE IF NOT EXISTS `don_dat_hang` (
  `ma_ddh` int(10) NOT NULL,
  `ma_kh` int(10) NOT NULL,
  `ngay_dat_hang` date DEFAULT NULL,
  `ma_ncc` int(10) DEFAULT NULL,
  PRIMARY KEY (`ma_ddh`),
  KEY `ma_ncc` (`ma_ncc`),
  KEY `ma_kh` (`ma_kh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
CREATE TABLE IF NOT EXISTS `hoa_don` (
  `ma_hd` int(10) NOT NULL,
  `ma_kh` int(10) NOT NULL,
  `ngay_lap` date DEFAULT NULL,
  PRIMARY KEY (`ma_hd`),
  KEY `ma_kh` (`ma_kh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ma_kh` int(10) NOT NULL AUTO_INCREMENT,
  `ten_kh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_sinh` date NOT NULL,
  `dia_chi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sdt` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permission` int(11) NOT NULL,
  PRIMARY KEY (`ma_kh`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khach_hang`
--

INSERT INTO `khach_hang` (`ma_kh`, `ten_kh`, `ngay_sinh`, `dia_chi`, `sdt`, `permission`) VALUES
(1, 'Đinh Bá Tiên', '1960-02-11', '119 Cống Quỳnh, Tp HCM', '01678093177', 0),
(2, 'Nguyễn Thanh Tùng', '1962-08-20', '222 Nguyễn Văn Cừ, Tp HCM', '01678128177', 0),
(3, 'Bùi Ngọc Hằng', '1963-08-02', '323 Nguyễn Thái Hoc, Tp HCM', '01679128177', 0),
(4, 'Lê Quỳnh Như', '1967-02-01', '291 Hồ Văn Huê, Tp HCM', '01679128123', 0),
(5, 'Nguyễn Mạnh Hùng', '1967-03-04', '95 Bà Rịa, Vũng Tàu', '01679567123', 0),
(6, 'Trần Thanh Tâm', '1957-05-04', '34 Mai Thị Lự, Tp HCM', '01678907123', 0),
(7, 'Trần Hồng Quang', '1967-09-01', '80 Lê Hồng Phong, Tp HCM', '01678948323', 0),
(8, 'Phạm Văn Vinh', '1965-01-01', '65 Trưng Vương, Tp Hà Nội', '01678948287', 0);

-- --------------------------------------------------------

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
CREATE TABLE IF NOT EXISTS `loai` (
  `ma_loai` int(10) NOT NULL AUTO_INCREMENT,
  `ten_loai` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ma_loai`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loai`
--

INSERT INTO `loai` (`ma_loai`, `ten_loai`) VALUES
(1, 'máy ảnh canon'),
(2, 'máy ảnh nikon'),
(3, 'máy ảnh fujifilm'),
(4, 'máy ảnh leica'),
(5, 'máy ảnh olympus'),
(6, 'ống kính, lens'),
(7, 'máy ảnh microless'),
(8, 'máy ảnh du lich'),
(9, 'máy ảnh chụp lấy liền'),
(10, 'máy quay phim');

-- --------------------------------------------------------

--
-- Table structure for table `loai_may_anh`
--

DROP TABLE IF EXISTS `loai_may_anh`;
CREATE TABLE IF NOT EXISTS `loai_may_anh` (
  `ma_loai` int(10) NOT NULL,
  `ma_may_anh` int(10) NOT NULL,
  PRIMARY KEY (`ma_loai`,`ma_may_anh`),
  KEY `ma_may_anh` (`ma_may_anh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loai_may_anh`
--

INSERT INTO `loai_may_anh` (`ma_loai`, `ma_may_anh`) VALUES
(1, 1),
(1, 3),
(1, 6),
(3, 8),
(2, 11),
(1, 12),
(3, 13),
(1, 14),
(1, 15),
(1, 18),
(2, 20),
(3, 21),
(1, 22),
(1, 23),
(1, 24),
(3, 26),
(1, 28),
(1, 30),
(3, 31),
(2, 32),
(1, 33),
(2, 35),
(2, 36),
(1, 39),
(2, 40),
(2, 41),
(1, 42),
(3, 44),
(1, 45),
(1, 46),
(3, 51),
(2, 52),
(1, 53),
(1, 54),
(1, 55),
(3, 57),
(1, 58),
(3, 59),
(1, 61),
(1, 64),
(3, 65),
(5, 66),
(1, 67),
(1, 68),
(3, 69),
(3, 70),
(2, 71),
(1, 72),
(3, 73),
(1, 74),
(2, 75),
(1, 76),
(1, 77),
(3, 78),
(3, 79),
(1, 80),
(1, 81),
(1, 83),
(2, 84),
(3, 85),
(3, 86),
(1, 87),
(2, 89),
(3, 91),
(1, 92),
(2, 93),
(1, 94),
(2, 95),
(1, 97),
(2, 100),
(3, 102),
(1, 103),
(2, 105),
(2, 107),
(5, 113),
(1, 114),
(3, 116),
(1, 118),
(2, 119),
(1, 120),
(5, 123),
(3, 126),
(3, 127),
(5, 128),
(2, 130),
(2, 133),
(1, 135),
(2, 136),
(1, 139),
(3, 140),
(2, 141),
(1, 142),
(2, 147),
(2, 148),
(3, 149),
(2, 150),
(3, 151),
(1, 152),
(1, 153);

-- --------------------------------------------------------

--
-- Table structure for table `may_anh`
--

DROP TABLE IF EXISTS `may_anh`;
CREATE TABLE IF NOT EXISTS `may_anh` (
  `ma_may_anh` int(10) NOT NULL,
  `ten_may_anh` varchar(255) CHARACTER SET utf16 NOT NULL,
  `gia` int(11) NOT NULL,
  `duong_dan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ma_ncc` int(10) NOT NULL,
  `so_luong` int(10) NOT NULL,
  `so_luong_ban` int(10) NOT NULL,
  `so_luong_xem` int(10) NOT NULL,
  PRIMARY KEY (`ma_may_anh`),
  KEY `ma_ncc` (`ma_ncc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `may_anh`
--

INSERT INTO `may_anh` (`ma_may_anh`, `ten_may_anh`, `gia`, `duong_dan`, `ma_ncc`, `so_luong`, `so_luong_ban`, `so_luong_xem`) VALUES
(1, 'Máy Ảnh Canon EOS 750D Kit EF S18-55 IS STM ', 12490000, '1.jpg', 1, 0, 0, 0),
(2, 'Máy Ảnh Sony CyberShot DSC H300 (Đen)', 3450000, '2.jpg', 1, 0, 0, 0),
(3, 'Máy Ảnh Canon EOS M10 Kit EF-M15-45 (Đen)', 6700000, '3.jpg', 1, 0, 0, 0),
(4, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit 16-50 F3.5-5.6 OSS (Đen)', 13490000, '4.jpg', 1, 0, 0, 0),
(5, 'Máy Ảnh Sony CyberShot DSC H400 (Đen)', 5090000, '5.jpg', 1, 0, 0, 0),
(6, 'Máy Ảnh Canon EOS M10 Kit EF-M15-45 (Trắng)', 6700000, '6.jpg', 1, 0, 0, 0),
(7, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit 16-50 F3.5-5.6 OSS (Bạc)', 13490000, '7.jpg', 1, 0, 0, 0),
(8, 'Máy Ảnh Fujifilm X-A3 Kit XC16-50mm F3.5-5.6 OIS II ( bạc)', 10390000, '8.jpg', 1, 0, 0, 0),
(9, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000) Body (đen)', 10990000, '9.jpg', 1, 0, 0, 0),
(10, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit 16-50 F3.5-5.6 OSS (Xám)', 13490000, '10.jpg', 1, 0, 0, 0),
(11, 'Máy ảnh Nikon D3400 Kit AF-P 18-55 VR ', 9400000, '11.jpg', 1, 0, 0, 0),
(12, 'Máy Ảnh Canon PowerShot G7 X Mark II (hàng nhập khẩu)', 11990000, '12.jpg', 1, 0, 0, 0),
(13, 'Máy Ảnh Fujifilm X-A3 Kit XC16-50 F3.5-5.6 OIS II (Nâu)', 10390000, '13.jpg', 1, 0, 0, 0),
(14, 'Máy Ảnh Canon Ixus 185 (Đen)', 2350000, '14.jpg', 1, 0, 0, 0),
(15, 'Máy Ảnh Canon EOS 6D Kit EF 24-105 F4L IS USM ', 37090000, '15.jpg', 1, 0, 0, 0),
(16, 'Máy Ảnh Sony Cybershot DSC W830 (Đen)', 2550000, '16.jpg', 1, 0, 0, 0),
(17, 'Máy Ảnh Sony DSC WX220 (Đen)', 3600000, '17.jpg', 1, 0, 0, 0),
(18, 'Máy Ảnh Canon EOS 6D Body', 25650000, '18.jpg', 1, 0, 0, 0),
(19, 'Máy Ảnh Sony Alpha  A6300 (ILCE-6300L) KIT 16-50 F3.5-5.6 OSS (Đen)', 20490000, '19.jpg', 1, 0, 0, 0),
(20, 'Máy ảnh Nikon Coolpix B700', 8490000, '20.jpg', 1, 0, 0, 0),
(21, 'Máy ảnh Fujifilm FinePix XP120 (vàng)', 5090000, '21.jpg', 1, 0, 0, 0),
(22, 'Máy Ảnh Canon EOS 750D Body +  EF50MM F/1.8 STM', 13900000, '22.jpg', 1, 0, 0, 0),
(23, 'Máy Ảnh Canon Powershot SX620 HS (Đen)', 5290000, '23.jpg', 1, 0, 0, 0),
(24, 'Máy ảnh Canon IXUS 285 HS ', 4750000, '24.jpg', 1, 0, 0, 0),
(25, 'MÁY ẢNH SONY ALPHA A6500 (ILCE-6500) BODY', 27490000, '25.jpg', 1, 0, 0, 0),
(26, 'Máy Ảnh Fujifilm X-A3 Kit XC16-50mm F3.5-5.6 OIS II (Hồng)', 10390000, '26.jpg', 1, 0, 0, 0),
(27, 'MÁY ẢNH NIKON D5600 KIT AF-P 18-55 VR', 15900000, '27.jpg', 1, 0, 0, 0),
(28, 'Máy ảnh Canon IXUS 285 HS (Bạc)', 5390000, '28.jpg', 1, 0, 0, 0),
(29, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000) body + SEL50 F1.8 OSS', 15990000, '29.jpg', 1, 0, 0, 0),
(30, 'Máy Ảnh Canon Ixus 190 (Đen)', 3900000, '30.jpg', 1, 0, 0, 0),
(31, 'Máy ảnh Fujifilm X-A10 kit XC16-50MM F3.5-5.6 OIS II (Nâu)', 7990000, '31.jpg', 1, 0, 0, 0),
(32, 'Máy Ảnh Nikon D5500 kit AF-P 18-55 VR ', 14890000, '32.jpg', 1, 0, 0, 0),
(33, 'Máy Ảnh Canon EOS 6D Kit EF 24-105 F4L IS USM (hàng nhập khẩu)', 35190000, '33.jpg', 1, 0, 0, 0),
(34, 'Máy Ảnh Sony DSC WX220 (Vàng)', 3600000, '34.jpg', 1, 0, 0, 0),
(35, 'Máy Ảnh Nikon D7200 kit AF-S 18-140 ED VR (Hàng nhập khẩu)', 23000000, '35.jpg', 1, 0, 0, 0),
(36, 'Máy ảnh Nikon D750 Body', 34490000, '36.jpg', 1, 0, 0, 0),
(37, 'Máy Ảnh Sony DSC WX220 (Hồng)', 3600000, '37.jpg', 1, 0, 0, 0),
(38, 'Máy Ảnh Sony CyberShot DSC-WX500 (Đen)', 6639000, '38.jpg', 1, 0, 0, 0),
(39, 'Máy Ảnh Canon EOS 6D Body (Hàng nhập khẩu)', 23290000, '39.jpg', 1, 0, 0, 0),
(40, 'Máy Ảnh Nikon D5300 Kit AF-P18-55 VR', 12790000, '40.jpg', 1, 0, 0, 0),
(41, 'Máy ảnh Nikon D7200 Body (Hàng nhập khẩu)', 16990000, '41.jpg', 1, 0, 0, 0),
(42, 'Máy Ảnh Canon EOS 750D Body + Sigma 17-50 F/2.8 EX DC OS HSM', 17800000, '42.jpg', 1, 0, 0, 0),
(43, 'Máy Ảnh Sony Alpha A6500 (ILCE-6500) Kit 16-50 (Đen)', 30990000, '43.jpg', 1, 0, 0, 0),
(44, 'Hộp phim Fujifilm Instax Mini Glossy (20 tấm)', 320000, '44.jpg', 1, 0, 0, 0),
(45, 'Máy Ảnh Canon Ixus 185 (Đỏ)', 2350000, '45.jpg', 1, 0, 0, 0),
(46, 'Máy Ảnh Canon PowerShot G7 X Mark II ', 14800000, '46.jpg', 1, 0, 0, 0),
(47, 'Máy Ảnh Sony Alpha A6300 (ILCE-6300) Body (Đen)', 18490000, '47.jpg', 1, 0, 0, 0),
(48, 'Máy Ảnh Sony CyberShot DSC-WX500 (Đỏ)', 6639000, '48.jpg', 1, 0, 0, 0),
(49, 'MÁY ẢNH SONY CYBERSHOT W810 (Đen)', 2190000, '49.jpg', 1, 0, 0, 0),
(50, 'Máy ảnh Sony RX0 (Quay 4K, Chống nước IPX8)', 15490000, '50.jpg', 1, 0, 0, 0),
(51, ' Máy Ảnh Fujifilm X-A3 Body (Hồng)', 7290000, '51.jpg', 1, 0, 0, 0),
(52, 'Máy Ảnh Nikon D3400 Body ', 8290000, '52.jpg', 1, 0, 0, 0),
(53, 'Máy Ảnh Canon EOS 6D kit EF 24-105mm F3.5-5.6 IS STM', 32600000, '53.jpg', 1, 0, 0, 0),
(54, 'Máy Ảnh Canon EOS 80D Kit EF S18-55 IS STM ', 23500000, '54.jpg', 1, 0, 0, 0),
(55, 'Máy Ảnh Canon EOS 77D Body (Hàng nhập khẩu)', 16900000, '55.jpg', 1, 0, 0, 0),
(56, 'MÁY ẢNH SONY ALPHA A6000 (ILCE-6000) BODY (xám)', 10990000, '56.jpg', 1, 0, 0, 0),
(57, 'Máy ảnh Fujifilm FinePix XP120 (Đen viền xanh ngọc)', 5090000, '57.jpg', 1, 0, 0, 0),
(58, 'Máy Ảnh Canon EOS 750D Kit EF S18-135 IS USM ( Hàng nhập khẩu)', 19590000, '58.jpg', 1, 0, 0, 0),
(59, 'Máy Ảnh Fujifilm X-T2 Body (Đen)', 33900000, '59.jpg', 1, 0, 0, 0),
(60, 'Máy Ảnh Sony CyberShot DSC WX350 (Đen)', 5000000, '60.jpg', 1, 0, 0, 0),
(61, 'Máy Ảnh Canon EOS 80D kit EF-S 18-135mm f/3.5-5.6 IS USM - hàng nhập khẩu', 26490000, '61.jpg', 1, 0, 0, 0),
(62, 'MÁY ẢNH SONY ALPHA A6000 (ILCE-6000L) KIT 16-50 F3.5-5.6 OSS (Trắng)', 13490000, '62.jpg', 1, 0, 0, 0),
(63, 'MÁY ẢNH FUJIFILM X-T20 KIT XF18-55 F2.8-4 R LM OIS (Đen)', 25990000, '63.jpg', 1, 0, 0, 0),
(64, 'Máy Ảnh Canon EOS 5D Mark III Kit EF 24-105 F4L IS USM ', 57390000, '64.jpg', 1, 0, 0, 0),
(65, 'Máy Ảnh Fujifilm X-A3 Kit XF 27mm F2.8 (Nâu) ', 13900000, '65.jpg', 1, 0, 0, 0),
(66, 'Máy Ảnh Olympus OM-D E-M10 Mark II Kit 14-42mm f/3.5 -5.6 (Bạc)', 16900000, '66.jpg', 1, 0, 0, 0),
(67, 'Máy Ảnh Canon EOS 80D Body', 21500000, '67.jpg', 1, 0, 0, 0),
(68, 'Máy Ảnh Canon EOS 77D Kit 18-55 F/3.5-5.6 IS STM (Hàng nhập khẩu)', 18590000, '68.jpg', 1, 0, 0, 0),
(69, 'Máy ảnh Fujifilm FinePix XP120 (Xanh Dương)', 5090000, '69.jpg', 1, 0, 0, 0),
(70, 'Máy ảnh Fujifilm X-A5 Kit 15-45 mm F 3.5.5.6 OIS PZ( BẠC)', 13490000, '70.jpg', 1, 0, 0, 0),
(71, 'Máy Ảnh Nikon D5500 Body ', 13190000, '71.jpg', 1, 0, 0, 0),
(72, 'Máy ảnh Canon EOS M100 Kit 15-45mm F/3.5-6.3 IS STM (Đen)', 13490000, '72.jpg', 1, 0, 0, 0),
(73, 'Máy ảnh Fujifilm Instax Mini 90 Neo Classic (Nâu)', 3950000, '73.jpg', 1, 0, 0, 0),
(74, 'Máy Ảnh Canon EOS 80D Kit EF S18-55 IS STM (Hàng nhập khẩu)', 20900000, '74.jpg', 1, 0, 0, 0),
(75, 'Máy Ảnh Nikon D7200 kit AF-S 18-140 ED VR ', 24900000, '75.jpg', 1, 0, 0, 0),
(76, 'Máy Ảnh Canon EOS 200D', 12800000, '76.jpg', 1, 0, 0, 0),
(77, 'Máy Ảnh Canon EOS 6D Mark II Body', 41000000, '77.jpg', 1, 0, 0, 0),
(78, 'Máy Ảnh Fujifilm X-T20 Body (Bạc)', 18990000, '78.jpg', 1, 0, 0, 0),
(79, 'Máy ảnh Fujifilm instax WIDE 300', 2990000, '79.jpg', 1, 0, 0, 0),
(80, 'Máy ảnh Canon PowerShot SX730 HS (Đen)', 9000000, '80.jpg', 1, 0, 0, 0),
(81, 'Máy Ảnh Canon EOS 800D kit EF S18-55 IS STM (Hàng nhập khẩu)', 16990000, '81.jpg', 1, 0, 0, 0),
(82, 'MÁY ẢNH CANON EOS 200D KIT 18-55 IS STM (BẠC, HÀNG NHẬP KHẨU)', 14450000, '82.jpg', 1, 0, 0, 0),
(83, 'Máy Ảnh Canon PowerShot G3 X', 17090000, '83.jpg', 1, 0, 0, 0),
(84, 'Máy Ảnh Nikon D7200 kit AF-S 18-140 ED VR ', 24900000, '84.jpg', 1, 0, 0, 0),
(85, 'Máy ảnh Fujifilm X-A5 Kit 15-45 mm F 3.5.5.6 OIS PZ( BẠC)', 13490000, '85.jpg', 1, 0, 0, 0),
(86, 'Máy ảnh Fujifilm X-A5 Kit 15-45 mm F 3.5.5.6 OIS PZ (Nâu)', 13490000, '86.jpg', 1, 0, 0, 0),
(87, 'Máy Ảnh Canon EOS 800D kit EF S18-55 IS STM', 17290000, '87.jpg', 1, 0, 0, 0),
(88, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit SEL16-50 F3.5-5.6 OSS + SEL50 F1.8 OSS (bạc)', 18490000, '88.jpg', 1, 0, 0, 0),
(89, 'Máy Ảnh Nikon D5500 Body ', 13190000, '89.jpg', 1, 0, 0, 0),
(90, 'MÁY ẢNH CANON EOS 800D KIT EF S18-135 IS USM (hàng nhập khẩu)', 23290000, '90.jpg', 1, 0, 0, 0),
(91, 'Máy Ảnh Fujifilm X-A3 Kit XC16-50 OIS II + XC50-230 OIS II (Nâu) ', 15190000, '91.jpg', 1, 0, 0, 0),
(92, 'Máy Ảnh Canon EOS 80D Kit EF S18-55 IS STM (Hàng nhập khẩu)', 20900000, '92.jpg', 1, 0, 0, 0),
(93, 'Máy ảnh Nikon Coolpix W300 (Vàng)', 8690000, '93.jpg', 1, 0, 0, 0),
(94, 'Máy ảnh Canon EOS M100 Kit 15-45mm F/3.5-6.3 IS STM (Đen)', 13490000, '94.jpg', 1, 0, 0, 0),
(95, 'Máy Ảnh Nikon D7200 kit AF-P 18-55 VR ', 20490000, '95.jpg', 1, 0, 0, 0),
(96, 'Máy Ảnh Sony CyberShot DSC-RX1R II (RX1RM2)', 74900000, '96.jpg', 1, 0, 0, 0),
(97, 'Máy ảnh Canon EOS M6 kit 15-45MM F/3.5-6.3 IS STM (Đen)', 15800000, '97.jpg', 1, 0, 0, 0),
(98, 'MÁY ẢNH NIKON D5600 KIT AF-P 18-55 VR (Hàng nhập khẩu)', 14890000, '98.jpg', 1, 0, 0, 0),
(99, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit SEL16-50 F3.5-5.6 OSS + SEL55-210 F4.5-6.3 OSS (đen)', 20190000, '99.jpg', 1, 0, 0, 0),
(100, 'Máy ảnh Nikon D500 Body (Hàng nhập khẩu)', 36500000, '100.jpg', 1, 0, 0, 0),
(101, 'MÁY ẢNH FUJIFILM X-T2 KIT XF18-55mm+ XF35MM F2R (đen)', 51990000, '101.jpg', 1, 0, 0, 0),
(102, 'Máy ảnh Fujifilm instax mini 70 (Xanh)', 2850000, '102.jpg', 1, 0, 0, 0),
(103, 'Máy ảnh Canon EOS M6 Body (hàng nhập khẩu)', 12490000, '103.jpg', 1, 0, 0, 0),
(104, 'Máy Ảnh Sony Alpha A6300 (ILCE-6300) KIT FE 50mm F1.8 (SEL50F18F) (Bạc)', 24090000, '104.jpg', 1, 0, 0, 0),
(105, 'Máy Ảnh Nikon d7500 Kit AF-S DX NIKKOR 18-140 VR', 32900000, '105.jpg', 1, 0, 0, 0),
(106, 'MÁY ẢNH FUJIFILM INSTAX SQUARE SQ10 (trắng)', 6490000, '106.jpg', 1, 0, 0, 0),
(107, 'Máy ảnh Nikon D7200 Body ', 18500000, '107.jpg', 1, 0, 0, 0),
(108, 'MÁY ẢNH SONY ALPHA A6000 (ILCE-6000) BODY+ SIGMA 30MM F1.4 DC DN FOR SONY E (Bạc)', 16690000, '108.jpg', 1, 0, 0, 0),
(109, 'MÁY ẢNH SONY ALPHA A6000 (ILCE-6000) BODY+ SIGMA 30MM F1.4 DC DN FOR SONY E (Đen)', 16600000, '109.jpg', 1, 0, 0, 0),
(110, 'MÁY ẢNH FUJIFILM X-T20 KIT XC16-50MM + XF27MM F2.8 R ', 25490000, '110.jpg', 1, 0, 0, 0),
(111, 'Máy Ảnh Sony Alpha A7SM2 (LCE-7SM2/BQAP2) Body', 59900000, '111.jpg', 1, 0, 0, 0),
(112, 'Máy ảnh Sony DSC-RX10M3 (RX10 III)', 32290000, '112.jpg', 1, 0, 0, 0),
(113, 'Máy Ảnh Olympus PEN F Body (Bạc)', 28000000, '113.jpg', 1, 0, 0, 0),
(114, 'Máy ảnh Canon EOS 80D Body + Sigma 17-50 for Canon (Hàng nhập khẩu)', 25590000, '114.jpg', 1, 0, 0, 0),
(115, 'Máy ảnh Panasonic Lumix DMC-GF9 kit 12-32mm (Đen)', 8900000, '115.jpg', 1, 0, 0, 0),
(116, 'Máy ảnh Fujifilm instax mini 70 (Vàng)', 2850000, '116.jpg', 1, 0, 0, 0),
(117, 'MÁY ẢNH FUJIFILM X-T20 KIT XC16-50MM + XF18MM F2 R', 27390000, '117.jpg', 1, 0, 0, 0),
(118, 'Máy Ảnh Canon EOS 77D Body', 20400000, '118.jpg', 1, 0, 0, 0),
(119, 'Máy Ảnh Chuyên Nghiệp Nikon Df Body', 51900000, '119.jpg', 1, 0, 0, 0),
(120, 'Máy Ảnh Canon EOS 5DS Body + EF 24-105 F4L IS USM', 67500000, '120.jpg', 1, 0, 0, 0),
(121, 'MÁY ẢNH FUJIFILM X-T20 KIT XF18-55 F2.8-4 R LM OIS (Bạc)', 25990000, '121.jpg', 1, 0, 0, 0),
(122, 'MÁY ẢNH CANON EOS 1500D KIT 18-55MM F3.5-5.6 IS II', 12990000, '122.jpg', 1, 0, 0, 0),
(123, 'Máy Ảnh Olympus OM-D E-M10 Mark II Kit 14-42mm f/3.5 -5.6 (Đen)', 15500000, '123.jpg', 1, 0, 0, 0),
(124, 'Máy ảnh Sony A7M2K Kit 28-70mm (ILCE-7M2K) + FE 85mm f/1.8', 46290000, '124.jpg', 1, 0, 0, 0),
(125, 'Máy ảnh Panasonic Lumix GH5', 42900000, '125.jpg', 1, 0, 0, 0),
(126, 'Máy Ảnh Fujifilm X-Pro2 Body (Đen)', 36990000, '126.jpg', 1, 0, 0, 0),
(127, 'Hộp phim Fujifilm Instax Mini Glossy (10 tấm)', 165000, '127.jpg', 1, 0, 0, 0),
(128, 'Máy Ảnh Olympus PEN E-PL8 Kit 14-42mm f/3.5-5.6 EZ (Nâu)', 14090000, '128.jpg', 1, 0, 0, 0),
(129, 'MÁY ẢNH CANON EOS M6 KIT 18-150MM (HÀNG NHẬP KHẨU)', 21490000, '129.jpg', 1, 0, 0, 0),
(130, 'Máy ảnh Nikon D500 Kit AF-S DX NIKKOR 16-80mm F2.8-4E ED VR ', 53700000, '130.jpg', 1, 0, 0, 0),
(131, ' Máy ảnh Sony A7M2 (ILCE-7M2) Body + FE 85mm f/1.8', 40790000, '131.jpg', 1, 0, 0, 0),
(132, 'MÁY ẢNH FUJIFILM X-T2 kit XF18-55mm+ XF23MM F2R (đen)', 51990000, '132.jpg', 1, 0, 0, 0),
(133, 'Máy ảnh Nikon D7200 Body ', 18500000, '133.jpg', 1, 0, 0, 0),
(134, 'MÁY ẢNH NIKON D7500 BODY', 26800000, '134.jpg', 1, 0, 0, 0),
(135, 'Máy ảnh Canon EOS 5D Mark IV', 72500000, '135.jpg', 1, 0, 0, 0),
(136, 'Máy ảnh Nikon D7200 Body + Sigma 17-50 F2.8 (Hàng nhập khẩu)', 23590000, '136.jpg', 1, 0, 0, 0),
(137, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000) body + SEL50 F1.8 OSS (Bạc)', 15990000, '137.jpg', 1, 0, 0, 0),
(138, 'MÁY ẢNH FUJIFILM X-T20 KIT XF18-55 F2.8-4 R LM OIS (Bạc)', 25990000, '138.jpg', 1, 0, 0, 0),
(139, 'Máy Ảnh Canon EOS 3000D Kit 18-55mm F3.5-5.6 III (Hàng nhập khẩu)', 9000000, '139.jpg', 1, 0, 0, 0),
(140, 'Máy ảnh Fujifilm instax mini 9 (Xanh lá cây)', 1990000, '140.jpg', 1, 0, 0, 0),
(141, 'Máy ảnh Nikon D500 body Limited Edition (phiên bản đặt biệt kỷ niệm 100 năm)', 46000000, '141.jpg', 1, 0, 0, 0),
(142, 'Máy ảnh Canon EOS 5D Mark IV', 72500000, '142.jpg', 1, 0, 0, 0),
(143, ' Máy Ảnh Sony Alpha A6000 (ILCE-6000) Body + SEL35 F1.8 OSS (bạc)', 18690000, '143.jpg', 1, 0, 0, 0),
(144, 'Máy Ảnh Sony Alpha A6000 (ILCE-6000L) kit SEL16-50 F3.5-5.6 OSS + SEL50 F1.8 OSS (Đen)', 18490000, '144.jpg', 1, 0, 0, 0),
(145, 'Máy Ảnh Pentax K-3 II Silver Edition (Body) ', 20790000, '145.jpg', 1, 0, 0, 0),
(146, 'Máy ảnh Sony A7M2K Kit 28-70mm (ILCE-7M2K) + FE 85mm f/1.8', 46290000, '146.jpg', 1, 0, 0, 0),
(147, 'Máy ảnh Nikon D5 Body', 122000000, '147.jpg', 1, 0, 0, 0),
(148, 'Máy ảnh Nikon D5600 Body + Sigma 17-50 F2.8 (Hàng nhập khẩu)', 20000000, '148.jpg', 1, 0, 0, 0),
(149, 'Máy ảnh Fujifilm X-T20 KIT XC16-50 F3.5-5.6 OIS II (Đen)', 21990000, '149.jpg', 1, 0, 0, 0),
(150, 'Máy ảnh Nikon Coolpix A900 (Bạc)', 9200000, '150.jpg', 1, 0, 0, 0),
(151, 'Máy ảnh Fujifilm X-A5 Kit 15-45 mm F 3.5.5.6 OIS PZ( Hồng)', 13490000, '151.jpg', 1, 0, 0, 0),
(152, 'Máy Ảnh Canon EOS 80D kit EF-S 18-135mm f/3.5-5.6 IS USM ', 30490000, '152.jpg', 1, 0, 0, 0),
(153, 'Máy ảnh Canon EOS M6 Body (hàng nhập khẩu)', 12490000, '153.jpg', 1, 0, 0, 0),
(154, 'MÁY ẢNH PANASONIC LUMIX DMC-GF9 KIT 12-32MM (HỒNG)', 8900000, '154.jpg', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `nha_cung_cap`
--

DROP TABLE IF EXISTS `nha_cung_cap`;
CREATE TABLE IF NOT EXISTS `nha_cung_cap` (
  `ma_ncc` int(10) NOT NULL,
  `ten_ncc` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dia_chi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sdt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ma_ncc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nha_cung_cap`
--

INSERT INTO `nha_cung_cap` (`ma_ncc`, `ten_ncc`, `dia_chi`, `sdt`) VALUES
(1, 'Bình Minh Digital', '110 Điện Biên Phủ, Phường Đa Kao, Quận 1, TP.Hồ Chí Minh', '0902797066'),
(2, 'Nguyễn Kim', 'https://www.nguyenkim.com/may-anh-ky-thuat-so/', '19006612'),
(3, 'Vũ Nhật Camera', '20B Tràng Thi, Hoàn Kiếm, Hà Nội.', '+84 24 3826 5161'),
(4, 'Giang Duy Đạt Photo Camera', '50/2 Trương Hán Siêu, Quận 1, Tp HCM', '0904551862');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ct_don_dat_hang`
--
ALTER TABLE `ct_don_dat_hang`
  ADD CONSTRAINT `ct_don_dat_hang_ibfk_1` FOREIGN KEY (`ma_ddh`) REFERENCES `don_dat_hang` (`ma_ddh`),
  ADD CONSTRAINT `ct_don_dat_hang_ibfk_2` FOREIGN KEY (`ma_may_anh`) REFERENCES `may_anh` (`ma_may_anh`);

--
-- Constraints for table `ct_hoa_don`
--
ALTER TABLE `ct_hoa_don`
  ADD CONSTRAINT `ct_hoa_don_ibfk_1` FOREIGN KEY (`ma_hd`) REFERENCES `hoa_don` (`ma_hd`),
  ADD CONSTRAINT `ct_hoa_don_ibfk_2` FOREIGN KEY (`ma_may_anh`) REFERENCES `may_anh` (`ma_may_anh`);

--
-- Constraints for table `cung_ung`
--
ALTER TABLE `cung_ung`
  ADD CONSTRAINT `cung_ung_ibfk_1` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`),
  ADD CONSTRAINT `cung_ung_ibfk_2` FOREIGN KEY (`ma_may_anh`) REFERENCES `may_anh` (`ma_may_anh`);

--
-- Constraints for table `don_dat_hang`
--
ALTER TABLE `don_dat_hang`
  ADD CONSTRAINT `don_dat_hang_ibfk_1` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`),
  ADD CONSTRAINT `don_dat_hang_ibfk_2` FOREIGN KEY (`ma_kh`) REFERENCES `khach_hang` (`ma_kh`);

--
-- Constraints for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`ma_kh`) REFERENCES `khach_hang` (`ma_kh`);

--
-- Constraints for table `loai_may_anh`
--
ALTER TABLE `loai_may_anh`
  ADD CONSTRAINT `loai_may_anh_ibfk_2` FOREIGN KEY (`ma_may_anh`) REFERENCES `may_anh` (`ma_may_anh`),
  ADD CONSTRAINT `loai_may_anh_ibfk_3` FOREIGN KEY (`ma_loai`) REFERENCES `loai` (`ma_loai`);

--
-- Constraints for table `may_anh`
--
ALTER TABLE `may_anh`
  ADD CONSTRAINT `may_anh_ibfk_1` FOREIGN KEY (`ma_ncc`) REFERENCES `nha_cung_cap` (`ma_ncc`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
