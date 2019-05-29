-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2019 a las 20:19:25
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.3.5

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
  `id` int(11) NOT NULL,
  `IdOrigen` int(11) NOT NULL,
  `IdDestino` int(11) NOT NULL,
  `estado` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `amistad`
--

INSERT INTO `amistad` (`id`, `IdOrigen`, `IdDestino`, `estado`) VALUES
(0, 8, 9, 'aceptado'),
(0, 8, 12, 'pendiente'),
(0, 10, 8, 'aceptado'),
(0, 13, 8, 'pendiente');

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
('tUvDNxkdXeep3P3_59uHUfMPKBkf6kAi', 1559240312, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"idUser\":13}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int(9) NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `img` blob,
  `points` int(9) DEFAULT '0',
  `activo` tinyint(1) DEFAULT '1',
  `gender` varchar(3) DEFAULT NULL,
  `birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `UserName`, `email`, `password`, `img`, `points`, `activo`, `gender`, `birth`) VALUES
(8, 'neku', 'neku@loko.es', '1', NULL, 0, 1, 'fem', '1997-06-24'),
(9, 'pont', 'pont@loko.es', '1', NULL, 1, 1, 'mal', '1990-02-15'),
(10, 'caca', 'caca@caca.se', '1', NULL, 0, 1, 'mal', '1990-02-15'),
(12, 'nuevo usuario', 'pino@loko.es', '1', NULL, 8, 1, 'fem', '2000-01-01'),
(13, 'fefi', 'fefi@loko.es', '1', NULL, 0, 1, 'oth', '1988-02-28'),
(14, 'leila', 'leila@loko.es', '1', NULL, 0, 1, 'oth', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD PRIMARY KEY (`id`,`IdOrigen`,`IdDestino`),
  ADD KEY `IdOrigen` (`IdOrigen`),
  ADD KEY `IdDestino` (`IdDestino`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD CONSTRAINT `amistad_ibfk_1` FOREIGN KEY (`IdOrigen`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `amistad_ibfk_2` FOREIGN KEY (`IdDestino`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
