const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var lastFrameTimeMs = 0, maxFPS = 144;
var width = canvas.width;
var height = canvas.height;
var background = [...Array(height)].map(e => Array(width).fill(0));
var delta = 0;
var timestep = 1000 / 144;
var bulletList = [];

var startButtonRect = {
	x:350,
	y:350,
	width:400,
	height:100
};

class Bullet {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
    }
    update() {
        if(isNaN(delta)) return;
        this.x += this.speed*delta * Math.cos(this.angle*Math.PI/180);
        this.y += this.speed*delta * Math.sin(this.angle*Math.PI/180);
        if(this.x>width || this.x<0){
            this.angle = 180-this.angle;
        }else if(this.y>height || this.y<0){
            this.angle = 360-this.angle;
        }
        if(Math.floor(this.x)-Math.floor(Car.x) <5 && Math.floor(this.x)-Math.floor(Car.x) >-5 && Math.floor(this.y)-Math.floor(Car.y)<5 && Math.floor(this.y)-Math.floor(Car.y)>-5){
            admin.running = false;
        }
            

    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
    static updateBulletList(){
        bulletList.forEach(bullet => {
            bullet.update();
        });
    }
    static drawBulletList(){
        bulletList.forEach(bullet => {
            bullet.draw();
        });
    }
}

const Car = {
    x: width/2,
    y: height/2,
    speed: 0,
    maxSpeed: 0.1,
    direction: 0,
    width: 20,
    height: 20,
    draw: function(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    speedup: function(){
        if(this.speed<=-this.maxSpeed) return;
        this.speed -= 0.01;
    },
    slowdown: function(){
        if(this.speed >= this.maxSpeed) return;
        this.speed += 0.01;
    },
    turnLeft: function(){
        this.direction += 0.2;
    },
    turnRight: function(){
        this.direction -= 0.2;
    },
    move: function(){
        if(isNaN(delta)) return;
        this.y += (this.speed*delta) * Math.cos(this.direction) ;
        this.x += (this.speed*delta) * Math.sin(this.direction) ;
        if(this.x > width- this.width){
            this.x = width - this.width;
        }
        if(this.x < 0 ){
            this.x = 0;
        }
        if(this.y > height-this.height){
            this.y = height-this.height;
        }
        if(this.y < 0){
            this.y = 0 ;
        }

    },
    update: function(){
        this.move();
    },
    init: function(){
        this.x = width / 2;
        this.y = height / 2;
        this.speed = 0;
        this.direction = 0;
    }
}

window.addEventListener('keydown',e => {
    if (e.key === 'ArrowUp') {
        Car.speedup();
    }
    if (e.key === 'ArrowDown') {
        Car.slowdown();
    }
    if (e.key === 'ArrowLeft') {
        Car.turnLeft();
    }
    if (e.key === 'ArrowRight') {
        Car.turnRight();
    }
});

class GameAdmin{
    constructor(){
        this.score = 0;
        this.currentBulletSpeed = 0.1;
        this.shootTimer = 0;
        this.shootTimerLimit = maxFPS*1;
        this.running = false;
        this.init();
        canvas.addEventListener('click', function(evt) {
            var mousePos = GameAdmin.getMousePos(canvas, evt);
            if (isInside(mousePos,startButtonRect)) {
                GameAdmin.start();    
            }

        }, false);
    }
    init(){
        

        setup();   
    }

    static getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    shootRandomBulletFromWall(){
        if(this.shootTimer!=this.shootTimerLimit){
            this.shootTimer++;
            return;
        }else{
            this.shootTimer = 0;
            this.currentBulletSpeed+=0.01;
            if(this.shootTimerLimit>0){
                this.shootTimerLimit--;
            }  
        }
        var angle = Math.random()*360;
        var x = Math.random()*width;
        var y = Math.random()*height;
        var tmp = Math.random()*1;
        if(tmp>=0.5){
            bulletList.push(new Bullet(0, y, angle, 0.1));
        }else{
            bulletList.push(new Bullet(x, 0, angle, -0.1));
        }
        
    }

    static start(){
        admin.running = true;
        mainLoop();
    }

    drawScore(){
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Score: '+ this.score.toFixed(0), 10, 30);

    }

}

var admin = new GameAdmin();

function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function setup(){
    // Initialize the game state
    // ...
    for(let i = 0;i<background.length;i++){
        background[i][0] = 1;
        background[i][background[0].length-1] = 1;
    }
    for(let j = 0;j<background[0].length;j++){
        background[0][j] = 1;
        background[background.length-1][j] = 1;
    }

    
    ctx.beginPath();
    ctx.rect(350, 350, 400, 100); 
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillStyle = 'rgba(225,225,225,0.5)';

    ctx.fill(); 
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000'; 
    ctx.stroke();
    ctx.closePath();
    ctx.font = '40pt Kremlin Pro Web';
    ctx.fillStyle = '#000000';
    ctx.fillText('Start', 500, 415);
}

function mainLoop(timestamp){
    if(!admin.running){
        return;
    }
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta = timestamp - lastFrameTimeMs; // 获取当前时间与上一帧的时间差 delta
    lastFrameTimeMs = timestamp;
    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            panic(); // 出现了异常情况，需要做修复
            break;   // 跳出循环
        }
    }
    // Update the game state
    update(timestep);
    // Draw the game state
    draw();
    requestAnimationFrame(mainLoop);
    // Request the next frame
    
}

function update(timestep){
    Car.update();
    Bullet.updateBulletList();
    admin.score+=1/maxFPS;
    admin.shootRandomBulletFromWall();
    //console.log(Car);
    // Update the game state
    // ...
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    for(let i = 0; i < background.length; i++){
        for(let j = 0; j < background[0].length; j++){
            if(background[i][j] === 1){
                ctx.fillStyle = 'black';
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
    Car.draw();
    Bullet.drawBulletList();
    admin.drawScore();
}

function panic() {
    delta = 0; // 丢弃未模拟的时间
    // ... 把玩家同步到权威状态
}
