FROM rabbitmq:3-management

COPY ./.docker/rabbitmq/rabbitmq.conf /etc/rabbitmq
COPY ./.docker/rabbitmq/definitions.json /etc/rabbitmq
