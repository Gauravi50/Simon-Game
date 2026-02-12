
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

let highScore = 0; 
let highScoreDisplay = document.querySelector("#highScore");



document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started");
        started == true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },300);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4  );
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`); 
    
    gameSeq.push(randColor); 
    console.log(gameSeq);
   
    gameflash(randbtn);
}

function checkAns(idx){ 

    if(gameSeq[idx] === userSeq[idx]){
       if(userSeq.length == gameSeq.length){
       setTimeout(levelUp(),1000);
       }
    }else{
        if(level > highScore){
            highScore = level;  
            highScoreDisplay.innerText = `High Score:${highScore}`;
    
        }
        h2.innerHTML = `Game Over! Your Score is <b>${level }</b> <br> Press any key to Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
   let btn = this; 

   userflash(btn);
   userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");   
for(btn of allbtn){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started  = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}