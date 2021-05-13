FROM node:12.16.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN yarn install

# If you are building your code for production
# RUN npm ci --only=production
ARG GOOGLE_APPLICATION_CREDENTIALS=serviceAccount.json
# Bundle app source
COPY . .
RUN yarn run prisma:generate
RUN yarn run build
# RUN rm -rf node_modules && yarn install --frozen-lockfile
#attach static files volume here
VOLUME [ "/usr/src/app/public" ] 
VOLUME [ "/usr/src/app/$GOOGLE_APPLICATION_CREDENTIALS" ]

EXPOSE 3000

CMD [ "yarn","start" ]
