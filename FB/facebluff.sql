-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-12-2018 a las 22:07:39
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
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(10) NOT NULL,
  `texto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `texto`) VALUES
(1, '¿En que año fue 1 + 1?'),
(2, '¿Tu eres mas de ASCII o de ASCII?'),
(3, '¿Qué llevas puesto?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idRespuesta` int(10) NOT NULL,
  `idPregunta` int(10) NOT NULL,
  `Texto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`idRespuesta`, `idPregunta`, `Texto`) VALUES
(1, 1, 'el fantástico Ralph'),
(2, 1, 'al menos dos'),
(3, 2, 'De ASCII'),
(4, 2, 'de ascii, por supuesto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestausuario`
--

CREATE TABLE `respuestausuario` (
  `idPregunta` int(10) NOT NULL,
  `idRespuesta` int(10) NOT NULL,
  `usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestausuario`
--

INSERT INTO `respuestausuario` (`idPregunta`, `idRespuesta`, `usuario`) VALUES
(1, 1, 'pont@loco.es'),
(1, 2, 'neku@ascii.com'),
(2, 1, 'neku@ascii.com');

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
('P765HTmbdQbWjtpsTG6crzPJeeNYRDAd', 1544467553, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"pont\",\"email\":\"pont@loco.es\",\"img\":\"diploascii.jpg\",\"nacimiento\":\"\",\"sexo\":\"\",\"puntos\":0}'),
('ZrO9gMl3sR1mavf3a1I2SMynGr12waju', 1544465690, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"pont\",\"email\":\"pont@loco.es\",\"img\":\"diploascii.jpg\",\"nacimiento\":\"\",\"sexo\":\"\",\"puntos\":0,\"amigos\":[{\"userName\":\"nerea\",\"estado\":\"amigo\"},{\"userName\":\"Yago\",\"estado\":\"amigo\"}],\"solicitudes\":[{\"userName\":\"Pascal\",\"estado\":\"solicitud\"}]}');

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
('Noel@ascii.com', 'caca', NULL, 'Noel', 'hombre', '19890615', 0),
('pascal@ascii.com', 'pascal', NULL, 'Pascal', '', '', 0),
('pont@loco.es', 'kaka', 'diploascii.jpg', 'pont', '', '', 0),
('yago@ascii.com', 'yago', NULL, 'Yago', '', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD PRIMARY KEY (`Amigado`,`Amigador`),
  ADD KEY `Amigador` (`Amigador`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`idRespuesta`,`idPregunta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `respuestausuario`
--
ALTER TABLE `respuestausuario`
  ADD PRIMARY KEY (`idPregunta`,`idRespuesta`,`usuario`),
  ADD KEY `idRespuesta` (`idRespuesta`),
  ADD KEY `usuario` (`usuario`);

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

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD CONSTRAINT `amistad_ibfk_1` FOREIGN KEY (`Amigado`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `amistad_ibfk_2` FOREIGN KEY (`Amigador`) REFERENCES `users` (`email`);

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`);

--
-- Filtros para la tabla `respuestausuario`
--
ALTER TABLE `respuestausuario`
  ADD CONSTRAINT `respuestausuario_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`),
  ADD CONSTRAINT `respuestausuario_ibfk_2` FOREIGN KEY (`idRespuesta`) REFERENCES `respuestas` (`idRespuesta`),
  ADD CONSTRAINT `respuestausuario_ibfk_3` FOREIGN KEY (`usuario`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
