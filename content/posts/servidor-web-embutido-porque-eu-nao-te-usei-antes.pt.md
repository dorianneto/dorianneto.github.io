---
author: "Dorian Neto"
title: "Servidor web embutido, porque eu não te usei antes?!"
date: "2016-04-23"
tags: ["tutorial", "php", "servidor"]
cover:
  image: "images/servidor-embutido-php.png"
  relative: false
---

Já faz algum tempo que me acostumei a utilizar softwares de servidor web (lamp, xampp, wamp,  etc) para meu ambiente de desenvolvimento local e pelo fato de muitos desses softwares utilizarem o apache como servidor web, acabei me acostumando a utilizá-lo. Quando o Nginx foi lançado, tentei utilizá-lo para desenvolvimento local, mas devido a vida louca de entregas e estudos, acabei optando por algo mais rápido e fácil de se configurar e utilizar.

Até que um dia, tive a necessidade de ter várias versões diferentes do php na minha máquina e pra resolver isso encontrei uma ferramenta que possibilita a utilização de [múltiplas versões do PHP](http://www.dorianneto.com.br/php/problemas-com-versoes-do-php-nunca-mais/) com o Apache. Utilizei essa solução por um bom tempo, porém, depois de várias inúmeras formatações do meu notebook e repetitivas instalações do software e da solução, resolvi procurar uma outra alternativa que me gerasse menos trabalho de configuração.

Depois de tanto pesquisar e pensar, lembrei de ter lido um post, alguns anos atrás, comentando sobre uma feature no PHP 5.4 que a partir daquela versão o PHP teria um servidor web embutido. Rapidamente baixei as versões que mais utilizo em projetos e fui testar.

## Legal, mas como eu uso isso?

_Obs: Utilizo o ubuntu 14.04, então, os comandos serão voltados para linux. Caso vocês sintam a necessidade de um tutorial para windows ou mac é só pedir nos comentários ;)_

Acesse a área de [downloads](http://php.net/downloads.php) do site do PHP e faça o download da versão que você deseja utilizar:

```shell
$ sudo wget http://br1.php.net/get/php-7.0.4.tar.gz/from/this/mirror
```

_obs: Uma dica é utilizar o [museu do PHP](http://museum.php.net/) para baixar outras versões_

Depois de fazer o download, extraia o arquivo e configure-o:

```shell
$ sudo ./configure --prefix=/opt/php7.0.3 --with-mysql --with-mysqli --with-openssl --with-pdo-mysql --with-curl
```

O comando **./configure** é responsável por informar quais [extensões e quais configurações](http://php.net/manual/pt_BR/configure.about.php) serão compiladas.

Após configurá-lo, iremos compilar tudo para que você tenha acesso a linguagem, interpretador etc:

```shell
$ sudo make
```

Note que até agora, tudo está sendo feito dentro da pasta que você extraiu o PHP e somente após o sucesso da configuração e instalação alguns arquivos serão enviados para a pasta que você escolheu na opção **--prefix** (no nosso caso foi a **/opt/php7.0.3)**.

```shell
$ sudo make install
```

Agora que você tem o PHP instalado e configurado, vamos criar o link simbólico dentro da pasta global de executáveis para acessar pelo terminal:

```shell
$ ln -s /opt/php7.0.3/bin/php php
```

Verifique a versão do php no terminal:

```shell
$ php -v
```

Agora é só iniciar o servidor através deste comando:

```shell
$ php -S localhost:8080
```

Lembrando que ao executar o comando, o servidor será iniciado na mesma pasta que você executou o comando. Caso queira iniciar o servidor em outra pasta, utilize a opção **-t **quando for iniciar o servidor:

```shell
$ php -S localhost:8080 -t /var/www/html
```

## E como eu vejo o Log e utilizo as regras rewrite?

Me fiz essa mesma pergunta e foi uma das coisas que me fizeram quase desistir de utilizar essa solução, mas existe uma resposta pra isso.

O log você pode acompanhar através do terminal, tanto o log de warnings/notices quanto o log de acessos ao servidor. Você também pode configurar via php.ini um arquivo com logs do PHP, onde você terá acesso a tudo (warning, fatal, notice etc).

Com relação as regras rewrites, é possível inserir um arquivo que fica responsável pelo roteamento do servidor. Nada mais é do que um arquivo PHP que é executado pelo servidor antes de cada requisição. Essa solução serve para utilizar em aplicações que necessitem regras rewrites, como por exemplo uma aplicação que utilize wordpress.

_"E eu vou ter que escrever um arquivo para cada aplicação? Meu deus, assim fica sem condições!"_

Calma meu jovem, existem scripts de roteamento para todo tipo de framework, cms etc, é só procurar no google. Você também pode utilizar um arquivo de roteamento para cada tipo de aplicação. Veja esse arquivo como um htaccess :)

Segue um exemplo de como utilizar o roteamento através do comando:

```shell
$ php -S localhost:8080 -t /var/www/html /var/www/html/routes/route.php
```

## Que negócio estranho...

No começo, pode ser um pouco estranho utilizar isso pelo fato de rodar tudo no terminal (para iniciantes) e também que a maioria dos desenvolvedores PHP foram ensinados desde o início a utilizar um software de servidor web para não perder tempo configurando o ambiente de desenvolvimento e focar no aprendizado da linguagem. Respeito isso e até indico, mas não se limite a fazer sempre a mesma coisa pelo resto da vida, não se acomode, procure sempre aprender o que há de novo e que possa te deixar mais produtivo.

Não estou aqui para dizer que você deve esquecer o apache, ngnix e outros servidores webs, estou aqui apenas para tentar te ajudar a tornar o seu ambiente de desenvolvimento local mais ágil e mais fácil de configurar :)

Lembrando mais uma vez que a indicação do uso do servidor embutido é **apenas para desenvolvimento local** por diversas razões, onde a principal é a segurança.

Espero que possa ter te ajudado!
