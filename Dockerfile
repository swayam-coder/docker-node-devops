FROM node:14.18.0-slim
RUN mkdir -p /home/app
WORKDIR /home/app
COPY package*.json .

ARG NODE_ENV
# below is a custom bash script to make sure dev dependencies are not installed in production mode
RUN if[ "$NODE_ENV" = "development" ]; \  
        then npm install; \
        else npm install --only=production; \
    fi  
RUN npm install typescript
COPY . .
RUN npm run build
# after this step you may need to copy some other files into the container too like ormconfig etc.

# these "EXPOSE" and "ENV" statements are completely worthless, they are just for documentation purposes i.e. to tell people that are app runs on port 5000 
ENV PORT=5000
EXPOSE $PORT

CMD [ "node", "build/index.js" ]