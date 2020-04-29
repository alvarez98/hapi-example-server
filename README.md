## Librerias
``` bash
    sudo npm install hapi -S
    sudo npm i nodemon standard -D
    sudo npm install dotenv -S
    sudo npm i -S pg pg-hstore sequelize @hapi/joi@15.1.1 @hapi/boom uuid hapi-cors
    sudo npm install -D sequelize-cli  
    sudo npm i -S jsonwebtoken bcrypt
    sudo npm i jest -D
```
### Links
[Intro](https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono)

[Hola Mundo](https://hapi.dev/tutorials/?lang=en_US)

[Loupe](http://latentflip.com/loupe/?code=KGZ1bmN0aW9uICgpIHsKICAgIGNvbnNvbGUubG9nKCJ4OiIsIHgpOyAvLyBubyBvYnRlbmVtb3MgJzUnIHNpbm8gJ3VuZGVmaW5lZCcKICAgIHZhciB4ID0gMTA7CiAgICBjb25zb2xlLmxvZygieDoiLCB4KTsgLy8gMTAKfSgpKQ%3D%3D!!!)

[Docker](https://josejuansanchez.org/bd/practica-09/index.html)

### Ciclo de vida de Hapi

Simbología
- Punto de extensión (siempre llamado)
- (no se puede llamar)
- Solicitar evento
- Configuración de ruta relevante
- Relacionado con la validación
- Relacionado con la autenticación 

queue, tail- cola

## Sequelize

``` bash
touch .sequelizerc
```
Copiar codigo en .sequelizerc e iniciar

``` bash
sequelize init
```
Copiar codigo config.json
Iniciar compose
``` bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5434:5432 postgres
docker run -it --link postgres:postgres postgres psql -h postgres -U postgres
docker run -d  --link postgres:db -p 8080:8080 adminer
sequelize db:create --env production
sequelize model:generate --name User --attributes name:string,email:string,password:string,uuid:string,active:boolean
```
Antes de probar
```
sequelize db:migrate --env production
```

swagger
documentacion funciones
refactorizar gets
dockerfile
repaso
md
https://github.com/glennjones/hapi-swagger

```sh
sudo docker build hapi .
curl localhost:5000/users
```