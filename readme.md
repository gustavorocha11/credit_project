# Backend

Primeiramente, codifiquei apenas o armazenamento, tráfego e disponibilidade de dados do exemplo base A, criando a minha própia base de dados (armazenamento), analise de dados (trafego) e disponibilização dos dados.

Realizado criação do projeto pensando na seguinte situação:

- Partindo do principio que as bases de dados são externas e com arquiteturas diferentes, não vou dissertar sobre suas implementações. Que pode ser AWS - Docker... etc.

- Estou partindo do principio que preciso criar uma ferramenta (api) para acessar essas informações e tratar da melhor maneira possível;

- No estudo de caso em questão, criei uma base de dados "fake" apenas para cadastro de informações e consulta de informações que se faça necessário;

Tais informações encontram-se no arquivo "source-a.json";

# Como executar o projeto:

Para rodar o programa é necessário instalar as dependencias e abrir o código em uma IDE de edição (Para esse programa sugiro utilizar o Visual Studio Code).

Executar os comandos abaixo no terminal:

- npm install; (instala as dependencias)
- npm start; (executa o código)

Essas informações estão divididas entre:

- http://localhost:3000/clientes
- http://localhost:3333/dividas/
- http://localhost:3333/dividaAcumulada/1
- http://localhost:3333/dividaAcumulada/2

# Sendo possível a filtragem de cada informação pelo id do cliente!

É realizado uma atualização de informações a cada 10 segundos, ou seja, caso haja atualização na API, saberemos imediatamente.
Rodando a aplicação podemos notar que o código é constantemente "atualizado";
Não acumulando informações desnecessárias.
Realizei a criação de rotas com comandos req e res, middlewares e tratamento de erros.

# Tecnologias utilizadas:

- Visual Studio Code (IDE);
- Java Script;
- Insomnia;
- ExpressJS;
- Node.js;
- NPM;

Também pensei em criar apenas 01 microserviço que consiga ler e armazenar informações provenientes da base a, base b e base c. Armazenando em log e disponibilizado quando necessário. O tempo de atualização desses dados seria de acordo com a necessidade de cada informação.

# Sugestões para o problema apresentado:

# Problema A:

Base de dados: PostgreSQL

A base A somente poderá ser acessada de determinados hosts com endereços fisicos(mac) ou ip cadastrados no banco.
O acesso a base de dados A deverá ser monitorado (em dashboards ou relatórios) para permitir aos responsaveis da base de dados A poder conferir se os acessos à ela estão sendo condizentes com o uso pelos micro serviços. De preferencia a auditoria da base deve ficar separada do servidor da aplicação;

# Problema B:

Base de dados: Mysql

Devido a necessidade de consulta análitica, relatórios, dashboards e machine learning;

# Problema C:

Base de dados: MondoDB

Não necessita armazenar nenhum dado critico e o seu acesso precisa ser extremamente rápido.

# Microserviços

JavaScript, Node.js e Redis

# Arquitetura

![Screenshot](/src/img/arquitetura.svg)

# Sugestão:

Caso: O cliente realiza uma busca de informações referente ao seu CPF na plataforma.
Onde é possível consultar suas pendências e score, e vamos supor que o sistema ainda não é afiliado a empresa credora deste cliente em questão.

Solução: Um campo, tela, cadastro onde o cliente possa informar qual empresa ele gostaria de ter mais informações referente ao seu score para que possamos analisar e tratar esses dados.

Motivo: Entrariamos em contato com a empresa informando a quantidade de clientes que está buscando suas informações para uma possível parceria e entrega de soluções.
