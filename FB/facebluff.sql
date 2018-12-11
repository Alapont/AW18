-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2018 a las 17:01:13
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

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
('EO8WNONKIreBCgt18H4Mr3ublFegxkfq', 1544563796, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flashMsg\":[{\"location\":\"body\",\"param\":\"user\",\"msg\":\"El email no puede estar vacío\",\"value\":\"\"},{\"location\":\"body\",\"param\":\"password\",\"msg\":\"La contraseña no puede estar vacía\",\"value\":\"\"},{\"location\":\"body\",\"param\":\"userName\",\"msg\":\"El nombre de usuario no puede estar vacío\",\"value\":\"\"}]}'),
('G4IVSrIE2heJ4I9D11OqlKhFXhhoFUpd', 1544605914, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"pont\",\"email\":\"pont@loco.es\",\"img\":\"diploascii.jpg\",\"nacimiento\":\"\",\"sexo\":\"\",\"puntos\":0}'),
('MN3yR7iMnTJNCFRcMx2RofmGfi-q1A37', 1544602743, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"pont\",\"email\":\"pont@loco.es\",\"img\":\"diploascii.jpg\",\"nacimiento\":\"\",\"sexo\":\"\",\"puntos\":0,\"amigos\":[{\"userName\":\"nerea\",\"estado\":\"amigo\",\"img\":\"gato.jpg\",\"email\":\"neku@ascii.com\"},{\"userName\":\"Yago\",\"estado\":\"amigo\",\"img\":null,\"email\":\"yago@ascii.com\"}],\"solicitudes\":[{\"userName\":\"Pascal\",\"estado\":\"solicitud\",\"img\":null,\"email\":\"pascal@ascii.com\"}]}'),
('MtUUoUedOq2wFYZjsCeemUtbIBd2iKN0', 1544630319, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"PontMola\",\"email\":\"pont@loco.es\",\"img\":\"\",\"nacimiento\":\"\",\"sexo\":\"male\",\"puntos\":0,\"amigos\":[{\"userName\":\"nerea\",\"estado\":\"amigo\",\"img\":\"gato.jpg\",\"email\":\"neku@ascii.com\"},{\"userName\":\"Yago\",\"estado\":\"amigo\",\"img\":null,\"email\":\"yago@ascii.com\"}],\"solicitudes\":[{\"userName\":\"Pascal\",\"estado\":\"solicitud\",\"img\":null,\"email\":\"pascal@ascii.com\"}]}'),
('Y7VYVjLlbZYVxBK3NnDMWAatNorIhAcs', 1544602688, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"error\":\"usuario no encontrado\",\"userName\":\"pont\",\"email\":\"pont@loco.es\",\"img\":\"diploascii.jpg\",\"nacimiento\":\"\",\"sexo\":\"\",\"puntos\":0}'),
('or39YzJu8AAT8Sy_q5mKfWmQsilW_Z_b', 1544605974, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"PontMola\",\"email\":\"pont@loco.es\",\"img\":\"\",\"nacimiento\":\"\",\"sexo\":\"male\",\"puntos\":0}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` blob,
  `userName` varchar(100) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `nacimiento` varchar(10) NOT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `password`, `img`, `userName`, `sexo`, `nacimiento`, `puntos`) VALUES
('neku@ascii.com', 'caraculo', 0x6761746f2e6a7067, 'nerea', '', '', 0),
('Noel@ascii.com', 'caca', NULL, 'Noel', 'hombre', '19890615', 0),
('pascal@ascii.com', 'pascal', NULL, 'Pascal', '', '', 0),
('pont@loco.es', 'kaka', '', 'PontMola', 'male', '', 0),
('prueba@lolo.com', 'a', '', 'yolo', 'other', '2000-12-06', 0),
('yago@ascii.com', 'yago', NULL, 'Yago', '', '', 0);

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

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
