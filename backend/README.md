# Json Web Token, login, registro y CRUD con Node.js 

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Setee variable de entorno de MongoDb archivo .env:

```sh
$ MONGODB_URL="mongodb://..."
```

Instalar las dependencias e iniciar:

```sh
$ npm install
```

En modo desarrollo

```sh
$ npm run dev
```

En modo produccion

```sh
$ npm start
```

En modo debug:

```sh
$ npm run debug
```

Testear Api Rest (por ahora registro usuario):

```sh
$ npm run dev
$ npm test
```


#### Rutas (utilizar postman)


```js
/api/users/login (POST)
/api/users/register (POST)

/api/perfil (GET)
/api/domain (GET)
/api/domain (POST)
/api/domain/:id (GET)
/api/domain/:id (PUT)
/api/domain/:id (DELETE)
```
#### Modelo User

```
name: String - requerido
email: String - requerido
password: String - requerido
avatar: String
date: Date
```

#### Modelo Domain

```
name: String
description: String
link: String
seen: Number
```