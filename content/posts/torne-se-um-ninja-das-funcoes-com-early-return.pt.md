---
author: "Dorian Neto"
title: "Torne-se um ninja das funções com Early Return"
date: "2018-01-16"
tags: ["boas praticas", "refatoracao", "early return"]
cover:
  image: "images/torne-se-um-ninja-das-funcoes-com-early-return-thumbnail.jpg"
  relative: false
---
Escrever código elegante e legível é um dos nossos objetivos diariamente, porém, infelizmente isso não ocorre na maioria das vezes. Pressão para entrega de features, cansaço etc, são alguns dos vários fatores que podem contribuir para que esse objetivo não seja alcançado.

Ao longo dos anos, diversos conceitos de boas práticas foram documentados e quando aplicados em nosso dia a dia facilitam conquistar esse objetivo.

Hoje quero abordar um conceito que irá te transformar em um ninja das funções, fazendo com que seu código fique mais rápido (like a ninja!), legível e fácil de manter!

## Early Return: Conceito e Benefícios

O princípio deste conceito diz que você deve se preocupar em **retornar o resultado da função o quanto antes**, ou seja, você irá estruturar o código da função de forma que retorne o mais rápido possível o valor esperado.

E quais são os benefícios para o código?

- Aumento da legibilidade;
- Aumento da performance;
- Facilita a manutenção;
- Previne Bugs;

## Quero ver isso na prática!
Irei utilizar o código abaixo (retirado da lib de integração em PHP do [pagseguro](https://github.com/pagseguro/php)) como exemplo para entendermos na prática a aplicação do conceito.

```php
public static function formatDate($date)
{
    $format = DateTime::ATOM;
    if ($date instanceof DateTime) {
        $d = $date->format($format);
    } elseif (is_numeric($date)) {
        $d = date($format, $date);
    } else {
        $d = (string) $date;
    }
    return $d;
}
```

Apesar de não ser um código tão complexo, sua legibilidade fica um pouco prejudicada devido ao uso do `else if` e `else`, podendo também refletir de forma prejudicial na manutenção.

*Existe muita discussão sobre a utilização de else if e else. Eu particularmente evito utilizar pois acho que não traz legibilidade para o código. Além disso, na maioria das vezes a utilização abre portas para o uso de outras condições aninhadas, o que pode prejudicar ainda mais a legibilidade e manutenabilidade do código. Claro que existem momentos que é necessário a utilização, mas evito sempre que posso.*

"E como podemos melhorar?"

Aplicando o conceito do Early Return no código obteremos o seguinte resultado:

```php
public static function formatDate($date)
{
    $format = DateTime::ATOM;

    if ($date instanceof DateTime) {
        return $date->format($format);
    }

    if (is_numeric($date)) {
        return date($format, $date);
    }

    return (string) $date;
}
```

Removendo o `else if` e `else` conseguimos aumentar a legibilidade do código, e logo depois, aplicamos o conceito de Early Return, estruturando o código de forma que retorne o mais rápido possível o valor esperado. Com isso, conseguimos melhorar também a manutenabilidade do código e, consequentemente, prevenimos possíveis bugs.

"Blz, o ganho na legibilidade e manutenabilidade eu entendi, mas onde entra o ganho de performance?"

No código não refatorado a execução iria passar pelas condições com o intuito de encontrar o valor correto e apenas no final da função seria retornado o mesmo. Já no código refatorado nós acabamos com esse problema, pois nos preocupamos em retornar o resultado da função o quanto antes, ou seja, se a primera condição for aceita, retornamos o valor que condiz com a condição e finalizamos a execução da função.

## Conclusão
Utilizei um exemplo curto de código e de baixa complexidade, mas imagina isso aplicado em um software robusto.

Apesar de ser um conceito bem simples, quando aplicado em nossos hábitos de codificação, podemos ter um resultado bem satisfatório!

Utilize essa técnica no seu dia a dia e me conte nos comentários seus resultados!
