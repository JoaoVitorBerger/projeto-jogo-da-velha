
function getRandomArbitrary(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (randomNumber === 0) {
        return 'X'
    } else {
        return 'O'
    }
}
function iniciar() {
    let aleatoryNum = getRandomArbitrary(0, 1)
    if (aleatoryNum == 'X') {
        document.getElementById('jogador-1').innerHTML += 'X'
        document.getElementById('jogador-2').innerHTML += 'O'
        document.querySelector('.player-turn-name').innerHTML = 'Jogador1'
    } else {
        document.getElementById('jogador-1').innerHTML += 'O'
        document.getElementById('jogador-2').innerHTML += 'X'
        document.querySelector('.player-turn-name').innerHTML = 'Jogador2'
    }

    let playerActualyOne = document.querySelector('.participant-name-1').innerHTML
    let playerActualyTwo = document.querySelector('.participant-name-2').innerHTML

    document.addEventListener('click', (event) => {

        let target = event.target

        if (target.classList == 'box' && target.innerHTML == '') {
            let playerActualy = document.querySelector('.player-turn-name')
            // console.log(playerActualy.innerHTML)
            if (playerActualy.textContent == 'Jogador1') {
                target.innerHTML = playerActualyOne.slice(playerActualyOne.length - 1, playerActualyOne.length)
                checkValues()
                playerActualy.innerHTML = 'Jogador2'
            } else {
                target.innerHTML = playerActualyTwo.slice(playerActualyTwo.length - 1, playerActualyTwo.length)
                checkValues()
                playerActualy.innerHTML = 'Jogador1'
            }
            // checkValues()
        }

    })
    function checkValues() {
        let lists = document.querySelectorAll('li')
        let arrayResponseO = []
        let arrayResponseX = []
        lists.forEach(li => {
            let divs = li.querySelectorAll('div')
            divs.forEach(div => {
                let divId = (Number(div.id))
                let valueBox = div.innerHTML
                if(valueBox === 'X'){
                    //valores para x
                    arrayResponseX.push(divId)
                }else{
                    //valores para y
                    if(valueBox === 'O'){
                        arrayResponseO.push(divId) 
                    }
                }
            })    
        })
       checkWinner()

        function checkWinner(){
            let positionsOfVictory=[
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [1,4,7],
                [2,5,8],
                [3,6,9],
                [1,5,9],
                [3,5,7],
            ]
            let statusVictory = false

            if (arrayResponseX.length>=3) {
                
                positionsOfVictory.forEach(array => {
                    //console.log(arrayResponseX)
                    let responseX = arrayResponseX.filter(value =>array.includes(value) );
                    //  console.log(responseX.length)
                    if (responseX.length == 3) {
                        console.log('Ola')
                         alert(document.querySelector('.player-turn-name').innerHTML + ' ganhou o jogo !!!!')  
                         statusVictory = true  
                         clearGame() 
                     }
                     
                });
            }
             if (arrayResponseO.length >= 3) {
                positionsOfVictory.forEach(array => {
                     //console.log(arrayResponseO)
                    let responseO = arrayResponseO.filter(value =>array.includes(value) );
                     //console.log(responseO.length)
                    if (responseO.length == 3) {
                         alert(document.querySelector('.player-turn-name').innerHTML + ' ganhou o jogo !!!!')
                         statusVictory = true
                         clearGame()
                    }         
                });
            }
            if(arrayResponseO.length + arrayResponseX.length == 9 && statusVictory==false ){
                alert('Jogo empatado')
                clearGame()
            }
        }
        function clearGame(){
            let lists = document.querySelectorAll('li')
            lists.forEach(li => {
                //console.log(li)
                let divs = li.querySelectorAll('div')
                divs.forEach(div => {
                   div.innerHTML = ''

                })    
            })
        }  
    }
}
document.addEventListener('DOMContentLoaded', iniciar)


