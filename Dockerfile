# Use uma imagem leve do servidor web, como o Nginx
FROM nginx:alpine

# Copie os arquivos HTML, JavaScript e CSS para o diretório de conteúdo do Nginx
COPY ./index.html /usr/share/nginx/html/
COPY ./scripts.js /usr/share/nginx/html/
COPY ./styles.css /usr/share/nginx/html/

# Exponha a porta 80 para o tráfego da web
EXPOSE 80

# Comando para iniciar o servidor Nginx em segundo plano
CMD ["nginx", "-g", "daemon off;"]