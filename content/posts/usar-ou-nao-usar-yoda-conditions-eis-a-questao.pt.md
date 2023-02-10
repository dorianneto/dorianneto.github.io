---
author: "Dorian Neto"
title: "Usar ou não usar Yoda Conditions, eis a questão"
date: "2020-03-03"
tags: ["boas praticas", "yoda conditions"]
cover:
  image: "images/usar-ou-nao-usar-yoda-conditions-eis-a-questao.jpg"
  relative: false
---
{{< rawhtml >}}
<figure>
  <img src="/images/usar-ou-nao-usar-yoda-conditions-eis-a-questao.jpg" alt="Photo credit: @nadir_syzygy" title="Usar ou não usar Yoda Conditions, eis a questão" width="100%" />
  <figcaption><small>Photo credit: @nadir_syzygy - https://unsplash.com/@nadir_syzygy</small></figcaption>
</figure>
{{< /rawhtml >}}

Recentemente me deparei com um comentário de um colega do trabalho em um Pull Request onde ele estava sugerindo a utilização de Yoda Conditions. Faz um bom tempo desde a última vez que ouvi falar sobre esse programming style, por conta disso (e também por eu achar a utilização bastante controvérsia) resolvi escrever um pouco sobre o assunto.

## O que é Yoda Conditions?
Yoda Conditions (também conhecido como "Yoda Notation") evita problemas gerados por erros de escrita em expressões condicionais de igualdade.

A aplicação do conceito é bem simples e consiste em inverter a ordem dos valores comparados em uma condição, onde o valor que não pode ser atribuído deve ficar na esquerda e o outro valor na direita, evitando um possível retorno válido inesperado através da criação de um cenário onde um erro será emitido no caso de existir um erro de escrita no operador da condição.

*Lembrando que isso vale apenas para determinados tipos de operadores de condição (vamos falar mais sobre isso em instantes).*

## Yoda Conditions na prática
Normalmente, a primeira impressão que se tem ao ler o código abaixo é que isso é muito improvável de acontecer, mas garanto que é mais comum do que se imagina (é só lembrar que um programming style foi criado apenas pra resolver esse tipo de situação hehe).

```php
if ($slug = 'title-example') {
    // A intenção aqui era comparar o valor da variável $slug com a string
    // "title-example", mas ao invés disso uma atribuição está sendo feita
    // e a condição será validada.
}
```

Fico imaginando os inúmeros problemas que esse erro simples pode gerar em um sistema. Pensa ai.

O Yoda Conditions evita exatamente esse tipo de problema:

```php
if ('title-example' = $slug) {
    // Lembra do conceito que vimos minutos atrás? Invertendo os valores
    // da condição nós estamos criando um cenário onde, se houver um erro
    // de escrita no operador da condição, um erro será emitido e o problema
    // da condição ser validada inesperadamente não vai mais existir.
}

// Output: Parse error: syntax error, unexpected '=' in Standard input code on line X
```

O conceito pode parecer estranho ou confuso, mas entenda isso como uma espécie de hábito adotado para que você não seja surpreendido com uma possível condição validada inesperadamente, salvando seu emprego e sua saúde mental.

## Quando usar?
É indicado utilizar Yoda Conditions **somente** em expressões condicionais de igualdade (`==`,`===`,`!=`,`!==`), devido a probabilidade ser maior de gerar uma atribuição ao invés de uma comparação quando algum erro de escrita ocorrer.

Não é indicado a utilização de Yoda Conditions em outros operadores (por exemplo, os relacionais) devido a dificuldade gerada na leitura da expressão.

Existem vários casos onde a utilização pode parecer confusa, então, vamos abordar alguns dos casos mais comuns:

**Caso 01**
```php
if (getSlug() == 'title-example') {
    // Nesse caso a aplicação do Yoda Conditions não é necessária visto que
    // uma função não pode ter um valor atribuído a ela, ou seja, mesmo que
    // você cometa um erro de escrita (use = ao invés de ==) um erro será gerado.
}
```

**Caso 02**
```php
if ($products >= 2) {
    // Lembra do que falamos a respeito de operadores relacionais?
}

// Imagina só se a gente aplica Yoda Conditions
// nesse caso. Veja só como ficaria:

if (2 <= $products) {
    // A leitura fica bem prejudicada.
}
```

**Caso 03**
```php
if ($slug == $product->slug) {
    // Este é um caso que as vezes gera um pouco de dúvida, mas é bem simples.
    // Já que os 2 valores comparados são variáveis, inverter a ordem
    // não vai gerar o efeito que queremos ter ao utilizar Yoda Conditions.
}
```

Além disso, é sempre importante verificar se o Yoda Conditions faz parte do code standards do framework, biblioteca, linguagem, etc que você esteja utilizando.

Com relação ao PHP, existem 2 soluções que são bem conhecidas e que utilizam esse programming style:

- [Wordpress](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/#yoda-conditions)
- [Symfony](https://symfony.com/doc/current/contributing/code/standards.html#structure)

*Algumas linguagens não possuem a necessidade da utilização do Yoda Conditions (por exemplo, Python), pois não permitem atribuição em condições.*

## Usar ou não usar?
Após conversar com algumas pessoas sobre o Yoda Conditions, percebi que a decisão é algo mais pessoal do que técnico, então, achei interessante deixar essa decisão com você.

Porém, um post sem conclusão é meio frustrante, certo? Resolvi então compartilhar minhas reflexões sobre o assunto como uma forma de te ajudar a chegar na resposta dessa pergunta.

## Minhas reflexões
Como já estamos cansados de saber, não existe uma bala de prata na programação. Como programadores, devemos entender e analisar bem uma situação para ser capaz de utilizar com segurança aquilo que melhor vai atender, sem nunca esquecer de que não seremos os únicos a utilizar aquele código.

Apesar de resolver um problema bastante específico, Yoda Conditions pode trazer um grande problema para o seu código que é a falta de legibilidade. Os maiores críticos desse programming style utilizam o argumento de que não é viável a utilização devido a trade-off gerado, ou seja, o fato de que para evitar um problema gerado por erro de escrita você precisa alterar a forma natural com que estamos acostumados a comparar valores, tendo como consequência a legibilidade do código prejudicada.

Existe uma frase muito famosa do Uncle Bob (Robert C. Martin) a respeito disso:

> “I dislike any statement in code that causes the reader to do a double-take. Code that protects the author at the expense of the reader is flawed code.”

Por considerar legibilidade de código algo essencial no processo de desenvolvimento de um software, tudo isso me faz pensar que alternativas são muito bem vindas (hehe). A alternativa mais simples e conhecida são os testes unitários, pois através deles você consegue garantir que seu código está funcionando da maneira como deveria.

***

Apesar do post ter ficado longo e um pouco contraditório ao falar sobre uma alternativa ao Yoda Conditions, acho que conseguimos abordar bem o conceito, relembrar alguns pontos importantes sobre nossa profissão e criar boas reflexões.

Espero que tenha sido útil pra você!

*Se ficou alguma dúvida, se tem alguma sugestão, elogio ou se discordou de algo que eu escrevi, deixa nos comentários!*
