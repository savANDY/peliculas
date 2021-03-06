-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2017 a las 12:35:36
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `peliculas`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actores_con_peliculas` ()  NO SQL
BEGIN
SELECT directores.Nombre,
GROUP_CONCAT(DISTINCT  peliculas.titulo) as peliculas
FROM peliculas JOIN directores ON peliculas.idDirector = directores.idDirector 
GROUP BY directores.idDirector;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actores_con_sin_peliculas` ()  NO SQL
BEGIN
SELECT a.Nombre, GROUP_CONCAT(DISTINCT p.Titulo) 
FROM peliculas p INNER JOIN actuaciones ac ON ac.idPelicula=p.idPelicula 
RIGHT JOIN actores a ON ac.idActor=a.idActor 
GROUP BY a.idActor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actores_cuantas_peliculas` ()  NO SQL
BEGIN
SELECT a.idActor, a.Nombre, COUNT(DISTINCT p.Titulo) cant_pelis
FROM peliculas p INNER JOIN actuaciones ac ON ac.idPelicula=p.idPelicula 
RIGHT JOIN actores a ON ac.idActor=a.idActor 
GROUP BY a.idActor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_pelicula` (IN `p_idPelicula` INT)  NO SQL
BEGIN
SELECT titulo FROM peliculas where idPelicula = p_idPelicula;
DELETE FROM peliculas WHERE idPelicula = p_idPelicula;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_actor` (IN `p_nombre` VARCHAR(40))  NO SQL
INSERT INTO actores(nombre) VALUES (p_nombre)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_actor_pelicula` (IN `p_idPelicula` INT, IN `p_idActor` INT)  NO SQL
BEGIN


IF EXISTS (SELECT idPelicula FROM peliculas WHERE idPelicula = p_idPelicula)THEN
       
       IF EXISTS (SELECT idActor FROM actores WHERE idActor = p_idActor)THEN
        
            INSERT INTO actuaciones(idActor, idPelicula) VALUES 				(p_idActor, p_idPelicula);
            ELSE SELECT 'No existe ese actor';   
            END IF;
ELSE SELECT 'No existe esa pelicula';
END IF;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_actuacion` (IN `p_idActor` INT, IN `p_esProtagonista` BOOLEAN)  NO SQL
BEGIN
DECLARE sel_idPelicula int;
set sel_idPelicula = (SELECT MAX(idPelicula) from peliculas);

INSERT INTO actuaciones(idActor, idPelicula, esProtagonista) VALUES 			(p_idActor, sel_idPelicula, p_esProtagonista);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_director` (IN `p_nombre` VARCHAR(40))  NO SQL
INSERT INTO directores(Nombre) VALUES (p_nombre)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_pelicula` (IN `p_titulo` VARCHAR(40), IN `p_anyo` YEAR(4), IN `p_director` INT, IN `p_cartel` VARCHAR(200))  NO SQL
BEGIN

INSERT INTO peliculas(titulo, anyo, idDirector, cartel) VALUES 			(p_titulo, p_anyo, p_director, p_cartel);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_pelicula` (IN `p_idPelicula` INT, IN `p_titulo` VARCHAR(40), IN `p_anyo` YEAR(4), IN `p_director` INT, IN `p_cartel` VARCHAR(200))  NO SQL
BEGIN

