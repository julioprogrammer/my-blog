---
title: Uma breve introdução às Progressive Web Applications
description: "Antes de tudo peço a vocês que olhem para seus smartphones
  agorinha e se perguntem: “Será que eu preciso mesmo deste aplicativo instalado
  em meu celular ? ”. Pois é, eu já me questionei muito sobre isso."
date: 2020-08-15 02:50:40
image: assets/img/1_c4aga93v36hf6ost8x153q.png
category: html
background: "#EB7728"
---
![PWA](/assets/img/pwa.png)

Hoje em dia os aplicativos nativos estão cada vez mais perdendo espaço no coração de vários usuários, muitas vezes somos obrigados a baixar um aplicativo em nossa loja para por exemplo pagar o estacionamento do shopping no qual não vamos com frequência. Mas espere, pra que baixar um aplicativo sendo que eu quero apenas realizar um pagamento? E mais, pra que gastar a memória do meu smartphone com um aplicativo desses? Pois é, difícil não é mesmo?

Mas muita calma, porque os desenvolvedores de smartphones já estão aumentando a quantidade de memória interna dos seus dispositivos, pronto problema resolvido.

![PWA2](/assets/img/pwa2.gif)

É pensando bem nem tanto né, pois isso soluciona apenas um problema que seria a quantidade de armazenamento interno que o seu smartphone precisa para instalar várias e várias apps, mas ainda não descarta o problema de nós termos que instalar essas várias e várias apps indesejadas apenas para realizar um pagamento do estacionamento. Mas qual seria a solução para esse problema? Já existe essa solução? Essa solução seria simples?

**PWAs (Progressive Web Applications)** uma solução antiga que teve seu início lá atrás em 2007 com o lançamento do revolucionário Apple Iphone, sim já faz um tempo que essa solução existe, na verdade as apps nativas que conhecemos hoje em dia nem deveriam existir pois, a ideia inicial do Jobs era de que os aplicativos fossem na verdade o que conhecemos hoje como Web Apps sendo assim, não iríamos precisar ficar baixando e gastando memória interna dos nossos dispositivos desde o início dos smartphones. Pois é mas o motivo deles terem deixado essa ideia de lado para implementarem os apps nativos eu já não consigo responder… (grana, money, cascalho, bufunfa).

Mas o que é esperado de um PWA bem construída?

- **Progressivo:** para qualquer usuário independente do browser (ainda existem algumas limitações para o safari mas vamos ver isso mais para frente).

- **Responsivo:** ele se adequa a vários tamanhos de tela que vai de um PC Full HD (1920 x 1080) até um smartphone HVGA (320 x 480).

- **Conexão:** ele funciona online e offline (pois é, lembra daquela limitação do safari ?).

- **Performance:** o usuário se sente navegando em um aplicativo nativo.

- **Atualizados:** uma outra característica da qual eu gostei muito é que não é necessário baixar e instalar atualizações, o próprio browser identifica e, se necessário, instala a atualização sem que o usuário perceba.

- **Seguro:** funciona apenas com endereços https.

- **Engajável:** com algumas tecnologias como push notification o usuário se sente cada vez mais engajado com o PWA e fora que, com poucos clicks você consegue colocar o ícone do app na tela principal do seu smartphone engajando ainda mais o usuário.

Voltando ao ponto do engajamento (uma das coisas em que eu considero muito importante para os usuários), o HTML5 nos proporciona algumas meta tags que ajudam a deixar o PWA com a cara de um app nativo como por exemplo:

```html
<meta name=”theme-color” content=”#db5945" />
```

> Deixa a cor do seu navegador e do seu statusbar de acordo com a cor que você colocou em content.

![PWA3](/assets/img/pwa3.jpeg)

```html
<meta name=”display” content=”standalone” />
```

> Deixa a tela em standalone ou seja sem a barra da url do navegador.

Enfim, existem várias meta tags que podemos utilizar para deixar nossos PWAs mais parecidas com um app nativo, mas poxa colocar várias e várias meta tags não deve ser uma tarefa muito legal de se fazer.

![PWA4](/assets/img/pwa4.gif)

Uma solução criada para resolver este problema de forma fácil é um arquivo json chamado manifest.json, nesse arquivo eu posso colocar todas as configurações que até então eram colocadas em meta tags de uma forma bem simples. Exemplo de um arquivo manifest:

