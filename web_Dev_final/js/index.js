// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/African Coffin Dance Astronomia(DjJpSwami.Com).mp3');
const controls=document.querySelectorAll(".controls button")
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15} //the location of the head of the snake when the game starts 
];

food = {x: 6, y: 7}; //the location of the food when the game starts

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) { //function which determines the snake collison
    // If the snake hits himself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If the snake hits the wall 
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press F5 to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
        
    }

    // If the food is eaten , then increase the score by 1 and regenarate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 6;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
//for steering the snake
const changeDirection=(e)=>{
    if(e.key==="ArrowUp"){
         console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            
    }
    else if(e.key==="ArrowDown"){
        console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            
    }
    else if(e.key==="ArrowLeft"){
        console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            
    }
    else if(e.key==="ArrowRight"){
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
            
    }
}

controls.forEach(key=>{
    key.addEventListener("click",() =>changeDirection({key:key.dataset.key}));
})


//for the timer 

const StartTime=1; //in mins
var time=StartTime*60;
const count=document.getElementById('container');


    setInterval(countdown,1000) //calling the countdown function after every 1 sec



function countdown(){
    let minutes=Math.floor(time/60);
    let seconds=time%60;
    minutes=minutes<10? "0"+ minutes:minutes;
    seconds=seconds<10? "0"+ seconds: seconds;
    count.innerHTML=`${minutes}:${seconds}`; //template literal
    if(time>0){
        time--;
    }
    else if(minutes==0&&seconds==0){
        if(score>hiscore){
            alert("You win the game\nDouble Press F5 to start a new game");
        }
        else{
            alert("You lost\nTry Again\nDouble Press F5 to start a new game!");
            
    }
    
   
}}

