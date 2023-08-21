# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY . /app

# Instale as dependências
RUN npm install

# Expõe a porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
