---
author: "Dorian Neto"
title: "Filtragem de dados - Introdução e Manipulação de tipos"
date: "2014-02-14"
tags: ["dica", "php"]
---

Vejo muitos desenvolvedores recebendo dados de fontes externas ou até mesmo de fontes internas de uma aplicação e não fazem a devida filtragem desses dados. Mal sabem eles que a não filtragem dos dados pode comprometer seriamente a segurança de uma aplicação, deixando graves brechas para que usuários mal intencionados façam o que quiser.

## E o que é exatamente filtragem de dados ?
É o processo onde você irá definir que tipo de dado você espera como retorno.

Vamos supor que você tem uma página que recupera o id de uma notícia via GET e você usa este id para procurar a notícia no banco e retornar seus detalhes, mas você não filtra esse id.

```php
<?php
// URI: http://www.seusite.com.br/noticia.php?id=5
$id = $_GET[‘id’];
echo $id;
```

O código acima contém uma grande falha, pois não existe uma filtragem do valor externo (id). Desta forma, um usuário mal intencionado poderá inserir qualquer coisa através da uri, podendo comprometer sua aplicação ou banco de dados.
O correto seria filtrar o valor com o seu devido tipo de dado, que nesse caso seria um número inteiro pois estamos lidando com identificadores de registros(id’s).

Abaixo listarei uma das diversas maneiras de efetuar a filtragem de dados. Falarei mais sobre os outros em futuros posts.

## Manipulação de tipos (Type casting). O que é isso ?
O PHP é uma linguagem de tipagem fraca, ou seja, não é necessário informar qual o tipo de dado um determinado valor possui pois no processo de interpretação do código o interpretador converte o valor para um determinado tipo de dado.

```php
<?php
echo 10 + ‘5 teste’; // Retorna 15
echo 10 + ‘teste 5’; // Retorna 10
echo 10 + ‘teste’; // Retorna 10
```

No exemplo acima, na primeira linha, vimos que ao tentar somar um inteiro(10) com uma string onde um número inteiro(5) está no começo da string, o interpretador converte a string para inteiro e efetua a soma entre 2 números inteiros(10 e 5). Já na segunda linha, tentamos somar um inteiro(10) com uma string que não possui um inteiro no início, logo, o interpretador considera a string como 0 e efetua a soma(10 e 0). A mesma coisa acontece ao tentar efetuar a soma na terceira linha.

Mas o PHP não te impede de tipar valores, com a manipulação de tipos você pode converter um valor para um tipo de dado de sua preferência.

```php
<?php
// URI: http://www.seusite.com.br/noticia.php?id=5
$id = (int) $_GET[‘id’];
var_dump($id);
```

Executando o código acima, você verá que o valor retornado é um inteiro e que se o valor da variável $id não for um número inteiro, a mesma terá o valor 0 como retorno.

Abaixo listo os tipos de dados permitidos para manipulação:
- (int) ou (interger)
- (bool) ou (boolean)
- (float) ou (double) ou (real)
- (string)
- (array)
- (object)
- (unset)

Mais alguns exemplos de manipulação de tipos:

```php
<?php
// Array to Object
$array = array(
	'nome' =&gt; 'Dorian Sampaio',
	'idade' =&gt; 20,
	'sexo' =&gt; 'Masculino'
);

var_dump($array);
$object = (object) $array;
var_dump($object);

echo $object-&gt;nome;
echo $object-&gt;idade;
echo $object-&gt;sexo;

/* ------------------------------ */

// Float to Int
$float = 2.3;
var_dump($float);
$float_to_int = (int) $float;
var_dump($float_to_int);

/* ------------------------------ */

// Int to Bool
$int = 13;
var_dump($int);
$int_to_bool = (bool) $int;
var_dump($int_to_bool);

/* ------------------------------ */

// String to Unset
$string = 'Dorian Sampaio';
var_dump($string);
$string_to_unset = (unset) $string;
var_dump($string_to_unset);
```

As possibilidades são infinitas ! Use sua imaginação ;)

## Conclusão (Manipulação de tipos)
Ao usarmos manipulação de tipos passamos segurança e controle ao nosso código, pois o mesmo saberá que tipo de dado aquela determinada tarefa necessita para se executada, e caso o valor não corresponda com o esperado o código também estará preparado para executar alguma ação.

Existem muitos questionamentos sobre usar ou não usar a manipulação de tipos no PHP por conta do interpretador já fazer esse trabalho para você, eu particularmente uso quando quero ter certeza de que um determinado valor seja do tipo que eu preciso (Exemplo: campo de moeda em um formulário), agora cabe a você encontrar os momentos em que seja necessário usar ou não.

Um abraço e até o próximo post !
