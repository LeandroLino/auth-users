## Crud simples para testar autenticações 

- NodeJs
- MySql
- Docker
- Express
- Sequelize

#### É possivel acessar as requests dentro da pasta assets

## Subir MySql com Docker

[Acesse para ver mais](https://moored-cloth-8a0.notion.site/MySql-198a8307e2988040b473f04f9b12f719?pvs=4)

No terminal, navegue até a pasta onde está o arquivo `docker-compose.yml` e execute o seguinte comando:

```
docker-compose up -d
```

Para verificar se o contêiner MySQL está rodando, execute:

```
docker ps
```

É esperado:

```
IMAGE
base-node-sequelize-mysql-app
mysql:5.7
```

## **Conectar ao MySQL**

Agora que o MySQL está rodando no Docker, você pode se conectar a ele de várias maneiras:

### a) **Usando o MySQL Workbench**

1. Abra o MySQL Workbench.
2. Crie uma nova conexão com as seguintes configurações:
   - **Hostname**: `localhost`
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: `secret` (ou a senha que você definiu no `docker-compose.yml`).
3. Clique em **"Test Connection"** para verificar a conexão.

## **Parar e Remover o Contêiner**

Se você quiser parar o contêiner, execute:

```
docker-compose down
```

Isso vai parar e remover o contêiner, mas os dados persistirão no volume `mysql-data`. <br>

Se você quiser remover tudo, incluindo os dados, use:

```
docker-compose down -v
```
