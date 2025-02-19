# Usa a imagem oficial do Node.js
FROM node:16

# Cria o diretório da aplicação
WORKDIR /usr/src/app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências (incluindo Nodemon como dependência de desenvolvimento)
RUN npm install

# Se você preferir instalar o Nodemon globalmente, use:
RUN npm install -g nodemon

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação com Nodemon
CMD ["npx", "nodemon", "server.js"]
