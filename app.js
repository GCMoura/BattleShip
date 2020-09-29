var shipSize = [2, 2, 3, 4]
var shipColor = ['red', 'red', 'green', 'yellow']

var SHIPSONBOARD = 4

var fire = document.querySelector('#fire')
var error = document.querySelector('#error')
var hit = document.querySelector('#hit')
var win = document.querySelector('#win')

var battleship = document.querySelector('.header>span')

var squaresPC = document.querySelectorAll('.pc-player>div>span>div')
var squaresUser = document.querySelectorAll('.user-player>div>span>div')

var inputSinglePlayer = document.querySelector('.play>input')
var button = document.querySelector('.play>button')

var inputOnePlayer = document.querySelector('#input-player-one')
var inputTwoPlayer = document.querySelector('#input-player-two')

var divTwoPlayers = document.querySelectorAll('.two-players')
var divOnePlayer = document.querySelector('.play')
var playerOneButton = document.querySelector('#player-one')
var playerTwoButton = document.querySelector('#player-two')

var startButton = document.querySelector('.start')

var userPoints = document.querySelector('.user-player>span>input') 
var player1Name = document.querySelector('.user-player>p')
var PCPoints = document.querySelector('.pc-player>span>input')
var player2Name = document.querySelector('.pc-player>p')

var players = document.getElementsByName('players');
var twoPlayers = false
var player1
var player2

var play
var playPC
var squaresPCArray
var squaresUserArray
var choosenSquare 

var createShipsSquaresPC
var createShipsSquaresUser

battleship.addEventListener('click', reload)

//reinicia a página
function reload(){
  location.reload();
  return false;
}

divTwoPlayers[0].style.display = 'none'
divTwoPlayers[1].style.display = 'none'

startButton.addEventListener('click', startGame)

//Inicia um novo jogo com a escolha de um ou dois jogadores
function startGame(){
  userPoints.valueAsNumber = 0
  PCPoints.value = 0
  
  for(let i = 0; i < players.length; i++){
    if(players[i].checked){
      if(players[i].value === '1-player'){
        getPlayerName()
        player2Name.innerHTML = 'User PC'

        divOnePlayer.style.display = 'block'
        divTwoPlayers[0].style.display = 'none'
        divTwoPlayers[1].style.display = 'none'

      } else {
        twoPlayers = true
        getPlayerName()

        divOnePlayer.style.display = 'none'
        divTwoPlayers[0].style.display = 'block'
        divTwoPlayers[1].style.display = 'block'
      }
    }
  }

  createSquaresArray()
  sortSquareIndexForPC()
  sortSquareIndexForUser()
}

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

//sorteia um quadrado de inicio para cada navio e adiciona ao array para jogador PC
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
    if(createShipsSquaresPC.length !== 11) reload()
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
  } else if(createShipsSquaresUser.length !== 11) {
      reload()    
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
//se houver repetições, precisa reiniciar o procedimento novamente, retorna true para verificação
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
  fire.play()
  if(twoPlayers === true){
    play = inputOnePlayer.value.toUpperCase()
    inputOnePlayer.value = ''
    inputTwoPlayer.focus()
    
  } else {
    play = inputSinglePlayer.value.toUpperCase() //coloca a jogada digitada no formato desejado
    inputSinglePlayer.value = ''
    inputSinglePlayer.focus()
  }

  //retorna o número correspondente ao indice do tabuleiro
  for(let i = 0; i < squaresPC.length; i++){
    if(play === squaresPC[i].id){
      play = i
    }
  }

  let fireBall
  setTimeout(() => {
    fireBall = fireBallUser(play)
    if(fireBall === 'error'){
      error.play()
      let color = '#083d77'
      squaresPC[play].style.background = `${color}` 
      squaresPC[play].innerHTML = ''
    } else {
      hit.play()
      hitShipUser(fireBall)
    }
  }, 2000);

  if(twoPlayers === false){
    setTimeout(() => {
      PCPlay(twoPlayers)
    }, 4000);
  } 

}

