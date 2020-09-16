var squaresPC = document.querySelectorAll('.pc-player>div>span>div')
var squaresUser = document.querySelectorAll('.user-player>div>span>div')

var ships = ["submarino", "corveta", "fragata"]
var size = [2, 3, 4]
var direction = ['ver', 'hor']

var SHIPSONBOARD = 3

var arrayLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
var arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7]

var input = document.querySelector('.play>input')
var button = document.querySelector('.play>button')

var play

sortPCShip()

button.addEventListener('click', () => {
  play = input.value.toUpperCase() //coloca a jogada digitada no formato desejado

  input.value = ''
  
  squaresPC.forEach(square => { //para cada quadrado verifica a igualdade de acordo com a jogada
    if(play === square.id){ //se o id do quadrado for igual a jogada verifica se existe navio
      
      square.style.background = "green"
      console.log("fire")
    } 
  })
})


function sortPCShip(){
  for(let i = 0; i < SHIPSONBOARD; i++){ //escolhendo os navios e a posição aleatoriamente
    let randomShip = Math.floor(Math.random() * ships.length)
    let randomDirection = Math.floor(Math.random() * direction.length)
    console.log('navio ', ships[randomShip],' - tamanho ', size[randomShip], ' - direção ', direction[randomDirection])

    drawPCShips(ships[randomShip], size[randomShip], direction[randomDirection])
  }
}

function drawPCShips(ship, size, dir){

  let randomPos = Math.floor(Math.random() * squaresPC.length)

  // for(let i = 0; i < squaresPC.length; i++){
  // }
  squaresPC[randomPos].style.background = 'green'
  console.log(squaresPC[randomPos].id)
}