```javascript
{
    "short_name": "My App", // Nome que geralmente é usado e mostrado para o usuário
    "name": "My PWA App", // Nome real do aplicativo
    "icon": [ // Definição dos icones do PWA, pode ser utilizado um array de icones com tamanhos diferentes
      {
        "src": "img/icon.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "img/icon.png",
        "sizes": "92x92",
        "type": "image/png"
      }
    ],
    "start_url": "index.html", // Definição da page que será aberta, evita que a PWA abra em uma page no meio do processo
    "orientation": "portrait", // Orientação em que o PWA será aberto "portrait" ou "landspace"
    "display": "standalone", // Define se o PWA vai abrir em full screen (sem a barra de url) ou se ele vai abrir em normal mode (com a barra de url do browser)
    "theme_color": "#CBCBCBCB", // Define a cor do statusbar e do browser
    "background_color": "#FFHGG" // Define a cor de background do splash screen
}
```

Isso torna o desenvolvimento ainda mais rápido do que um desenvolvimento nativo, além do mais um PWA custa bem menos em termos de tempo de desenvolvimento e custo sendo uma boa opção para vários problemas. Além de push notification existem várias coisas em que o PWA consegue utilizar do smartphone como: Câmera, Áudio, Geolocation, Vibração e por aí vai. Mas como já citado acima, o safari ainda tem muitas limitações o que deixa muito a desejar no IOS (mas ouvi algumas pessoas comentando que a nova nota de atualização do safari para o MAC diz que implementaram suporte ao famoso Service Worker), e fora isso, outra desvantagem é que atualmente os PWAs ainda não conseguem ter acesso ao Bluetooth e Lista de contatos do celular, mas logo logo haverá implementações para resolver este tipo de problema (#googleGod).

Mas o que faz o PWA continuar funcionando offline ? AppCache ? não, não é AppCache até porque é bem chatinho de se trabalhar com AppCache. A carta na manga agora é o famoso Service Worker, com ele podemos realizar vários eventos (como um web worker da vida) e é nele que realizamos a criação do cache de nossa PWA o tornando praticamente uma app nativa, exemplo:

```javascript
var CACHE_NAME = 'static-v1'; // Aqui definimos o nome do nosso cache

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {  // Aqui escolhemos os arquivos que deverão ser guardados em cache 
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/manifest.js',
        '/vendor.js',
      ]);
    })
  )
});
```

Prontinho, agora ao invés de você abrir o PWA offline e ver isso:

![PWA5](/assets/img/pwa5.jpeg)

Você vai ver nada mais nada menos que sua app funcionando normalmente e offline.

Fácil não?, com apenas essas linhas de código você consegue criar um PWA sem muito esforço e agora o seu usuário não precisa mais realizar o download de um app nativo ocupando o espaço da memória interna do smartphone dele para apenas realizar uma consulta ou no nosso caso fazer o pagamento do estacionamento. Agora o usuário pode fazer tudo isso via browser ou se ele quiser pode adicionar o ícone do PWA em sua tela principal do smartphone sem se preocupar com a quantidade de memória interna que seu smartphone ainda possui. O que achou? Mágico não?

![PWA6](/assets/img/pwa6.gif)

É interessante citar um case que fez e ainda faz muito sucesso, o PWA de uma empresa de e-commerce da Índia chamado de Flipkart Lite, eu adicionei o PWA em minha tela principal e posso dizer que eu não notei diferença nenhuma do app nativo para o PWA deles, a experiência foi realmente de um app 100% nativo.

Pois é o PWA chegou e chegou para ficar, empresas como a Google e Microsoft já estão investindo em PWAs e futuramente creio que a Apple também não terá muitas chances e se renderá ao futuro dos APPs até porque a quantidade de downloads de apps nativas só decaiu nesses últimos anos, como é mostrado no gráfico dos anos entre 2015 a 2016.

![PWA7](/assets/img/pwa7.png)

Então só nos resta pensar, será que vale realmente apena investir tempo com apps nativos ao invés de investir tempo em PWAs? Sendo que sua app não irá ser acessada constante e não vai precisar acessar Bluetooth e nem a sua Lista de contatos? Porque cai entre nós, as únicas apps que são acessadas constantemente são: Whatsapp, Facebook, Messenger, Instagram e Netflix. Pois é, pense bem porque o futuro das apps já está aí.

## Referências

Segue alguns links dos quais usei como referência:

- https://www.youtube.com/watch?v=sH7dlRnuh-k
- http://blog.alura.com.br/palestra-offline-web-com-service-workers/
- https://developers.google.com/web/fundamentals/getting-started/primers/service-workers?hl=pt-br#o_que_e_um_service_worker