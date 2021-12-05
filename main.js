// import {bfs} from "bfs.js";
var array= new Array(20);
var setS=0,setE=0;
var startX=9 , startY=15 ;
var endX=9, endY=35;
var nodes=[];
 for(var i=0;i<20;i++){
     array[i]= [50];
     for(var j=0;j<50;j++){
         if(i===9 && j===15){
             array[i][j]={
                 start:1,
                 end:0,
                 block:0
             }
             continue;
         }
         if(i===9 && j===35){
             array[i][j]={
                 start:0,
                 end:1,
                 block:0
             }
             continue;
         }
         array[i][j]=
            {
                start:0,
                end:0,
                block:0
            }
        ;
     }
}

console.log(array);
var btn= document.getElementById("btn-interface");
var x= document.createElement("button");
for(var i=0;i<20;i++){
        for(var j=0;j<50;j++){
            var divP=document.createElement("div");
            var b= document.createElement("div");
            b.id=i.toString()+"-"+j.toString();
            b.classList="btn";
            b.addEventListener("click",clicked.bind(event,i,j,b.id,setS,setE));
            b.addEventListener("mousedown",hoverFunction.bind(event,i,j,b.id,setS,setE));
            b.addEventListener("mouseover",handleClick.bind(event,i,j,b.id,setS,setE));
            
            b.addEventListener("mouseup",handleUp.bind());
            b.add
            divP.appendChild(b);
            if(array[i][j].start===1){
                b.innerHTML=`<img src="./start.png" height="20px" width="20px">`;
            }
            if(array[i][j].end===1){
                b.innerHTML=`<img src="./target.png" height="20px" width="20px">`;
            }

            console.log(b.id);
            btn.appendChild(divP);
    }
}

var click=0;
function clicked(i,j,s,x,y){
    
    if(setS==1){
        for(var l=0;l<20;l++){
            for(var k=0;k<50;k++){
                if(array[l][k].start===1){
                    var x=l.toString()+"-"+k.toString();
                    var b=document.getElementById(x);
                    array[l][k].start=0;
                    b.innerText=" ";

                    break;
                }
            }
        }
        startX=i;
        startY=j;
        var b=document.getElementById(s);
        setS=0;
        array[i][j].start=1;
        array[i][j].block=0;
        b.innerHTML=`<img src="./start.png" height="20px" width="20px">`;
        b.classList.remove("btn-block");
        
        setS=0;
    }else if(setE==2){
        endX=i;
        endY=j;
        for(var l=0;l<20;l++){
        for(var k=0;k<50;k++){
            if(array[l][k].end===1){
                array[l][k].end=0;
                var b=document.getElementById(l.toString()+"-"+k.toString());
                b.innerText=" ";
                break;
            }
        }
    }
        var b=document.getElementById(s);
        setE=0;
        array[i][j].end=1;
        b.innerHTML=`<img src="./target.png" height="20px" width="20px">`;
        array[i][j].block=0;
        b.classList.remove("btn-block");
    }
    console.log(startX,startY);
}
function handleUp(){
    click=0;
}
function hoverFunction(i,j,s,setS,setE){
    click=1;
    var b= b.getElementById("s");
     if(array[i][j].start===1 || array[i][j].end===1){
         return;
     }
     if(array[i][j].block===1){
         array[i][j].block=0;
         b.classList.remove("btn-block");
         return;
     }
    array[i][j].block=1;
    b.classList.add("btn-block");
    
}

 function handleClick(i,j,s,setS,setE){
     if(array[i][j].start===1 || array[i][j].end===1){
         return;
     }
    var b=document.getElementById(s);
     if(!click){
         return;
     }
     
     if(array[i][j].block===1){
         array[i][j].block=0;
         b.classList.remove("btn-block");
         return;
     }
     array[i][j].block=1;
    b.classList.add("btn-block");
}

var st= document.getElementById("setStart");
var ed= document.getElementById("setEnd");
st.addEventListener("click", setSorSetE.bind(event,1));

ed.addEventListener("click", setSorSetE.bind(event,2));
function setSorSetE(i){
    if(i===1){
        setS=1;
        setE=0;
        console.log(setS);
    }else{
        setS=0;
        setE=2;
        console.log(setE);
    }
}
var callBfs=document.getElementById("bfs");
callBfs.addEventListener("click",bfs.bind(event, startX,startY,endX,endY));

