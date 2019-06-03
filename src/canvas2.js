/*=========================================================================
START OF CANVAS 2

*/

// make second canvas
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");

// functions 
function drawArrow() {
    var canvas=document.getElementById("canvas2");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;

    var arrow=document.createElement('canvas');
    var actx=arrow.getContext('2d');
    arrow.width=10;
    arrow.height=5;
    actx.moveTo(0,0);
    actx.lineTo(5,4);
    actx.lineTo(25,4);
    actx.lineTo(25,0);
    actx.lineTo(30,5);
    actx.lineTo(25,9);
    actx.lineTo(25,6);
    actx.lineTo(5,6);
    actx.lineTo(0,9);
    actx.closePath();
    actx.fillStyle='blue';
    actx.fill();
    document.body.appendChild(arrow);

    arrowCenterX=cw/2;
    arrowCenterY=40;
    arrowDirection=1;
    arrowAngle=0;

    animate();

    function animate(){
    ctx.clearRect(0,0,cw,ch);
    ctx.translate(arrowCenterX,arrowCenterY);
    ctx.rotate(arrowAngle);
    ctx.drawImage(arrow,-arrow.width/2,-arrow.height/2);
    ctx.setTransform(1,0,0,1,0,0);
    arrowAngle+=Math.PI/180;
    arrowCenterX+=arrowDirection;
    if(arrowCenterX<arrow.width/2 || arrowCenterX>cw-arrow.width/2){
        arrowDirection*=-1;
        arrowCenterX+=arrowDirection;
    }
    requestAnimationFrame(animate);
    }

}

var interval = 100;
var timer = window.setInterval(function(){
    // CHECK IF WE ARE READY TO DRAW ON CANVAS 2
    if (image_loaded === true) {
        // DRAW VECTORS HERE ONCE IMAGE 1 IS LOADED
        // drawArrow();
        console.log("you can start drawing on canvas 2 now");
        window.clearInterval(timer);
    }
}, interval);