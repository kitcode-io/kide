FROM ubuntu
RUN apt-get update && apt-get install -y nginx
RUN mkdir /root/project