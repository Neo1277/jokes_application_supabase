# Aplicación para obtener chistes de Chuck Norris API (Django, ReactJS, Supabase) #

Aplicación para obtener los chistes de la API de Chuck Norris y guardar los chistes favoritos en la base de datos supabase con autenticación de usuario.

## Lenguajes de programación (frameworks, librerias) ##
*   Django (Django rest framework, JSON, serializacion.
*   Reactjs (HTML, CSS, reactstrap, react redux, react route, JSON)

## Base de datos ##
*   Supabase

## Instalación  ##
*   Primero, clonar el repositorio en la carpeta donde desea guardar los archivos: 
```
git clone https://github.com/Neo1277/jokes_application_supabase.git
``` 
*   Crear una base de datos en supabase llamada my_jokes, con las siguientes columnas:
```
icon_url: (text)
joke_id: (varchar)
url: (text)
value: (text)
user_id: uuid
``` 
*   También se debe crear un archivo .env en el directorio /backend_django con las siguientes variables:
```
DEBUG=True
SECRET_KEY=django-insecure-$nbsnagx0*0w0k_7o@$rt83#3@v%7u=_iu3=y7cd_o-aanydg$
DATABASE_HOST=localhost
DATABASE_ENGINE=django.db.backends.mysql
DATABASE_PORT=3306
DATABASE_NAME=posts
DATABASE_PASSWORD=
DATABASE_USER=root
SUPABASE_URL=your-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
SERVICE_ROLE=your-service-role
``` 
*   Crear un ambiente virtual para las dependencias [Link official documentation](https://docs.djangoproject.com/en/3.1/intro/contributing/#getting-a-copy-of-django-s-development-version "djangoenviroment")
*   Activar el ambiente virtual e ir a la carpeta /backend_django e instalar las dependencias con el siguiente comando usando el archivo requirements.txt que tiene las dependencias
```
pip install -r requirements.txt
``` 
*   Para instalar la aplicación ReacJS ir a la carpeta /frontend_reactjs y ejecutar:
```
yarn install
```

## Como ejecutar ##
*   Ir a la carpeta /backend_django y ejecutar:
```
python manage.py runserver
```
*   También ir a la carpeta frontend_reactjs y ejecutar:
```
yarn start
```
