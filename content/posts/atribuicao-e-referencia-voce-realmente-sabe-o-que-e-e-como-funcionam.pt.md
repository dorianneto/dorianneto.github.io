---
author: "Dorian Neto"
title: "Atribuição e Referência - Você realmente sabe o que é e como funcionam ?"
date: "2014-03-28"
tags: ["dica", "php"]
---

Estava lendo alguns posts em um fórum e acabei me deparando com um dúvida que para iniciantes e até para algumas pessoas experientes é bem comum.

Você realmente sabe qual a diferença entre Atribuição e Referência ?

## Atribuição
Uma das primeiras coisas que você aprende ao estudar qualquer linguagem de programação é atribuir um valor a alguma variável. Esse processo consiste em copiar um valor para um determinado ponto da memória, onde esse valor será chamado através do nome da variável, que é a forma de identificar o ponto armazenado na memória. Lembrando que esse valor só será modificado ao término da execução do programa ou caso o valor da variável seja modificado em tempo de execução.

Como mostra o exemplo abaixo, na atribuição nós podemos copiar o valor de uma variável para uma nova variável ou até para a mesma variável.

```php
<?php
$a = 5;
$a = $a + 7;
echo $a; // Será exibido o número 12
```

Na primeira linha do exemplo acima, atribuímos o valor 5 a variável $a. Já na segunda linha, efetuamos uma soma entre a variável $a (que já foi atribuído o valor 5) e somamos ao número 7, depois, atribuímos um novo valor a variável $a e por último exibimos o valor da variável.

```php
<?php
$a = ($b = 3) * 2;
echo $a; // Será exibido 6
echo $b; // Será exibido 3
```

No exemplo acima nós atribuímos o valor 3 a variável $b, depois nós multiplicamos por 2 o valor de $b e atribuímos o resultado a variável $a.

## Referência
Se na atribuição nós fazemos a cópia de um valor atribuído a uma variável para um determinado ponto da memória, na referência nós fazemos com que as variáveis apontem para o mesmo local da memória.

Vamos entender melhor no exemplo abaixo.

```php
<?php
$a = 2;
$a =&amp; $b;

$b = 4;

echo $a; // Será exibido o número 4
echo $b; // Será exibido o número 4
```

Ao executar o código acima, alguns irão estranhar o valor exibido, pois atribuímos o valor 4 apenas para a variável $b e a variável $a também exibiu o número 4.

Veja que na linha 1 nós atribuímos o valor 2 a variável $a, logo depois, nós informamos que $a faz referência a $b, ou seja, aponta para o mesmo local da memória. Na linha 4, nós atribuímos o valor 4 para a variável $b, e como as duas variáveis apontam para o mesmo local da memória, o valor da variável $a também é 4.

Podemos também passar parâmetros por referência:

```php
<?php
function soma(&amp;$var) {
$var++;
}

$a = 2;
soma($a);

echo $a; // Será exibido o valor 3;
```

Na linha 5 nós atribuímos um valor a variável $a. Na linha 6, passamos o valor de $a como parâmetro na função soma. Mas existe algo de diferente, o parâmetro da função soma está sendo passado por referência, isso quer dizer que o valor que será passado como parâmetro terá seu valor modificado juntamente com o valor do parâmetro, pois agora os 2 estão apontando para o mesmo local da memória, independentemente do escopo.

Faça um teste, retire o sinal de referência (&amp;) do parâmetro e execute o programa. Você verá que o valor de $a será 2, pois o valor de $a foi passado por parâmetro por meio de atribuição e foi modificado apenas dentro do escopo da função.

Agora vamos supor que a variável $a não tenha sido criada.

```php
<?php
function soma(&amp;$var) {
$var++;
}

soma($a);

echo $a; // Será exibido o valor 1;
```

Quando um valor é passado por referência sem ter sido criado, o php cria essa variável com o valor null. A mesma coisa acontece para valores atribuídos ou retornados.

## Conclusão
É sempre bom tentar entender como as coisas funcionam. Atribuição e referência são 2 coisas que usamos todos os dias em nossos trabalhos, e muitas pessoas não sabem como realmente funcionam e nem procuram saber. Estimulem sua curiosidade ;)

Um abraço e até o próximo post !