var vis=[];
var x=[0,1,0,-1];
var y=[-1,0,1,0];
var shortestPath;
var shortNodes;
function bfs(p,q,r,s){
    nodes=[];

    shortestPath=[1000];
    console.log(array);
    var temp=[];
    for(var i=0;i<20;i++){
        vis[i]=[];
        for(var j=0;j<50;j++){
            vis[i][j]=0;
        }
    }
    vis[startX][startY]=1;
    var points=[startX,startY];
    var l=0;
    for(var i=0;i<100;i++){
        shortestPath[i]=[];
        for(var j=0;j<100;j++){
            shortestPath[i][j]=[-2,-2];
        }
    }
    shortestPath[startX][startY]=[-1,-1];
    temp.push(points);
    while(temp.length>0) {
        var p=temp.shift();
        console.log(p);
        vis[p[0]][p[1]]=1;
        nodes[l]=[p[0],p[1]];
        l++;
        for(var i=0;i<4;i++){
            var tempX=p[0]+x[i];
            var tempY=p[1]+y[i];
            if(tempX >=0 && tempX<=19 && tempY>=0 && tempY<=49){
                
                if(array[tempX][tempY].block===0 && vis[tempX][tempY]===0){
                    
                    points=[tempX,tempY];
                    console.log(points);
                    temp.push(points);
                    vis[tempX][tempY]=1;
                    shortestPath[tempX][tempY]=p;
                }
                if(tempX===endX && tempY===endY){
                    temp=[];
                    break;
                }
            }
        }
    }
    console.log(shortestPath);
    v=[endX,endY];
     shortNodes=[];
    while(v!=[startX,startY]){
        if(v===[startX,startY]){break;}
        shortNodes.unshift(v);
        //console.log(v);
        if(v[0]===-1){break;}
        v=shortestPath[v[0]][v[1]];
        
    }
    animateNodes(nodes);
    
    console.log(shortNodes);
}
// animation function ....
function animateNodes(nodes){
    nodes.forEach(function(p,i) {
        
        var s=p[0].toString()+"-"+p[1].toString();
        setTimeout(function(){document.getElementById(s).classList.add("bfs-trans");},30*i);
        if(i=== nodes.length-1){
            setTimeout(function(){setTimeout(function(){animateShortestPath()},30*i);
        })
        }
        
    });
}
function animateShortestPath(){
    console.log();
    shortNodes.forEach(function(p,i) {
        var s=p[0].toString()+"-"+p[1].toString();
        setTimeout(function(){document.getElementById(s).classList.add("bfs-short-trans");},50*i);
    });
}
var clearBtn=document.getElementById("clear");
clearBtn.addEventListener("click",()=>{
    window.location.reload();
});
var dfsBtn=document.getElementById("dfs");
dfsBtn.addEventListener("click",callDfs.bind(event));
var k=0;
function callDfs(){

    
    shortestPath=[1000];
    console.log(array);
    var temp=[];
    for(var i=0;i<20;i++){
        vis[i]=[];
        for(var j=0;j<50;j++){
            vis[i][j]=0;
        }
    }
    vis[startX][startY]=1;
    var points=[startX,startY];
    var l=0;
    for(var i=0;i<100;i++){
        shortestPath[i]=[];
        for(var j=0;j<100;j++){
            shortestPath[i][j]=[-2,-2];
        }
    }
    console.log("dfs");
    k=0;
    shortestPath[startX][startY]=[-1,-1];
    Dfs(startX,startY,endX,endY);
    v=[endX,endY];
     shortNodes=[];
    while(v!=[startX,startY]){
        if(v===[startX,startY]){break;}
        shortNodes.unshift(v);
        //console.log(v);
        if(v[0]===-1){break;}
        v=shortestPath[v[0]][v[1]];
        
    }
    animateNodes(nodes);
    
    console.log(shortNodes);
}

function Dfs(startX,startY,endX,endY){
    if(startX===endX && startY===endY){
        return;
    }
    vis[startX][startY]=1;
    nodes[k]=[startX,startY];
    k++;
    console.log(startX,startY);
    for(var i=0;i<4;i++){
        var l=x[i]+startX;
        var m=y[i]+startY;
        if(vis[endX][endY]===1){
            return;
        }
        if(l>=0 && m>=0 &&  l<20 && m<50 &&vis[l][m]===0 && array[l][m].block===0){
            vis[l][m]=1;
            shortestPath[l][m]=[startX,startY];
            // nodes[k]=[l,m];
            // k++;
            Dfs(l,m,endX,endY);
        }
    }
}

