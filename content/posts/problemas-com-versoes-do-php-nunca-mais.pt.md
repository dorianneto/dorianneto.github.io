---
author: "Dorian Neto"
title: "Problemas com versões do PHP nunca mais!"
date: "2015-03-31"
tags: ["dica", "php", "phpfarm", "lamp"]
---

Lembra quando você aceitou refazer uma área do sistema daquele cliente e quando baixou o projeto viu que o mesmo roda na 5.2 e você só tem a 5.4 instalada? Pois é, esse ódio eu não tenho mais e nem quero que você tenha, pois depois de muito quebrar a cabeça e horas de sono perdidas, vou compartilhar meu momento de extrema felicidade por ter conseguido instalar um ambiente de desenvolvimento com múltiplas versões do PHP rodando!

_Obs: Utilizo o ubuntu 12.04, então, os comandos serão voltados para linux. Caso vocês sintam a necessidade de um tutorial para windows ou mac é só pedir nos comentários ;)_

### Antes de começarmos, atualize sua máquina

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```

### Instale algumas dependências

```shell
$ sudo apt-get install build-essential
```

Esse comando trás um pacote com várias aplicações para compilar/instalar possíveis aplicações utilizadas por você. Exemplos do que é instalado: pacote make, compilador c++, automake, dentre outras libs.

Não sei se será seu caso, mas quando compilei o php tive alguns problemas com algumas dependências. Caso você tenha o mesmo problema ou queira se previnir, instale também as seguintes dependências:

```shell
$ sudo apt-get install libxml2-dev libcurl4-openssl-dev pkg-config libbz2-dev libpng-dev libmcrypt-dev libapache2-mod-php5
```

### Instale o git

```shell
$ sudo apt-get install git
```

### Instale o LAMP Server (Apache, MySQL e PHP)

```shell
$ sudo apt-get install lamp-server^
```

Ao rodar o comando, você deverá inserir sua senha do MySQL e aguardar a instalação. Finalizada a instalação, abra uma aba no seu navegador e acesse **http://localhost/**.

Você verá "It Works!"

_Obs: Não esqueça do circunflexo(^) no final, pois sem ele o comando não irá funcionar._

_Para os curiosos, o acento circunflexo(^) no final do comando é necessário para que o meta-pacote(lamp-server) seja requisitado no tasksel,que é uma ferramenta do debian que permite instalar múltiplos pacotes de softwares._

### Agora é onde a brincadeira começa!

O php-farm é um script que permite instalar várias versões do PHP em um mesmo ambiente de desenvolvimento, ou seja, você pode rodar as versões 5.2, 5.3 e 5.4 ao mesmo tempo! Melhor que isso só fazer deploy na sexta às 17h e não ter problemas.

Para instalar, faça o clone do repositório dentro da pasta **/opt/phpfarm**:

```shell
$ sudo git clone https://github.com/cweiske/phpfarm.git /opt/phpfarm
```

Após a instalação, vamos começar a compilar nossas versões do PHP. Utilizarei a versão 5.4.32 como exemplo, mas você pode baixar qualquer, eu disse QUALQUER versão do PHP pois o php-farm utiliza o [Museum PHP](http://museum.php.net/ "Museum PHP") como repositório para download das versões.

Crie um arquivo de configuração personalizado(**custom-options-*.sh**) para instalar a versão do php desejada

```shell
$ sudo nano /opt/phpfarm/src/custom-options-5.4.32.sh
```

E insira essas configurações no arquivo:

```shell
#!/bin/bash
#gcov='--enable-gcov'
configoptions="\
--enable-bcmath \
--with-mysqli \
--with-curl \
--with-gd \
--enable-calendar \
--enable-exif \
--enable-ftp \
--enable-mbstring \
--enable-pcntl \
--enable-soap \
--enable-sockets \
--enable-wddx \
--enable-zip \
--with-zlib \
--with-gettext \
--with-openssl \
--with-pdo-mysql \
--with-mcrypt \
--enable-soap \
--with-bz2 \
--with-mysql \
--with-iconv \
$gcov"
```

Agora faça a compilação do arquivo

```shell
$ cd /opt/phpfarm/src
$ sudo ./compile.sh 5.4.32
```

### Verificando as versões instaladas

Para verificar se a instalação deu certo, rode os seguintes comandos

```shell
$ /opt/phpfarm/inst/bin/php-5.4.32 -v
$ /opt/phpfarm/inst/bin/php-cgi-5.4.32 -v
```

Onde na saída de cada comando deverá ser informado a versão do php(no nosso caso é a 5.4.32) e o Server API(cli e cgi-fcgi respectivamente).

_Obs: Todas as versões baixadas através do phpfarm serão instaladas em **phpfarm/inst/php-$version/**._

### Configurando nosso apache

Habilite o módulo **fastcgi**

```shell
$ sudo a2enmod fastcgi
```
Agora vamos configurar o apache para rodar no FastCGI.

```shell
$ sudo nano /etc/apache2/apache2.conf
```
Insira esse trecho antes de **Include mods-enabled/*.load**

```shell
FastCgiServer /var/www/cgi-bin/php-cgi-5.4.32 -idle-timeout 240
ScriptAlias /cgi-bin-php/ /var/www/cgi-bin/
```
Abra o arquivo de configurações do FastCGI

```shell
$ sudo vim /etc/apache2/mods-enabled/fastcgi.conf
```
E comente esta linha

```shell
FastCgiIpcDir /var/lib/apache2/fastcgi
```
### Servidor finalizado, agora vamos preparar nossa estrutura

```shell
$ cd /var/www
$ sudo mkdir cgi-bin
```
Para cada versão instalada você deverá criar um arquivo nessa pasta(**php-cgi-$version**)

```shell
$ cd cgi-bin
$ sudo nano php-cgi-5.4.32
```

Insira o conteúdo abaixo no arquivo criado

```shell
#!/bin/bash
PHPRC="/opt/phpfarm/src/php-5.4.32/lib/php.ini"
export PHPRC

