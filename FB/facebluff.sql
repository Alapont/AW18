-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2018 a las 00:27:47
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facebluff`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistad`
--

CREATE TABLE `amistad` (
  `Amigado` varchar(100) NOT NULL,
  `Amigador` varchar(100) NOT NULL,
  `Estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `amistad`
--

INSERT INTO `amistad` (`Amigado`, `Amigador`, `Estado`) VALUES
('neku@ascii.com', 'pont@loco.es', 'amigo'),
('pascal@ascii.com', 'pont@loco.es', 'solicitud'),
('pont@loco.es', 'yago@ascii.com', 'amigo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('CopaiGKnoBe5VjxY7RWbKMKdxWLV9Y_P', 1544296888, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `userName` varchar(100) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `nacimiento` varchar(10) NOT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `password`, `img`, `userName`, `sexo`, `nacimiento`, `puntos`) VALUES
('neku@ascii.com', 'caraculo', 'gato.jpg', 'nerea', '', '', 0),
('pont@loco.es', 'kaka', 'diploascii.jpg', 'pont', '', '', 0),
('pascal@ascii.com', 'pascal', NULL, 'Pascal', '', '', 0),
('yago@ascii.com', 'yago', NULL, 'Yago', '', '', 0),
('Noel@ascii.com', 'caca', NULL, 'Noel', 'hombre', '19890615', 0),
('alapont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0),
('Pont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0),
('Pont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0),
('Pont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0),
('Pont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0),
('Pont@ascii.es', 'a', NULL, 'pont', 'Hombre', '19900215', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD PRIMARY KEY (`Amigado`,`Amigador`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
