FROM node:4.5

RUN apt-get update && apt-get install -y build-essential

ENV APP_HOME /paypal-checkout

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# npm
COPY package.json $APP_HOME
RUN npm install -g gulp flow-bin flow-typed
RUN npm install

# flow
COPY .flowconfig $APP_HOME
RUN flow-typed install

# gulp to build the app
COPY .babelrc $APP_HOME
COPY webpack.conf.js $APP_HOME
COPY gulpfile.babel.js $APP_HOME
COPY demo $APP_HOME/demo
RUN gulp webpack-demo
