FROM postgres:17-alpine

COPY ./scripts /docker-entrypoint-initdb.d

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_MULTIPLE_DATABASES=master,node_01,node_02