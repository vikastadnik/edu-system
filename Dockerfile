FROM node:10.15-jessie as build-deps
WORKDIR /usr/src/app
COPY *.json ./
RUN yarn install --silent
COPY . ./
RUN yarn run build-target

# Stage 2 - the production environment
FROM nginx
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]