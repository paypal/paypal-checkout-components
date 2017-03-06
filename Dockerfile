FROM node:4.5

RUN apt-get update && apt-get install -y build-essential

ENV APP_HOME /demo

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package.json $APP_HOME
RUN npm install

ADD demo $APP_HOME
