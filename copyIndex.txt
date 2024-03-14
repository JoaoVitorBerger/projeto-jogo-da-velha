
const submitPlayerOne = document.querySelector('.button-submit-name-player')
let namePlayerOne = document.querySelector('.participant-name-1')
let playerOne = document.querySelector('.name-value-player1')
let guardarValorXouO = ""
let valuePlayerOne = sortearXouBola()

let namePlayerTwo = document.querySelector('.participant-name-2')
let valuePlayerTwo = sortearXouBola()

while (valuePlayerTwo.result == valuePlayerOne.result) {
    valuePlayerOne = sortearXouBola()
    valuePlayerTwo = sortearXouBola()
    console.log(valuePlayerOne.result)
    console.log(valuePlayerTwo.result)
}
const submitPlayerTwo = document.querySelector('.button-submit-name-player-2')
let playerTwo = document.querySelector('.name-value-player2')

let divBox = document.getElementsByClassName('box')
let arrayFromDivBox = Array.from(divBox)


let playerOfTheTurn = document.querySelector('.player-turn-name')

submitPlayerOne.addEventListener('click', function () {
    if (playerOne.value == "") {
        if (namePlayerOne.innerHTML == "") {
            alert('Insira um nome no campo, não é possível avançar desse jeito')
        } else {
            alert('Já existe um nome preenchido nesse campo')
        }
    } else {
        namePlayerOne.innerHTML = playerOne.value + '<br/>' + valuePlayerOne.guardarValorXouO

    }


})

submitPlayerTwo.addEventListener('click', function () {

    if (playerTwo.value == "") {
        if (namePlayerTwo.innerHTML == "") {
            alert('Insira um nome no campo, não é possível avançar desse jeito')
        } else {
            alert('Já existe um nome preenchido nesse campo')
        }
    } else {
        namePlayerTwo.innerHTML = playerTwo.value + '<br/>' + valuePlayerTwo.guardarValorXouO

    }
    iniciarJogadas()

})


function sortearJogador() {
    const value = Math.round(Math.random() + 1)
    console.log(value)
    return value
}


function sortearXouBola() {
    const result = sortearJogador()
    console.log(result)
    if (result == 1) {
        guardarValorXouO = "X"
    } else {
        guardarValorXouO = "O"
    }
    console.log(guardarValorXouO)

    return { guardarValorXouO, result }
}

function iniciarJogadas() {


    if (namePlayerTwo.innerHTML.lastIndexOf('X') > -1) {
        alert('Quem da a saida é o jogador de número 2')
        playerOfTheTurn.innerText = playerTwo.value
    }
    else {
        if (namePlayerTwo.innerHTML.lastIndexOf('O') > -1) {
            alert('Quem da a saida é o jogador de número 1')
            playerOfTheTurn.innerText = playerOne.value
        }
    }

    let jogadorAtual = "";
    passandoJogadas()

    
    
    function passandoJogadas() {
        if(!jogadorAtual || jogadorAtual === playerTwo.value){
            jogadorAtual = playerOne.value
        }else{
            jogadorAtual = playerTwo.value
        }

        playerOfTheTurn.innerText = jogadorAtual

        document.addEventListener('pointerdown', function(event){
            let targetElement = event.target
            let targetElementClassName = targetElement.classList[0]

            arrayFromDivBox.forEach(function(element){
                let classNameElement = element.className

                if(targetElementClassName == classNameElement && targetElement.innerText == ""){
                    if(jogadorAtual == playerOne.value){
                        targetElement.innerText = valuePlayerOne.guardarValorXouO
                        verificarResultado()
                        passandoJogadas()
                    }else{
                        targetElement.innerText = valuePlayerTwo.guardarValorXouO
                       verificarResultado()
                        passandoJogadas()
                    }
                }
                
            })

        })
    }
    function verificarResultado() {
       
        // Obtendo todos os elementos com a classe 'box'
        let elementosDoTabuleiro = document.querySelectorAll('.box');
    
        // Convertendo NodeList para Array para facilitar a manipulação
        let arrayDoTabuleiro = Array.from(elementosDoTabuleiro);
    
        // Função auxiliar para verificar se uma linha, coluna ou diagonal possui todos os mesmos valores
        function verificaVencedor(a, b, c) {
            return a.innerText !== '' && a.innerText === b.innerText && b.innerText === c.innerText;
        }
    
        // Função para verificar se o tabuleiro está completamente preenchido (empate)
        function tabuleiroCompleto() {
            return arrayDoTabuleiro.every(function (elemento) {
                return elemento.innerText !== '';
            });
        }
    
        // Array de todas as combinações possíveis para ganhar
        const combinacoesVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]              // Diagonais
        ];
    
        // Verificando se há um vencedor em alguma das combinações
        for (let combinacao of combinacoesVencedoras) {
            let [a, b, c] = combinacao;
            if (verificaVencedor(arrayDoTabuleiro[a], arrayDoTabuleiro[b], arrayDoTabuleiro[c])) {
                // Há um vencedor, faça algo aqui (por exemplo, exiba uma mensagem ou termine o jogo)
                    alert('Temos um vencedor! em x');
                return;
            }
        }
    
        // Verificando se o tabuleiro está completamente preenchido (empate)
        if (tabuleiroCompleto()) {
            // O jogo terminou em empate, faça algo aqui
            alert('O jogo terminou em empate!');
        }
    }
