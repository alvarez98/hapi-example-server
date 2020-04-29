### Links
[Intro](https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono)

[Hola Mundo](https://hapi.dev/tutorials/?lang=en_US)

[Loupe](http://latentflip.com/loupe/?code=KGZ1bmN0aW9uICgpIHsKICAgIGNvbnNvbGUubG9nKCJ4OiIsIHgpOyAvLyBubyBvYnRlbmVtb3MgJzUnIHNpbm8gJ3VuZGVmaW5lZCcKICAgIHZhciB4ID0gMTA7CiAgICBjb25zb2xlLmxvZygieDoiLCB4KTsgLy8gMTAKfSgpKQ%3D%3D!!!)

[Docker](https://josejuansanchez.org/bd/practica-09/index.html)

## Sequelize

**Crear archivo de configuracion**

``` bash
touch .sequelizerc
```
*Aqui se configuran los paths para las migraciones, modelos, seeders y el config.json*

**Iniciamos sequelize**
``` bash
sequelize init
```
*Configuramos el config.json*

**Creamos la base de datos**
``` bash
sequelize db:create --env production #--env se le pasa la variable a usar
```
**Creamos un modelo**
```sh
sequelize model:generate --name User --attributes name:string,email:string,password:string
```
**Ejecutamos las migraciones**
```sh
sequelize db:migrate --env production
```

## Librerias
``` bash
    sudo npm i hapi -S
    sudo npm i nodemon standard -D
    sudo npm i dotenv -S
    sudo npm i -S pg pg-hstore sequelize 
    sudo npm i -S @hapi/joi@15.1.1 @hapi/boom uuid
    sudo npm i -S hapi-cors
    sudo npm i -D sequelize-cli # -g para instalar globalmente
    sudo npm i -S jsonwebtoken bcrypt
    sudo npm i jest -D
    sudo npm i @hapi/inert@5.2.2 @hapi/vision@5.5.4
    sudo npm i hapi-swagger@10.2.0
    sudo npm i blipp -S
```

## Docker 
``` bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5434:5432 postgres

docker run -it --link postgres:postgres postgres psql -h postgres -U postgres

docker run -d  --link postgres:db -p 8080:8080 adminer
```

## Docker Compose
```sh
sudo docker-compose up -d
```