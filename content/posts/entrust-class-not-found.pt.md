---
author: "Dorian Neto"
title: "Entrust - Class not found"
date: "2014-10-29"
tags: ["dica", "php", "laravel", "framework", "entrust"]
---

Ultimamente venho utilizando bastante o Laravel para meus projetos pessoais e do trabalho. Sem dúvida é um framework fantástico e nesse período de utilização percebi que não é exagero o que dizem de bom sobre ele.

Hoje venho trazer uma dica bem simples a respeito da utlização do pacote [Entrust](https://github.com/Zizaco/entrust "Entrust") com namespace. Ao utilizar as classes do entrust (normalmente Permission e Role) com namespace você pode ter dificuldade em fazer com que o Laravel encontre essas classes, resultando no seguinte erro: **Class not found**.

Quando tive esse problema achei que um `$ composer dump-autoload` resolveria o problema, mas me enganei. Tentei resolver o problema de todas as formas possíves, até que fui procurar no Google. Nas pesquisas que fiz, encontrei no [Stack Overflow](http://stackoverflow.com/questions/18246713/why-cant-my-class-be-found-when-its-in-the-same-namespace) uma dúvida igual a que eu tinha , mas nenhuma resposta me ajudou. Fiz o que me restava: fuçar o código do pacote. Alguns segundos depois de fuçar as pastas e arquivos encontrei a solução !

## A solução

Existe um arquivo de configuração dentro da pasta do pacote e nele tem um array com o alias do namespace da classe.

{{< rawhtml >}}
<script src="https://gist.github.com/dorianneto/50ea407d00dffda6370b.js"></script>
{{< /rawhtml >}}

Para resolver basta inserir o namespace onde a classe se encontra, rodar o dump-autoload e pronto !

{{< rawhtml >}}
<script src="https://gist.github.com/dorianneto/0e7f0221a17872f931f4.js"></script>
{{< /rawhtml >}}

No início tive um pouco de dificuldade na utilização de namespaces no framework, pois tive que configurar no composer a utilização do autoload da PSR-0, mas depois de tudo configurado fica muito mais organizado e padronizado.

Um abraço e até o próximo post !