UPDATE `peliculas` SET `titulo`=p_titulo,`anyo`=p_anyo,`idDirector`=p_director,`cartel`=p_cartel  WHERE `idPelicula`= p_idPelicula;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_con_actores_v1` ()  NO SQL
BEGIN
select peliculas.titulo TituloPelicula,actores.nombre NombreActor
from actuaciones
inner join actores on actuaciones.idActor=actores.idActor
inner join peliculas on actuaciones.idPelicula=peliculas.idPelicula;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_con_actores_v2` ()  NO SQL
BEGIN
select peliculas.titulo TituloPelicula,GROUP_CONCAT(actores.nombre)
from actuaciones
inner join actores on actuaciones.idActor=actores.idActor
inner join peliculas on actuaciones.idPelicula=peliculas.idPelicula
GROUP BY peliculas.titulo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_con_director` ()  NO SQL
BEGIN
SELECT p.idPelicula, p.titulo, p.anyo Año, d.Nombre Director, p.cartel
FROM peliculas p, directores d
WHERE p.idDirector = d.idDirector
;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_con_director_y_actores` ()  NO SQL
BEGIN
select peliculas.idPelicula, peliculas.titulo TituloPelicula, peliculas.anyo Año, directores.idDirector, GROUP_CONCAT(actores.nombre)
from actuaciones
right join actores on actuaciones.idActor=actores.idActor
right join peliculas on actuaciones.idPelicula=peliculas.idPelicula
right join directores on peliculas.idDirector=directores.idDirector
GROUP BY peliculas.titulo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_con_protagonistas` ()  NO SQL
BEGIN
select peliculas.idPelicula, peliculas.titulo TituloPelicula,GROUP_CONCAT(actores.nombre) Protagonistas
from actuaciones
inner join actores on actuaciones.idActor=actores.idActor
inner join peliculas on actuaciones.idPelicula=peliculas.idPelicula
WHERE actuaciones.esProtagonista = 1
GROUP BY peliculas.titulo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `peliculas_posteriores_2000` ()  NO SQL
BEGIN
SELECT * FROM peliculas WHERE anyo > 2000;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pelicula_por_id` (IN `p_idPelicula` INT)  NO SQL
BEGIN
select p.idPelicula, p.titulo, p.anyo Año, p.idDirector, d.Nombre Director, p.cartel, GROUP_CONCAT(a.nombre separator '<br>') Actores
from peliculas p

left join actuaciones act on act.idPelicula=p.idPelicula
left join actores a on act.idActor=a.idActor
left join directores d on p.idDirector = d.idDirector
WHERE (p.idPelicula = p_idPelicula)
GROUP BY p.titulo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

