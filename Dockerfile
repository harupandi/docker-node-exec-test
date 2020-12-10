FROM node:12.19.1-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
     && echo "root:Docker!" | chpasswd \
     && apt-get update \  
     && apt-get install --yes --no-install-recommends openssh-server vim curl wget tcptraceroute openrc

COPY sshd_config /etc/ssh/
COPY init_container.sh /usr/local/bin/
COPY index.js ./

RUN chmod u+x /usr/local/bin/init_container.sh

EXPOSE 2222 8080

ENTRYPOINT ["/usr/local/bin/init_container.sh"]