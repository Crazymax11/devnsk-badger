FROM node:8 AS build

ADD . /src
RUN cd /src && yarn && yarn build && yarn --prod
# создаем целевую папку
RUN mv /src /app

FROM node:8-alpine
EXPOSE 3000
WORKDIR /app
ENV HOST 0.0.0.0

CMD ["npm", "start"]
COPY --from=build /app /app