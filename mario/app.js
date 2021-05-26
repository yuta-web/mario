let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W * 3;
can.height = SCREEN_SIZE_H * 3;

con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

// フレームレート維持
let frameCount = 0;

// con.fillStyle="#66AAFF";
// con.fillRect(0,0, SCREEN_SIZE_W, SCREEN_SIZE_H);

let chImg = new Image();
chImg.src = "sprite.png";
chImg.onload = draw

// キーボード
let keyb = {};

//おじさんをつくる
let ojisan = new Ojisan(100, 100);

// フィールドを作る
let field = new Field();

// 更新処理
function update()
{
	field.update();
	ojisan.update();
}

function drawSprite(snum, x, y){
	let sx = (snum&15)*16;
	let sy = (snum>>4)*16;
	vcon.drawImage(chImg, sx, sy, 16, 32, x, y, 16, 32);
}

// 描画処理
function draw(){
	// 水色画面
	vcon.fillStyle="#66AAFF";
	vcon.fillRect(0,0, SCREEN_SIZE_W, SCREEN_SIZE_H);

	// マップを表示
	field.draw();

	// おじさん表示
	ojisan.draw();

	// デバック情報を表示
	vcon.font = "24px 'Impact'";
	vcon.fillStyle="#FFF";
	vcon.fillText("FREME:" +frameCount, 10, 20);

	// 仮想画面から実画面へ
	con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W * 2, SCREEN_SIZE_H * 2);
}


// ループ開始
window.onload = function() {
	startTime = performance.now();
	mainLoop()
}

function mainLoop(){
	let nowTime = performance.now();
	let nowFrame = (nowTime - startTime)/GAME_FPS;

	if(nowFrame > frameCount){

		let c=0;
		while(nowFrame > frameCount){
			frameCount++;

			// 更新処理
			update();
			if(++c > 4)break;
		}
		// 描画処理
		draw();
	}

	requestAnimationFrame(mainLoop);
}

// キーボードが押された時
document.onkeydown = function (e) {
	if(e.keyCode == 39) keyb.Right = true;
	if(e.keyCode == 37) keyb.Left = true;
	if(e.keyCode == 90) keyb.BBUTTON = true;
	if(e.keyCode == 88) keyb.ABUTTON = true;

	if(e.keyCode == 65)field.scx--;
	if(e.keyCode == 83)field.scx++;
};
// キーボードが離れた時
document.onkeyup = function (e) {
	if(e.keyCode == 39) keyb.Right = false;
	if(e.keyCode == 37) keyb.Left = false;
	if(e.keyCode == 90) keyb.BBUTTON = false;
	if(e.keyCode == 88) keyb.ABUTTON = false;
};


