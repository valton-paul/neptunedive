FROM node:20.17

RUN mkdir -p /root/workspace

WORKDIR /root/workspace/neptunedivefront

# Exposer le port de l'application
EXPOSE 5173