PHP_FCGI_CHILDREN=3
export PHP_FCGI_CHILDREN

PHP_FCGI_MAX_REQUESTS=5000
export PHP_FCGI_MAX_REQUESTS

exec /opt/phpfarm/inst/bin/php-cgi-5.4.32
```
Logicamente que para cada arquivo de versão diferente o path do conteúdo terá que ser modificado de acordo com a versão.

Agora transforme o arquivo em um executável

```shell
$ sudo chmod +x /var/www/cgi-bin/php-cgi-5.4.32
```
### Falta apenas configurar nosso maravilhoso VirtualHost

Ao criar um arquivo VirtualHost, você terá que inserir um trecho no qual vai criar toda a mágica das múltiplas versões.

Crie o arquivo do VirtualHost

```shell
$ sudo nano /etc/apache2/sites-available/php54.dev
```

Insira esse trecho dentro das tags **Directory**

```shell
# Trecho da mágica!
AddHandler php-cgi .php
Action php-cgi /cgi-bin-php/php-cgi-5.4.32
<FilesMatch "\.php$">
    SetHandler php-cgi
</FilesMatch>
```

Você pode pegar esse VirtualHost configurado como exemplo

```shell
<VirtualHost *:80>
    ServerName php54.dev
    DocumentRoot /var/www/html/php54

    <Directory /var/www/html/php54>
        Options Indexes FollowSymlinks Includes ExecCGI
        AllowOverride All
        Order allow,deny
        Allow from all
        Require all granted

        AddHandler php-cgi .php
        # Não esqueça de mudar o arquivo quando for criar um novo VirtualHost em outra versão do PHP
        Action php-cgi /cgi-bin-php/php-cgi-5.4.32
        <FilesMatch "\.php$">
            SetHandler php-cgi
        </FilesMatch>
    </Directory>

    # Configure os paths do log para não ter erro ao reiniciar o apache
    #ErrorLog /var/www/test/log/error.log
    #LogLevel info
    #CustomLog /var/www/test/log/access.log combined
</VirtualHost>
```

### E para finalizar...

Insira o domínio utilizado no VirtualHost no seu arquivo **/etc/hosts**

```shell
$ sudo nano /etc/hosts
```

Ative o VirtualHost criado

```shell
$ sudo a2ensite php54.dev
```

Vamos aproveitar e instalar o **phpMyAdmin**

```shell
$ sudo apt-get install phpmyadmin
```

Selecione **Apache2** e marque **Yes **para permitir que o phpMyAdmin seja configurado automaticamente. Insira a senha do root do MySQL e depois insira a senha de acesso ao painel.

Acesse as configurações do Apache

```shell
$ sudo nano /etc/apache2/apache2.conf
```

Inclua essa linha no final do arquivo
```shell
Include /etc/phpmyadmin/apache.conf
```

E por fim, reinicie o Apache
```shell
$ sudo service apache2 restart
```

Acesse **http://localhost/phpmyadmin** para testar a do phpMyAdmin instalação.

### Será que deu certo?

Crie um arquivo php para verificar se deu certo
```shell
$ sudo nano /var/www/html/info.php
```

Insira a função **phpinfo()** e copie para a pasta **/var/www/html/php54**
```shell
$ sudo cp /var/www/html/info.php /var/www/html/php54/info.php
```

Acesse:

**http://localhost**

{{< rawhtml >}}
<a href="/images/localhost.png">
  <img src="/images/localhost-thumbnail.png" title="localhost">
</a>
{{< /rawhtml >}}

**http://php54.dev**
{{< rawhtml >}}
<a href="/images/phpfarm-5432.png" href="">
  <img src="/images/phpfarm-5432-thumbnail.png" title="phpfarm-5.4.32">
</a>
{{< /rawhtml >}}

Lindo né não?

Agora sente, pare e lembre de todos aqueles momentos difíceis que você passou por não ter um ambiente como esse instalado na sua máquina. Não chore, pois agora você é um desenvolvedor PHP feliz e pronto para qualquer projeto!

Lembrando que para instalar qualquer outra versão, basta executar os mesmos passos.

Um abraço e até o próximo post!

### #UPDATE - 13/04/2016

Devido a alguns pedidos do tutorial deste post para Windows, indico o link abaixo do canal da [Code Education](https://www.youtube.com/channel/UCIlafifr-E57jct9knCrZzw) para solução de múltiplas versões PHP no Windows utilizando o servidor embutido do PHP.

<iframe width="100%" height="420" src="https://www.youtube.com/embed/81EMVz1rnoE" frameborder="0" allowfullscreen></iframe>

Infelizmente, o PHPFarm não possui suporte para Windows, apenas para sistemas unix, e para resolver isso terei que mexer no compilador do mesmo para que seja possível rodar em ambiente Windows.

Enquanto não faço isso, sugiro que assistam o vídeo postado acima e qualquer dúvida não hesitem em postar nos comentários abaixo.

Vlw negada ;)

**Obs: Pretendo publicar um post essa semana ou na próxima sobre servidor embutido do PHP, que também uma forma de rodar várias versões do PHP e é um ótimo webserver para desenvolvimento local.**
