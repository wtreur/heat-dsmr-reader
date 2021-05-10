FROM node:12-alpine

RUN apk add --no-cache make gcc g++ python linux-headers udev

RUN mkdir /opt/heat-dsmr-reader/
COPY app.js /opt/heat-dsmr-reader/
COPY node-dsmr /opt/heat-dsmr-reader/node-dsmr
COPY package.json /opt/heat-dsmr-reader/

WORKDIR /opt/heat-dsmr-reader/
RUN npm install

CMD ["node", "app.js"]