# README #

## Utilizando o projeto pelo Docker

Em primeiro lugar é necessário ter o docker e o docker-compose instalados em sua máquina, para isso segue o tutorial:

* [Tutorial de instalação do docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Tutorial de instalação do docker-compose](https://docs.docker.com/compose/install/)

### Configuração inicial
Para iniciar o projeto, basta rodar o comando abaixo a partir da pasta raiz da aplicação:

### Subir o ambiente
```shell
./app start
```

### Derrubar o ambiente
```shell
./app stop
```

### Limpar o ambiente
> **Atenção!** Este comando irá **derrubar o ambiente**, limpar os container órfãos e derrubar a rede 
> interna do ambiente de desenvolvimento. Utilize-o com cuidado.

```shell
./app clean
```

## Gerando build, tags e publicando as imagens Docker

Após as configurações e inicialização do projeto citadas nos passos anteriores, 
basta rodar o comando abaixo para gerar a build, tags e publicação das imagens docker:

```shell
./build start
```
> **Atenção!** Este comando irá gerar a build das imagens docker e em seguida criar as tags
> e publicá-las em um repositório local em http://localhost:5001 para que fiquem acessíveis pelo Kubernets local.