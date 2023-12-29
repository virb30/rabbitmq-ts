# RabbitMQ

Projeto exemplo para testar conceitos envolvendo Sistemas de mensageria

## Como executar:

1. Clonar o projeto
1. Subir containeres

```console
git clone https://github.com/virb30/rabbitmq-ts.git
```

```console
docker compose up -d 
# OU
docker-compose up -d
```

Acessar os endpoints documentados na pasta API para produzir mensagens

Para visualizar os logs de consumo basta executar o comando:

```console
docker compose logs -ft app
```