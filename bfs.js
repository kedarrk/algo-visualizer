module.exports = {
    bfs:bfs,    
  };
var x=[1,-1,0,0];
var y=[0,0,1,-1];

function bfs(array,startX,startY,endX,endY){
    var temp=[];
    var points=[startX,startY];
    temp.push(points);
    while(!temp.empty()){
        var p=temp.pop();
        for(var i=0;i<4;i++){
            var tempX=p[0]+x[i];
            var tempY=p[1]+y[i];
            if(tempX >=0 && tempX<=19 && tempY>=0 && tempY<=49){
                if(tempX===endX && tempY===endY){
                    break;
                }
                if(array[tempX][tempY].block===0){
                    points=[tempX,tempY];
                    temp.push(points);
                    var b= document.getElementById(tempX.toString()+"-"+tempY.toString());
                    b.classList.add("bfs-trans");
                }
            }
        }
    }
}