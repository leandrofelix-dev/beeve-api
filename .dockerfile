# Use a imagem base Node.js
FROM node:20

# Diretório de trabalho dentro da imagem
WORKDIR /src

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código fonte
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta em que o servidor Node.js irá ouvir
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["node", "./dist/app.js"]
