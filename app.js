var squaresPC = document.querySelectorAll('.pc-player>div>span>div')
var squaresUser = document.querySelectorAll('.user-player>div>span>div')

var shipSize = [2, 2, 3, 4]
var shipColor = ['red', 'red', 'green', 'yellow']

var SHIPSONBOARD = 4

var input = document.querySelector('.play>input')
var button = document.querySelector('.play>button')

var userPoints = document.querySelector('.user-player>span>input')
userPoints.value = 0
var PCPoints = document.querySelector('.pc-player>span>input')
PCPoints.value = 0

var play
var playPC
var squaresPCArray
var squaresUserArray
var choosenSquare 

var createShipsSquaresPC
var createShipsSquaresUser

createSquaresArray()
sortSquareIndexForPC()
sortSquareIndexForUser()

//cria um array com as posições do tabuleiro
function createSquaresArray(){ 
  squaresPCArray = []
  squaresUserArray = []

  for(let i = 0; i < squaresPC.length; i++){
    squaresPC[i].innerHTML = squaresPC[i].id
    squaresPCArray.push(i)
  }

  for(let i = 0; i < squaresUser.length; i++){
    squaresUser[i].innerHTML = squaresUser[i].id
    squaresUserArray.push(i)
  }
}

//sorteia os primeiros quadrados dos navios de forma randomica para o jogador PC
function sortFirstIndexPC(choosenSquare){

  for(let i = 0; i < SHIPSONBOARD; i++){
    let index = Math.floor(Math.random() * squaresPCArray.length)
    choosenSquare.push(index)
  }

  return choosenSquare
}

//sorteia um quadrado de inicio para cada navios e adiciona ao array para jogador PC
function sortSquareIndexForPC(){
  createSquaresArray()

  choosenSquare = []
  
  let firstIndexArray = sortFirstIndexPC(choosenSquare)

  let validateChoosenSquare = validateSquares(firstIndexArray)
  
  createShipsSquaresPC = avoidSameSquare(validateChoosenSquare)

  let validateShipsSquares = validateArraySquares(createShipsSquaresPC)

  if(validateShipsSquares === true) {
    sortSquareIndexForPC()
  } else {
    //drawShipsPC(createShipsSquaresPC)
    console.log('navios PC - ', createShipsSquaresPC)
  } 
}

//sorteia os primeiros quadrados dos navios de forma randomica para o jogador User
function sortFirstIndexUser(choosenSquare){

  for(let i = 0; i < SHIPSONBOARD; i++){
    let index = Math.floor(Math.random() * squaresUserArray.length)
    choosenSquare.push(index)
  }

  return choosenSquare
}

//sorteia um quadrado de inicio para cada navios e adiciona ao array para jogador User
function sortSquareIndexForUser(){
  createSquaresArray()

  choosenSquare = []
  
  let firstIndexArray = sortFirstIndexUser(choosenSquare)

  let validateChoosenSquare = validateSquares(firstIndexArray)
  
  createShipsSquaresUser = avoidSameSquare(validateChoosenSquare)

  let validateShipsSquares = validateArraySquares(createShipsSquaresUser)

  if(validateShipsSquares === true) {
    sortSquareIndexForUser()
  } else {
    //drawShipsUser(createShipsSquaresUser)
    console.log('navios User - ', createShipsSquaresUser)
  } 
}

//validação dos números escolhidos seguindo a lógica:
//submarinos possuem duas casas na vertical, então não podem terminar em número %8 === 0
//corvetas e fragatas possuem 3 e 4 casas na horizontal e não podem ter casas que ultrapassem a borda do tabuleiro
function validateSquares(choosenSquare){
  for(let i = 0; i < shipSize.length; i++){
    if(shipSize[i] === 2){
      if(choosenSquare[i] % 8 === 0 || (choosenSquare[i] + 1) % 8 === 0){ //se cair múltiplo de 8 ou uma casa anterior
        choosenSquare[i] = choosenSquare[i] + 2
      }
    } else if(shipSize[i] === 3 || shipSize[i] === 4){
      if(choosenSquare[i] + ((shipSize[i] - 1) * 8) > 63){ //se o posicionamento dos quadrados ultrapassar o tabuleiro
        choosenSquare[i] = choosenSquare[i] - ((shipSize[i] - 1) * 8)
      }
    } 
  }
  return choosenSquare
}

//lógica para evitar que os navios sejam desenhados sobrepostos
//o primeiro e o segundo elementos possuem 2 quadrados na vertical
// o terceiro elemento 3 casas na horizontal
//o quarto elemento 4 casas na horizontal
function avoidSameSquare(validateChoosenSquare){
  var shipsSquares = []
  
  for(let i = 0; i < validateChoosenSquare.length; i++){ 
    if(i === 0 || i === 1){
      let pos = validateChoosenSquare[i]
      shipsSquares.push(pos)
      pos++
      shipsSquares.push(pos)
    }
    if(i === 2 || i === 3){
      let pos = validateChoosenSquare[i]
      for(let j = 0; j < shipSize[i]; j++){
        shipsSquares.push(pos)
        pos += 8
      }
    }
  }
  return shipsSquares
}

