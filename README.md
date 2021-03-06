# UniZap

**Observação:** o código visa atender a plataforma SIGAA e apenas (neste momento) atua na UNIFEI.

## Projeto
UniZap tem o intuito de oferecer um canal de fácil acesso à estudantes para se conectarem com o resto da turma via grupos de aplicativos de mensagem. A partir de cada matéria, é armazenado e distribuído aos seus usuários o link de convite do seu respectivo.

O projeto é composto por três frentes:

- [Crawler](https://github.com/dcdourado/unizap-crawler)
- Bot
  - [WhatsApp](https://github.com/dcdourado/unizap-wa)
  - Telegram (pendente)
- [Prisma Schemas](https://github.com/dcdourado/unizap-prisma-schemas)

## Crawler
O crawler tem por objetivo buscar todos cursos e discplinas disponíveis da Universidade, para conseguirmos ter as informações necessárias para gerenciamento dos grupos.

## Rodando o projeto
Copie o arquivo default.env e configure as variáveis de ambiente

Suba o postgres via compose (se desejar)
```
docker-compose up -d
```

Baixe as dependências
```
yarn install
```

Rode as *migrations*
```
npx prisma migrate dev
```

Começe o crawl (idealmente é utilizado com **cron**)
```
yarn crawl [comando]
```
Para consultar os comandos disponíveis, confira **src/index.js**

## Contribuições
Para contribuir com o projeto crie uma *issue*, discutimos a solução proposta e então cria-se *fork*. Este projeto utiliza segue [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) como guia de estilo de commits (e branches).

Sinta-se convidado a ajudar.

## Licença
**MIT**