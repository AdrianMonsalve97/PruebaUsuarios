# Prueba Usuarios

![GitHub](https://img.shields.io/github/license/AdrianMonsalve97/prueba-usuarios)
![GitHub last commit](https://img.shields.io/github/last-commit/AdrianMonsalve97/prueba-usuarios)
![GitHub stars](https://img.shields.io/github/stars/AdrianMonsalve97/prueba-usuarios?style=social)

Descripción breve del proyecto.

## Tabla de contenidos

- [Prueba Usuarios](#prueba-usuarios)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)
  - [Configuración de la base de datos](#configuración-de-la-base-de-datos)

## Instalación

1. Clona el repositorio: `git clone https://github.com/AdrianMonsalve97/prueba-usuarios.git`
2. Ingresa a la carpeta del proyecto: `cd prueba-usuarios`
3. Instala las dependencias: `npm install`

## Uso

Para utilizar este proyecto, sigue los siguientes pasos:

1. Ejecuta el servidor: `npm start`
2. Abre tu navegador y visita `http://localhost:3000`

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tus cambios: `git checkout -b mi-feature`
3. Haz tus cambios y commitea: `git commit -m "Agrega una nueva característica"`
4. Sube tus cambios: `git push origin mi-feature`
5. Abre un Pull Request en GitHub

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Configuración de la base de datos

Este proyecto utiliza una base de datos llamada "pruebauser". Puedes utilizar Docker para ejecutar la base de datos en local siguiendo estos pasos:

1. Asegúrate de tener Docker instalado en tu máquina.
2. Abre una terminal y ejecuta el siguiente comando para crear un contenedor de MySQL:

   ```bash
   docker run -d -p 3306:3306 --name pruebauser -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=pruebauser mysql:latest
   Una vez que el contenedor esté en ejecución, puedes conectarte a la base de datos utilizando el usuario "root" y la contraseña "password".
   Ahora puedes ejecutar el servidor Node.js y probar la aplicación en local.
