# Usa a imagem oficial do Node.js
FROM node:16

# Cria o diretório da aplicação
WORKDIR /usr/src/app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação (agora usando server.js)
CMD ["node", "server.js"]