//faz a jogada do jogador PC
function PCPlay(twoPlayers){
  fire.play()
  if(twoPlayers === true){
    play = inputTwoPlayer.value.toUpperCase() //coloca a jogada digitada no formato desejado
    inputTwoPlayer.value = ''
    inputOnePlayer.focus()
    
    playPC = play
  } else {
    playPC = Math.floor(Math.random() * squaresUserArray.length)
  }

  //retorna o número correspondente ao indice do tabuleiro
  for(let i = 0; i < squaresUser.length; i++){
    if(playPC === squaresUser[i].id){
      playPC = i
    }
  }
  let fireBall
  setTimeout(() => {
    fireBall = fireBallPC(playPC)
    if(fireBall === 'error'){
      error.play()
      let color = '#083d77'
      squaresUser[playPC].style.background = `${color}` 
      squaresUser[playPC].innerHTML = ''
    } else {
      hit.play()
      hitShipPC(fireBall)
    }
  }, 2000);

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
    userPoints.valueAsNumber += 10
  }
  if(i === 4 || i === 5 || i === 6 ){
    let color = shipColor[2]
    squaresPC[play].style.background = `${color}`
    squaresPC[play].innerHTML = ''
    userPoints.valueAsNumber += 10
  }
  if(i === 7 || i === 8 || i === 9 || i === 10){
    let color = shipColor[3]
    squaresPC[play].style.background = `${color}`
    squaresPC[play].innerHTML = ''
    userPoints.valueAsNumber += 20
  }
  if(userPoints.valueAsNumber === 150){
    setTimeout(() => {
      alert(`${player1} ganhou!!`)
    }, 1000);
  }
}

//verifica a igualdade da jogada com os numeros escolhidos na jogada do PC
//evita a repetição de squares
function fireBallPC(playPC){
  squaresUserArray = squaresUserArray.filter(square => {
    return square !== playPC
  })
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
    PCPoints.valueAsNumber += 10
  }
  if(i === 4 || i === 5 || i === 6 ){
    let color = shipColor[2]
    squaresUser[playPC].style.background = `${color}`
    squaresUser[playPC].innerHTML = ''
    PCPoints.valueAsNumber += 10
  }
  if(i === 7 || i === 8 || i === 9 || i === 10){
    let color = shipColor[3]
    squaresUser[playPC].style.background = `${color}`
    squaresUser[playPC].innerHTML = ''
    PCPoints.valueAsNumber += 20
  }
  if(PCPoints.valueAsNumber === 150){
    setTimeout(() => {
      alert(`${player2} ganhou!!`)
    }, 1000);
  }
}
//mostrar alerta de fim de jogo
function alert(message){
  let div = document.createElement('div')
  div.classList.add('show-alert')
  div.innerHTML = message
  document.body.appendChild(div)

  win.play()
  fire.volume = 0
  hit.volume = 0
  error.volume = 0

  drawShipsPC(createShipsSquaresPC)
  drawShipsUser(createShipsSquaresUser)

  setTimeout(() => {
    div.classList.remove('show-alert')
    reload()
  }, 5000);
}

//mostrar janela solicitando nome do usuário
function getPlayerName(){
  let div = document.createElement('div')
  div.classList.add('show-confirm')
  div.innerHTML = 'Nome: '

  let input = document.createElement('input')
  input.classList.add('input-confirm')

  let button = document.createElement('button')
  button.classList.add('button-confirm')
  button.innerHTML = 'Jogar'

  div.appendChild(input)
  div.appendChild(button)
  document.body.appendChild(div)
  input.focus()
  if(twoPlayers === false){ 
    
    button.addEventListener('click', () => { 
      player1 = document.querySelector('.input-confirm').value
      player1Name.innerHTML = player1
      div.style.display = 'none'
      inputSinglePlayer.focus()
    })
  } else {
    button.addEventListener('click', () => { 
      player1 = document.querySelector('.input-confirm').value
      player1Name.innerHTML = player1
      div.style.display = 'none'

      let div2 = document.createElement('div')
      div2.classList.add('show-confirm')
      div2.innerHTML = 'Nome: '

      let input2 = document.createElement('input')
      input2.classList.add('input2-confirm')

      let button = document.createElement('button')
      button.classList.add('button-confirm')
      button.innerHTML = 'Jogar'

      div2.appendChild(input2)
      div2.appendChild(button)
      document.body.appendChild(div2)
      input2.focus()
      button.addEventListener('click', () => { 
        player2 = document.querySelector('.input2-confirm').value
        player2Name.innerHTML = player2
        div2.style.display = 'none'
        inputOnePlayer.focus()
      })
    })
  }
}

button.addEventListener('click', userPlay)
playerOneButton.addEventListener('click', userPlay)
playerTwoButton.addEventListener('click', function() {PCPlay(twoPlayers)})