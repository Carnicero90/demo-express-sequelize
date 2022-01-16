FROM node:current-alpine3.14 AS nodejs

ARG UID
ARG GID
RUN adduser --disabled-password calavera
RUN mkdir -p /home/calavera/src/node_modules && chown -R calavera /home/calavera

WORKDIR /home/calavera/src
USER calavera

EXPOSE 8080

CMD sh start.sh