var randW=document.getElementById("random-wall");
randW.addEventListener("click",addRandomWalls);

function addRandomWalls(){
    for(var i=0;i<150;i++){
        var randomNumX= Math.floor(Math.random()*20);
        var randomNumY=Math.floor(Math.random()*50);
        if(array[randomNumX][randomNumY].start===0 && array[randomNumX][randomNumY].end===0){
            var bl= document.getElementById(randomNumX.toString()+"-"+randomNumY.toString());
            bl.classList.add("btn-block");
            array[randomNumX][randomNumY].block=1;
        }
    }
}
document.getElementById("maze").addEventListener("click",generateMaze.bind(event,0,19,0,49,0));
var generatedMaze=0;

function generateMaze(x,xmax,y,ymax,z){
    z=0;
    if(xmax-x>=ymax-y){
        z=1;
    }
    if(z===1){
        if(xmax-x<3){
            return
        }
        var randX=Math.floor(Math.random()*(xmax-x)) + x;
        var r=Math.floor(Math.random(ymax-y))+y;
        while(randX===x || randX===xmax){
            var randX=Math.floor(Math.random()*(xmax-x)) + x;
        }
        for(var l=y;l<=ymax;l++){
            if(array[randX][l].start===1 || array[randX][l].end===1 || l===r){continue;}
            if(l+1<49){
                    if(randX-1>=0 && randX+1<=19 && array[randX-1][l+1].block===1 && array[randX][l+1].block===0 && array[randX+1][l+1].block===1){
                        continue;
                    }
            }
            if(l-1>=0){
                if(randX-1>=0 && randX+1<20 &&  array[randX-1][l-1].block===1 && array[randX][l-1].block===0 && array[randX+1][l-1].block===1){
                    continue;
                }
            }
            if(l-1>=0 && l+1<20){
                if(randX-1>=0){
                    if(array[randX-1][l-1].block===1 && array[randX-1][l].block===0  && array[randX-1][l+1].block===1){
                        continue;
                    }
                }
                if(randX+1<20){
                    if(array[randX+1][l-1].block===1 && array[randX+1][l].block===0 && array[randX+1][l+1].block===1){
                        continue;
                    }
                }
            }
            console.log(randX.toString()+"-"+l.toString());
            document.getElementById(randX.toString()+"-"+l.toString()).classList.add("btn-block");
            array[randX][l].block=1;
        }
        generateMaze(x,randX-1,y,ymax,z);
        generateMaze(randX+1,xmax,y,ymax,z);
    }else{
        if(ymax-y<3){
            return
        }
        var randY=Math.floor(Math.random()*(ymax-y))+y;
        while(randY===y || randY===ymax){
            
        var randY=Math.floor(Math.random()*(ymax-y))+y;
        }
        var r=Math.floor(Math.random()*(xmax-x))+x;
        for(var l=x;l<=xmax;l++){
            if(array[l][randY].start===1 || array[l][randY].end===1 || l===r){continue;}
            if(randY+1<50){
                if(l-1>=0 && l+1<=19 && array[l-1][randY+1].block===1 && array[l][randY+1].block===0 && array[l+1][randY+1].block===1){
                    continue;
                }
            }
            if(randY-1>=0){
                if(l-1>=0 && l+1<=19 && array[l-1][randY-1].block===1 && array[l][randY-1].block===0 && array[l+1][randY-1].block===1){
                    continue;
                }
            }
            if(randY-1>=0 && randY+1<50){
                if(l-1>=0 && array[l-1][randY-1].block===1 && array[l-1][randY].block===0 && array[l-1][randY+1].block===1){
                    continue;
                }
                if(l+1<20 && array[l+1][randY-1].block===1 && array[l+1][randY].block===0&& array[l+1][randY+1].block===1){
                    continue;
                }
            }
            console.log(l.toString()+"-"+randY.toString());
            
            document.getElementById(l.toString()+"-"+randY.toString()).classList.add("btn-block");
            array[l][randY].block=1;
        }
        generateMaze(x,xmax,y,randY-1,z);
        generateMaze(x,xmax,randY+1,ymax,z);
    }
}

var dijk= document.getElementById("dijkstra");
dijk.addEventListener("click",bfs.bind(event, startX,startY,endX,endY));