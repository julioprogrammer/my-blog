---
title: "GraphQL vs Rest: Pensando de uma forma inovadora"
description: Você alguma vez já pensou o quão chato e custoso é ter vários e
  vários endpoints em sua API ? Mas será que temos como fugir disso ? Pois é, o
  GraphQL está aí para tentar nos ajudar a pensar de uma forma diferente na
  construção de uma API.
date: 2020-08-24 09:25:41
image: assets/img/graphql-1.gif
category: js
background: "#D6BA32"
---
![Graphql1](/assets/gifs/graphql-1.gif)
# Mas o que é GraphQL?

Desenvolvido pelo Facebook o GraphQL é um novo padrão de API que fornece uma alternativa muito mais eficiente, poderosa e flexível do que o Rest. No quesito busca de dados, o GraphQL lhe permite realizar buscas declarativas onde um cliente especifica exatamente os dados de que ele precisa da API. Então agora ao invés de termos vários e vários endpoints o GraphQL expõe apenas um e responde com eficiência e precisão os dados solicitados.

# Porque usar GraphQL?

Atualmente o Rest tem sido a maneira mais popular e muito usada para expor dados de um servidor. Quando o conceito do Rest foi criado as aplicações desenvolvidas eram relativamente simples e o ritmo de desenvolvimento não era tão “pegado” como é hoje em dia. Imagine este cenário bem simples: em sua aplicação xpto existe uma API que retorna o Título e Duração de filmes cadastrados em sua base, até aí tudo bem possuímos apenas um endpoint, mas digamos que a definição de negócio mudou e agora vamos ter de colocar um filtro para que a API retorne somente os filmes de um determinado Diretor. Ok tranquilo, agora teremos dois endpoints um para Diretores e outro para Filmes, até aqui estamos bem tranquilos, mas digamos que a definição de negócio mudou novamente e agora teremos que cadastrar também o elenco de um determinado filme. Opa …, ata agora teremos três endpoints, um para os Filmes, outro para os Diretores e agora mais um para os Elencos. Ok eu admito, nossa API está crescendo muito rápido não é ? Pois é, nesse ritmo vai ficar cada vez mais difícil de se dar manutenção nesta API pois, vamos ter que dar manutenção em vários endpoints diferentes caso a definição mude (e cai aqui entre nós, os clientes sempre mudam de definição e com mais frequência do que gostaríamos), mas espere, vamos ver como podemos resolver este probleminha.

Imagine que temos de realizar uma request para trazer todos os dados do diretor “George Lucas” e depois todos os filmes em que ele dirigiu, vamos ver como ficaria esta implementação em Rest:

1. Vamos bater no endpoint de “Diretores” e resgatar os dados do George (no nosso caso estamos utilizando os famosos Node e Express como backend):

```javascript
let data = {};
fetch('http://localhost:3003/api/diretores?_id=59c42f5f48194732b46d95d4', {
 method: 'GET',
 headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
 },
})
.then(res => res.json())
.then((res) => {
  data = res;
})
.catch((err) => console.log(err));
```

2. Agora que já temos os dados do George vamos bater no endpoint de “Filmes” para resgatar todos os filmes em que ele já trabalhou:

```javascript
fetch(`http://localhost:3003/api/filmes?idDiretor=${data._id}`
, {
   method: 'GET',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
 })
 .then(res => res.json())
 .then((res) => {
   data = { ...data, res };
 })
 .catch((err) => console.log(err));
```

3. E agora só nos resta exibir e ver o resultado:

```javascript
console.log(data);
{
    "_id": "59c42f5f48194732b46d95d4",
    "nome": "George Lucas",
    "dataNasc": "14 de maio de 1944"
    "filmes": [
        {
            "_id": "59c430a5b94116420825c0b8",
            "titulo": "Star Wars Episódio IV: Uma Nova Esperança",
            "dataEstreia": "18 de novembro de 1977",
            "idDiretor": "59c42f5f48194732b46d95d4"
        },
        {
            "_id": "59c43112b94116420825c0b9",
            "titulo": "Star Wars Episódio III: A Vingança dos Sith",
            "dataEstreia": "19 de maio de 2005",
            "idDiretor": "59c42f5f48194732b46d95d4"
        },
        {
          ...
        }
    ]
}
```

Cansativo ? Trabalhoso ? Ah … nem tanto, nós só tivemos que bater em dois endpoints, mas agora imagine se você conseguisse fazer tudo isso em apenas uma chamada, não seria bem menos trabalhoso ? E é exatamente para resolver esse problema que podemos usar o GraphQL, com apenas uma query conseguimos resolver isso de um modo super simples e extremamente rápido,

![Graphql2](/assets/gifs/graphql-2.gif)

agora veja como ficaria essa mesma implementação só que agora em GraphQL:

1. Temos o fetch para bater no endpoint do server GraphQL (no nosso caso estamos utilizando o Graphcool como backend):

```javascript
function requestAPI(operation, variables) {
   fetch('https://api.graph.cool/relay/v1/cj7nivq5z0mph0122v4r35u00', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           query: operation.text,
           variables,
       }),
   }).then(response => {
       return response.json()
   })
}
```

2. Após criar a function vamos usá-la passando os parâmetros necessários:

```javascript
const diretorId = '59c42f5f48194732b46d95d4';
const RetornaFilmesQueryText = `
  query RetornaOsFilmes($deretorId: ID!) {
    todosOsFilmes(filter: {
      diretores: { id: $diretorId }
    }) {
      _id
      nome
      dataNasc    
      filmes {
        _id
        titulo
        dataEstreia
        idDiretor
      }
    }
  }
`;

