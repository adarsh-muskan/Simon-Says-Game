let gameSeq=[];
let userSeq=[];
let colors= ["yellow","red","green","purple"];
let body= document.querySelector("body");
let maxScore=0;

let level=0;
let started=false;

let dis_head= document.querySelector("h3");
let btns= document.querySelectorAll(".btn");

document.addEventListener("keypress", function(){
    if(started==false)
    {
        started=true;
    }
    
    levelUp();
});

function blink()
{
    console.log("Bilnked");
    
    setTimeout(function(){
        this.style.backgroundColor="white";
    },500);
}

function gameFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function userFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}

function levelUp()
{
    userSeq=[];
    level++;
    dis_head.innerText= `Level ${level}`;

    //random btn choose
    let randIdx= Math.floor(Math.random()*3);
    let randColor= colors[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);    
    randBtn= document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

function checkAns(idx)
{
    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
    }

    else{
        if(level>maxScore)
        {
            maxScore=level;
        }
        dis_head.innerHTML=`Game Over!! Your Score was <b>${level}</b> <br>Max Score: ${maxScore}<br> Press any key to start the game \n`;
        resetGame();
        body.classList.add("game_over");
        setTimeout(function(){
            body.classList.remove("game_over");
        }, 100);
    }
}

function btnPress()
{
    let btn= this;
    userFlash(btn);

    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function resetGame()
{
    started=false;
    userSeq=[];
    gameSeq=[];
    level=0;
}