FROM node:latest as build

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:latest
COPY default.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 443 3000 80
CMD ["nginx", "-g", "daemon off;"]