const RetornaFilmesQuery = { text: RetornaFilmesQueryText };
const result = requestAPI(RetornaFilmesQuery, { diretorId });
```

3. Daí agora é só exibir o resultado:

```javascript
console.log(result.data);
{
    "_id": "59c42f5f48194732b46d95d4",
    "nome": "George Lucas",
    "dataNasc": "14 de maio de 1944"
    "filmes": [
        {
            "_id": "59c430a5b94116420825c0b8",
            "titulo": "Star Wars Episódio IV: Uma Nova Esperança",
            "dataEstreia": "18 de novembro de 1977",
            "idDiretor": "59c42f5f48194732b46d95d4"
        },
        {
            "_id": "59c43112b94116420825c0b9",
            "titulo": "Star Wars Episódio III: A Vingança dos Sith",
            "dataEstreia": "19 de maio de 2005",
            "idDiretor": "59c42f5f48194732b46d95d4"
        },
        {
            ...
        },
     ]
}
```

Olha só exatamente o mesmo resultado só que agora com apenas uma chamada, e podemos fazer ainda melhor, agora podemos escolher quais dados a API deve nos retornar por exemplo:

```javascript
const diretorId = '59c42f5f48194732b46d95d4';
const RetornaFilmesQueryText = `
  query RetornaOsFilmes($deretorId: ID!) {
    todosOsFilmes(filter: {
               diretores: { id: $diretorId }
    }) {
       nome    
       filmes {
          titulo
       }
    }
  }
`;

