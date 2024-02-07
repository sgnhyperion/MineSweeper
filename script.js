var boardar = [];
var rows = 8;
var cols = 8;

var minescount = Math.floor(10+Math.random()*6);
var mineslocation = [];
let gameover = false;
let music = document.querySelector("#music");
music.volume = 0.5;
window.onload = function(){
    music.play();
    startGame();
}

function startGame(){
    document.getElementById("mines-count").innerText =" Mines : "+minescount;
    for(let r=0;r<rows;r++){
        let row = [];
        for(let c=0;c<cols;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.className = "box";
            tile.style.boxShadow = "2px 2px 8px #888"
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        boardar.push(row);
    
    }

    function setMines(){
        for(let i=0;i<minescount;i++){
            let r = Math.floor(Math.random()*rows);
            let c = Math.floor(Math.random()*cols);
            if(mineslocation.includes(r.toString()+"-"+c.toString())){
                i--;
            }
            else{
                mineslocation.push(r.toString()+"-"+c.toString());
            }
        }
    }

    setMines();

    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            boardar[r][c].addEventListener("click",function(){
                if(gameover){
                    return;
                }
                if(!flagswitch){
                    if(boardar[r][c].innerHTML == "🚩") {
                        boardar[r][c].innerHTML = "";
                    }
                    else{
                        boardar[r][c].innerHTML = "🚩";
                    }
                }
                else{
                    let count = 0;
                    for(let i=-1;i<=1;i++){
                        for(let j=-1;j<=1;j++){
                            if(r+i>=0 && r+i<rows && c+j>=0 && c+j<cols){
                                if(mineslocation.includes((r+i).toString()+"-"+(c+j).toString())){
                                    count++;
                                }
                            }
                        }
                    }
                    if(mineslocation.includes(r.toString()+"-"+c.toString())){
                        alert("GAME OVER!");
                        for(let i=0;i<mineslocation.length;i++){
                            let loc = mineslocation[i].split("-");
                            boardar[loc[0]][loc[1]].style.backgroundColor = "red";
                            boardar[loc[0]][loc[1]].innerHTML = "💣";
                        }
                        gameover = true;
                    }
                    else{
                        boardar[r][c].style.backgroundColor = "darkgray";
                        if(count!=0){
                            boardar[r][c].innerHTML = count;
                            boardar[r][c].classList.add("x"+count.toString());
                        }
                        else{

                        }
                    }
                }
            });
        }
    }
    let flagswitch = true;
    document.querySelector("#flag").addEventListener("click",function(){
        if(flagswitch){
            document.querySelector("#flag").style.backgroundColor = "rgba(22, 22, 67, 10.514)";
            flagswitch = !flagswitch;
        }
        else{
            document.querySelector("#flag").style.backgroundColor = "lightgrey";
            flagswitch = !flagswitch;
        }
    })

    
}
    let playback = document.getElementById("pause-music");
    let music_playing = true
    playback.addEventListener("click",function(){
        if(music_playing){
            playback.style.boxShadow = "0 0 10px #34db34";
            music.pause();
            music_playing = false;
            playback.innerHTML = "Play Music";
        }
        else{
            music.play();
            music_playing = true;
            playback.innerHTML = "Pause Music";
        }
    });

// e.stopPropogation(); => to stop event bubbling