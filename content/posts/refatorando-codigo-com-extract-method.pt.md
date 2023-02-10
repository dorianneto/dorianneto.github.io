---
author: "Dorian Neto"
title: "Refatorando código com Extract Method"
date: "2018-01-30"
tags: ["boas praticas", "refatoracao", "extract method"]
cover:
  image: "images/torne-se-um-ninja-das-funcoes-com-early-return-thumbnail.jpg"
  relative: false
---
Com certeza você já deve ter visto, ou até mesmo criou, funções ou métodos que possuem diversas responsabilidades. Não é novidade para nenhum de nós que isso não é uma boa prática e que pode causar diversos problemas na estrutura do código.

Existe uma analogia com a Fórmula 1 que aborda esse tipo de problema. Quando um carro faz uma parada (Pit stop), diversas pessoas exercem uma tarefa para que o resultado final do objetivo seja atingido (trocar peças e reabastecer o carro), onde cada uma dessas pessoas possui uma única responsabilidade. Agora imagine o caos que seria se ao invés de um grupo de pessoas, apenas um fosse responsável por executar todas as tarefas e consequentemente assumir todas as responsabilidades. É muito claro que a performance seria reduzida drasticamente e a probabilidade de erros durante a execução das tarefas seria bem maior.

Além disso, a duplicidade de código é algo que também não é difícil de se ver. Além de ir contra diversos conceitos, paradigmas etc, dificulta a manutenção do código.

Mas será que existe uma forma de resolver tudo isso? Não só existe, como existem várias, e hoje vou abordar a técnica de refatoração Extract Method, que irá nos auxiliar na estruturação de funções (ou métodos) mais legíveis, com uma única responsabilidade e redução da duplicidade de código.

## O que é Extract Method?
Extract method é uma técnica de refatoração que tem como principal solução agrupar um trecho de código em uma nova função ou método, a fim de resolver problemas de responsabilidade e/ou duplicidade de código.

> "Sério? É só isso?"

Simples né?

## Quero ver isso na prática!
Abaixo temos um exemplo didático de uma função que manipula os dados antes de serem inseridos no carrinho de compras. Repare que a função `before_add_shopping_cart()` possui 2 responsabilidades, que é manipular os dados dos produtos (linha 10 a 17) e disparar um email (linha 20 a 27), e trechos de código duplicado (linha 12 e 16).

{{< rawhtml >}}
<script src="https://gist.github.com/dorianneto/9b6e122f4f12b1d431cefe1d0cfd153e.js"></script>
{{< /rawhtml >}}

Após analisar o código e compará-lo com as reflexões feitas até agora, é muito claro que esse código clama por refatoração.

Aplicando a técnica Extract Method, chegamos ao seguinte resultado:

{{< rawhtml >}}
<script src="https://gist.github.com/dorianneto/14f7cd42981f0c24a77a2381b95bebaa.js"></script>
{{< /rawhtml >}}

Já que o nosso principal intuito aplicando a técnica é agrupar trechos de código que possam vir a gerar problemas de responsabilidade e duplicidade de código, criamos a função `email_to_sales_team()` que é responsável apenas por disparar um email e chamamos a mesma na função principal `before_add_shopping_cart()`, eliminando o problema de múltiplas responsabilidades dentro da mesma. Conseguimos também eliminar o problema de duplicidade de código criando a função `format_currency()` e chamando a mesma nos locais que era gerado a duplicidade.

Como resultado final da refatoração nós temos uma função (`before_add_shopping_cart()`) com uma única responsabilidade e livre de código duplicado, o que torna mais fácil a leitura e manutenção do código. Além disso, conseguiremos utilizar as funções geradas em outras partes do código, tornando nosso código mais otimizado e reutilizável.

## Conclusão
Apesar de ser uma técnica bem simples, quando aplicada, conseguimos ter ótimos retornos em termos de estruturação do código.

Entender as técnicas de refatoração existentes nos ajuda não só nos momentos de refatoração, mas também em nosso dia a dia. Pense nisso!

Utilize essa técnica no seu dia a dia e me conte nos comentários seus resultados!