//é necessário verificar se existem números repetidos no array de quadrados selecionados
//se houver repetições, precisa reiniciar o procedimento novamente, retorna treue para verificação
function validateArraySquares(createShipsSquares){
  for(let i = 0; i < createShipsSquares.length; i++){
    for(let j = i + 1; j < createShipsSquares.length; j++){
      if(createShipsSquares[i] === createShipsSquares[j]){
        return true
      }
    }
  }
}

//desenhar os navios de acordo com a cor e com as posições já escolhidas para jogador PC
function drawShipsPC(shipsSquares){
  for(let i = 0; i < shipsSquares.length; i++){
    if(i === 0 || i === 1 || i === 2 || i === 3){
      let color = shipColor[0]
      let pos = shipsSquares[i]
      squaresPC[pos].style.background = `${color}`
    }
    if(i === 4 || i === 5 || i === 6){
      let color = shipColor[2]
      let pos = shipsSquares[i]
      squaresPC[pos].style.background = `${color}`
    }
    if(i === 7 || i === 8 || i === 9 || i === 10){
      let color = shipColor[3]
      let pos = shipsSquares[i]
      squaresPC[pos].style.background = `${color}`
    }
  }
}

//desenhar os navios de acordo com a cor e com as posições já escolhidas para jogador User
function drawShipsUser(shipsSquares){
  for(let i = 0; i < shipsSquares.length; i++){
    if(i === 0 || i === 1 || i === 2 || i === 3){
      let color = shipColor[0]
      let pos = shipsSquares[i]
      squaresUser[pos].style.background = `${color}`
    }
    if(i === 4 || i === 5 || i === 6){
      let color = shipColor[2]
      let pos = shipsSquares[i]
      squaresUser[pos].style.background = `${color}`
    }
    if(i === 7 || i === 8 || i === 9 || i === 10){
      let color = shipColor[3]
      let pos = shipsSquares[i]
      squaresUser[pos].style.background = `${color}`
    }
  }
}

//manipula as jogadas do User
function userPlay(){
  play = input.value.toUpperCase() //coloca a jogada digitada no formato desejado

  input.value = ''
  input.focus()

  //retorna o número correspondente ao indice do tabuleiro
  for(let i = 0; i < squaresPC.length; i++){
    if(play === squaresPC[i].id){
      play = i
    }
  }
 
  let fireBall = fireBallUser(play)

  if(fireBall === 'error'){
    let color = '#083d77'
    squaresPC[play].style.background = `${color}` 
    squaresPC[play].innerHTML = ''
  } else {
    hitShipUser(fireBall)
  }

  setTimeout(() => {
    console.log('pc jogando')
    PCPlay()
  }, 1000);
}

//faz a jogada do jogador PC
function PCPlay(){
  playPC = Math.floor(Math.random() * squaresUserArray.length)
  
  let fireBall = fireBallPC(playPC)

  if(fireBall === 'error'){
    let color = '#083d77'
    squaresUser[playPC].style.background = `${color}` 
    squaresUser[playPC].innerHTML = ''
  } else {
    hitShipPC(fireBall)
  }
}

//verifica a igualdade da jogada com os numeros escolhidos na jogada do User
function fireBallUser(play){
  for(let i = 0; i < createShipsSquaresPC.length; i++){
    if(play === createShipsSquaresPC[i]){
      return i
    }
  }
  return 'error'
}

//faz a marcação de acerto no navio
function hitShipUser(i){
  if(i === 0 || i === 1 || i === 2 || i === 3){
    let color = shipColor[0]
    squaresPC[play].style.background = `${color}`
    squaresPC[play].innerHTML = ''
  }
  if(i === 4 || i === 5 || i === 6 ){
    let color = shipColor[2]
    squaresPC[play].style.background = `${color}`
    squaresPC[play].innerHTML = ''
  }
  if(i === 7 || i === 8 || i === 9 || i === 10){
    let color = shipColor[3]
    squaresPC[play].style.background = `${color}`
    squaresPC[play].innerHTML = ''
  }
}

//verifica a igualdade da jogada com os numeros escolhidos na jogada do PC
function fireBallPC(playPC){
  for(let i = 0; i < createShipsSquaresUser.length; i++){
    if(playPC === createShipsSquaresUser[i]){
      return i
    }
  }
  return 'error'
}
//faz a marcação de acerto no navio
function hitShipPC(i){
  if(i === 0 || i === 1 || i === 2 || i === 3){
    let color = shipColor[0]
    squaresUser[playPC].style.background = `${color}`
    squaresUser[playPC].innerHTML = ''
  }
  if(i === 4 || i === 5 || i === 6 ){
    let color = shipColor[2]
    squaresUser[playPC].style.background = `${color}`
    squaresUser[playPC].innerHTML = ''
  }
  if(i === 7 || i === 8 || i === 9 || i === 10){
    let color = shipColor[3]
    squaresUser[playPC].style.background = `${color}`
    squaresUser[playPC].innerHTML = ''
  }
}

button.addEventListener('click', userPlay)