CREATE TABLE `actores` (
  `idActor` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actores`
--

INSERT INTO `actores` (`idActor`, `nombre`) VALUES
(1, 'Julen Estivez'),
(2, 'Valeriu Andrei Sanautanu'),
(3, 'Jon Ander Valdivieso'),
(4, 'Gorka Cañon'),
(5, 'Jenifer Lopez'),
(6, 'Indar Gonzales'),
(7, 'Iker Larrea'),
(8, 'Gabi Leu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actuaciones`
--

CREATE TABLE `actuaciones` (
  `idActor` int(11) NOT NULL,
  `idPelicula` int(11) NOT NULL,
  `esProtagonista` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actuaciones`
--

INSERT INTO `actuaciones` (`idActor`, `idPelicula`, `esProtagonista`) VALUES
(1, 1, 0),
(1, 26, 1),
(2, 1, 0),
(2, 26, 0),
(3, 1, 1),
(3, 26, 0),
(4, 1, 0),
(5, 1, 0),
(6, 1, 0),
(7, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directores`
--

CREATE TABLE `directores` (
  `idDirector` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `directores`
--

INSERT INTO `directores` (`idDirector`, `Nombre`) VALUES
(1, 'Flavian Ilici'),
(2, 'Rafael Ilici'),
(3, 'Andoni Tome'),
(4, 'Iker Iluntza'),
(5, 'Hodei Baranda'),
(6, 'Theodor Pavlenco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `idPelicula` int(11) NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `anyo` year(4) NOT NULL,
  `idDirector` int(11) DEFAULT NULL,
  `cartel` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`idPelicula`, `titulo`, `anyo`, `idDirector`, `cartel`) VALUES
(1, 'Los 16 pesados de clase', 2016, 5, 'http://es.web.img2.acsta.net/r_1280_720/pictures/210/127/21012757_20130616001705563.jpg'),
(16, 'Feliz día de tu muerte', 2016, 6, 'https://demoalto-impresionesaerea.netdna-ssl.com/2017/10/Feliz-dia-de-tu-muerte-poster.jpg'),
(17, 'Paddington 2', 2017, 6, 'https://filasiete.com/wp-content/uploads/2017/11/95369.jpg'),
(18, 'Toy Story', 2017, 1, 'https://1.bp.blogspot.com/-4CEJ24flM5U/T-ePLTwLdyI/AAAAAAAAHcQ/GGYVN8SVxG0/s275/toy-story-1995.jpg'),
(20, 'Deep', 2017, 1, 'https://ccbuenavistasantamarta.com/wp-content/uploads/2017/11/deep.jpg.pagespeed.ce.IfUqqVN6NK.jpg'),
(21, 'PALMERAS EN LA NIEVE', 2015, 3, 'https://imagessl8.casadellibro.com/a/l/t0/38/9788499985138.jpg'),
(22, '', 2009, 1, 'http://4.bp.blogspot.com/-AW6fFVemtro/UcIVsXqah1I/AAAAAAAAABY/pikV48uCK3k/s1600/la-huerfana_portada.jpg'),
(23, 'YO ANTES DE TI', 2014, 5, 'http://www.canalfreak.net/wp-content/uploads/2016/05/531x803xunnamed-3_phixr.jpg.pagespeed.ic.JRI_dUMmec.jpg'),
(24, 'OBLIVION', 2013, 4, 'https://revientaguiones.files.wordpress.com/2013/07/caratula-portada-de-la-pelicula-oblivion-de-tom-cruise.jpg'),
(25, 'Intocable', 2011, 6, 'http://todossomosuno.com.mx/portal/wp-content/uploads/2013/08/portada-intocable.jpg'),
(26, 'Titanic', 1996, 2, 'http://especiales.eluniverso.com/titanic/wp-content/uploads/2012/04/Titanic-pelicula-de-television-1996.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `password`) VALUES
(1, 'savandy', 'gogo'),
(2, 'jestivez', '1234');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vpeliculasactores`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vpeliculasactores` (
`idPelicula` int(11)
,`TituloPelicula` varchar(40)
,`GROUP_CONCAT(actores.nombre)` text
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vpelículasdirector`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vpelículasdirector` (
`idPelicula` int(11)
,`TituloPelicula` varchar(40)
,`Año` year(4)
,`Director` varchar(40)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vpeliculasactores`
--
DROP TABLE IF EXISTS `vpeliculasactores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vpeliculasactores`  AS  select `idPelicula` AS `idPelicula`,`titulo` AS `TituloPelicula`,group_concat(`actores`.`nombre` separator ',') AS `GROUP_CONCAT(actores.nombre)` from (`peliculas` left join (`actuaciones` left join `actores` on((`actuaciones`.`idActor` = `actores`.`idActor`))) on((`actuaciones`.`idPelicula` = `idPelicula`))) group by `titulo` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vpelículasdirector`
--
DROP TABLE IF EXISTS `vpelículasdirector`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vpelículasdirector`  AS  select `p`.`idPelicula` AS `idPelicula`,`p`.`titulo` AS `TituloPelicula`,`p`.`anyo` AS `Año`,`d`.`Nombre` AS `Director` from (`peliculas` `p` join `directores` `d`) where (`p`.`idDirector` = `d`.`idDirector`) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actores`
--
ALTER TABLE `actores`
  ADD PRIMARY KEY (`idActor`);

--
-- Indices de la tabla `actuaciones`
--
ALTER TABLE `actuaciones`
  ADD PRIMARY KEY (`idActor`,`idPelicula`),
  ADD KEY `idActor` (`idActor`),
  ADD KEY `idPelicula` (`idPelicula`);

--
-- Indices de la tabla `directores`
--
ALTER TABLE `directores`
  ADD PRIMARY KEY (`idDirector`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`idPelicula`),
  ADD KEY `idDirector` (`idDirector`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actores`
--
ALTER TABLE `actores`
  MODIFY `idActor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `directores`
--
ALTER TABLE `directores`
  MODIFY `idDirector` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `idPelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actuaciones`
--
ALTER TABLE `actuaciones`
  ADD CONSTRAINT `actuaciones_ibfk_1` FOREIGN KEY (`idActor`) REFERENCES `actores` (`idActor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `actuaciones_ibfk_2` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD CONSTRAINT `peliculas_ibfk_1` FOREIGN KEY (`idDirector`) REFERENCES `directores` (`idDirector`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