const RetornaFilmesQuery = { text: RetornaFilmesQueryText };
const result = requestAPI(RetornaFilmesQuery, { diretorId });
```

Nessa nova query nós tiramos _id e dataNasc do diretor e também tiramos _id, dataEstreia e idDiretor de filmes, agora o resultado é exatamente o retorno dos dados que pedimos na nova query:

```javascript
console.log(result.data);
{
    "nome": "George Lucas"
    "filmes": [
        {
            "titulo": "Star Wars Episódio IV: Uma Nova Esperança"
        },
        {
            "titulo": "Star Wars Episódio III: A Vingança dos Sith"
        },
        {
            "titulo": "Star Wars Episódio II: Ataque dos Clones"
        },
        {
            ...
        },
    ]
}
```

E ai, o que achou ? bacana não é mesmo ? e perceba, tudo isso com apenas um endpoint e manipulando o response por query, com isso o nosso probleminha de manutenção em vários endpoints diferentes foi resolvido. Yeahhh!!

![Graphql3](/assets/gifs/graphql-3.gif)

# Mas como é feito a definição de schema?

Bem, assim como no Rest o GraphQL também possui definição de schema, claro pois para uma API bem construída você precisa definir muito bem o contrato dos dados a serem gravados na base. É muito simples realizar a definição de schema no GraphQL, por exemplo: em uma API Node Express a definição de schemas poderia ser feita desta maneira .::

```javascript
const todoSchema = new mongoose.Schema({
   description: { type: String, require: true },
   done: { type: Boolean, require: true },
   createdAt: { type: Date }
});
```

Tudo bem, agora vamos ver esse mesmo exemplo só que agora feito em GraphQL .::

```javascript
const typeDefs = `
 type Todo {
   id: ID!
   description: String!
   done: Boolean!
   createdAt: Date
 }
`;
```

Percebam uma coisa, no final de cada dado que estamos definindo estamos colocando “!” exclamação no final, isso indica que o campo é obrigatório (ou seja a mesma coisa que o “require: true” que usamos no Node Express) e caso ele não seja preenchido irá gerar um erro ao inserir algo na base. Legal não é mesmo ?

# Para que podemos usar o GraphQL ?

Basicamente nós podemos utilizar o GraphQL de três formas, pois é, quem pensou que ele só servia para a criação de uma API básica estava errado.

### Implementação simples de GraphQL com uma base de dados
![Graphql4](/assets/img/graphql-4.png)
##### Implementação básica de uma API em GraphQL onde o usamos como um servidor para se comunicar e expor dados de uma base de dados.

### Implementação de GraphQL com micro-serviços, APIs de terceiros e uma API legado
![Graphql5](/assets/img/graphql-5.png)
##### Implementação do GraphQL com outras APIs, no nosso caso com uma API legado, um micro-serviço e uma outra API de terceiros, utilizando o GraphQL deste jeito nós garantimos uma padronização dos dados e fora que agora o frontend (cliente) vai possuir apenas um endpoint para consumir.

### Implementação do GraphQL consumindo uma base de dados e mais 3 APIs
![Graphql6](/assets/img/graphql-6.png)
##### Implementação do GraphQL consumindo uma base de dados (exatamente a mesma implementação que a primeira apresentada a cima) e realizando a integração com mais 3 três APIs (como a ultima implementação que vimos acima), esta implementação é conhecida como “Abordagem Híbrida”.

# Calma mas, e a performance e segurança?

Tudo bem, tudo bem, eu sei que sua cabeça está explodindo com esta maravilhosa forma de se criar backends mas, temos que falar sobre performance e segurança. É claro que este novo método é muito mais eficiente e flexível mas como dizia o Tio Ben, que descanse em paz, “Com grandes poderes vem grandes responsabilidades”. O GraphQL permite aos clientes terem uma boa liberdade em questões de consultas, com isso damos uma grande oportunidade de se criar consultas muito complexas e extensas que demoram um certo tempo para serem resolvidas, essas consultas feitas em excesso muitas vezes podem causar atrasos nas respostas do seu servidor ou até mesmo derrubá-lo mas, quanto a isso, temos algumas estratégias utilizadas para resolver estes tipos problemas, eu vou falar de uma em específico a abordagem de “Throttling com base na complexidade de consulta” utilizada pelo GitHub, isso mesmo o GitHub. A limitação baseada na Query Complexity é uma ótima maneira de trabalhar com os clientes e ajudá-los a respeitar os limites do seu esquema, está solução visa determinar a complexidade da consulta e dado determinado nível de complexidade a consulta não será executada e logo ocasionará em um erro, exemplo: supondo que o nível de complexidade tolerante de nossa consulta seja 9 esta consulta não iria acontecer .::

```javascript
query {
  diretor(id: "59c42f5f48194732b46d95d4") {    # // 1 complexidade: 1
    filmes(first: 8) {    # // 2 complexidade: 8
      titulo              # // 3 complexidade: 1
    }
  }
}
```

> 1: por conta de nós definirmos um id para a busca a complexidade não chega a ser difícil pois, isso apenas retorna um diretor então não chega a ser tão complexo.

> 2: aqui é onde o caldo engrossa, ao pedirmos para o GraphQL buscar os 8 primeiros filmes está query se torna mais demora para ser resolvida, já que ela vai ter de ir até a base buscar os 8 primeiros filmes e me retornar os mesmos.

> 3: e por fim eu peço para me retornar os títulos dos filmes, algo que não é difícil de se executar dado que o passo anterior já foi até a base e me retornou os 8 primeiros filmes.

No total a complexidade desta query é de 10 logo, uma mensagem de erro seria enviada no lugar de “data”, por exemplo .::

```javascript
{
"errors": [
    {
      "message": "Está query ultrapassa o nível de complexidade tolerável"
    }
  ]
}
```

Com isso, conseguimos diminuir possíveis consultas gigantescas evitando a queda de seu servidor e atrasos de respostas para o cliente deixando seu backend bem mais seguro e performático. Sim nós podemos !!!

![Graphql7](/assets/gifs/graphql-7.gif)

Bem, eu sei que ainda há muitas coisas em relação ao GraphQL das quais ainda não falei como mutations, subscriptions e boas práticas mas como o artigo já está ficando meio grande então vou parando por aqui, futuramente irei publicar outro artigo em que explicarei melhor os conceitos de GraphQL já que este visava mostrar um pouco da diferença dele para o Rest e deixar vocês com uma pulga atrás da orelha na hora de determinar qual tecnologia usar na construção de sua aplicação backend, enfim, espero que tenham gostado e obrigado por lerem.

![Graphql8](/assets/gifs/graphql-8.gif)

# Referências

- http://graphql.org/learn/
- http://bartoszsypytkowski.com/on-graphql-issues-and-how-were-going-to-solve-them/
- https://pusher.com/sessions/meetup/graphql-london/using-graphql-subscriptions-with-apollo
