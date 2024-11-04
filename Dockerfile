FROM node:20.17

RUN mkdir -p /root/workspace

COPY . /root/workspace

WORKDIR /root/workspace/neptunedivefront

RUN npm install -g npm@10.8.2

RUN npm install --legacy-peer-deps

# Exposer le port de l'application
EXPOSE 5173

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
