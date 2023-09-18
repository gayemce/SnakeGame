const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); //ctx değişkeni

//tuş kodlarını dinler
document.addEventListener("keydown",tusHareketleri);


// direkt px değer alıyorlar
let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 10;
let y = 10;
let hareketX = 0;
let hareketY = 0;
let elmaX = 5;
let elmaY = 5;
let konum = 20;
let boyut = 18;
let skor = 0;
let hiz = 6;
let can = 3;

const elmaGorsel = new Image();
elmaGorsel.src = 'elma.png';

const snakeHeadLeft = new Image();
snakeHeadLeft.src = 'snakeHeadLeft.png';

const snakeHeadRight = new Image();
snakeHeadRight.src = 'snakeHeadRight.png';

const snakeHeadUp = new Image();
snakeHeadUp.src = 'snakeHeadUp.png';

const snakeHeadDown = new Image();
snakeHeadDown.src = 'snakeHeadDown.png';

const snakeBody = new Image();
snakeBody.src = 'snakeBody.png';

let yilanUzunluğu = 3;
let yilanParcalari = [];

class yilanParcasi{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz(){
    ekraniTemizle();
    yilanCiz();
    elmaCiz();
    yilanHareketiniGuncelle();
    elmaKonumGuncelle();
    skoruCiz();
    hiziCiz();
    canCiz();
    const sonuc = oyunBittiMi();

    if(sonuc) return;

    setTimeout(oyunuCiz, 1000/hiz)

    //timeout.clear(); değişkene atılıp sıfırlanabilir
    
}

//canvas
function ekraniTemizle(){
    // ctx.fillStyle = "#558000"
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
}

function yilanCiz() {
    //yılanın gövdesi
    for(let i of yilanParcalari){ //for of, forech gibi çalışır
        ctx.drawImage(snakeBody, i.x * konum, i.y * konum, boyut, boyut)
    }

    yilanParcalari.push(new yilanParcasi(x,y));


    if(yilanParcalari.length > yilanUzunluğu){
        yilanParcalari.shift();
    }
    
    // Eğer başlangıçta hiç hareket etmediyse, başı sola bakacak şekilde ayarla
    if (hareketX === 0 && hareketY === 0) {
        ctx.drawImage(snakeHeadLeft, x * konum, y * konum, boyut, boyut);
    } else {
        // Yılanın başının yeni konumu üzerinden hareket yönüne uygun görseli çiz
        if (hareketX === -1) {
            ctx.drawImage(snakeHeadLeft, x * konum, y * konum, boyut, boyut);
        } else if (hareketX === 1) {
            ctx.drawImage(snakeHeadRight, x * konum, y * konum, boyut, boyut);
        } else if (hareketY === -1) {
            ctx.drawImage(snakeHeadUp, x * konum, y * konum, boyut, boyut);
        } else if (hareketY === 1) {
            ctx.drawImage(snakeHeadDown, x * konum, y * konum, boyut, boyut);
        }
    }
}

function elmaCiz(){
    //ctx.fillRect(elmaX * konum, elmaY * konum, boyut, boyut);
    ctx.drawImage(elmaGorsel, elmaX * konum, elmaY * konum, 20, 20)
}

function tusHareketleri(e){
    switch (e.keyCode) {
        case 37: //sol
            if(hareketX === 1) return; //-1 yönünde hareket ederken direkt 1 yönünde hareket edemez
            hareketX = -1; 
            hareketY = 0; 
            break;
        case 38: //yukarı
            if(hareketY === 1) return;
            hareketY = -1; //400den 0a gider
            hareketX = 0; //çapraz şekilde gitmesin
            break;
        case 39: //sağ
            if(hareketX === -1) return;
            hareketX = 1; // +1 değil çünkü zaten hareketX de direkt toplanıyor
            hareketY = 0;
            break;
        case 40: //aşağı
            if(hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;        
            break;
    }
}

function yilanHareketiniGuncelle(){
    let sonucX = x+ hareketX;
    let sonucY = y+ hareketY;

    //yukardan gittiğinde aşağıdan tekrar gelsin
    if(sonucY < 0){ //kendi boyutu 18px olduğu için 19dan gelmeli
        sonucY = 19;
    }
    else if(sonucY > 19){ //aşağıdan gittiğinde yukarıdan tekrar gelsin
        sonucY = 0
    }

    if(sonucX < 0){
        sonucX = 19;
    }
    else if(sonucX > 19){
        sonucX = 0;
    }

    x = sonucX;
    y = sonucY;
}

function elmaKonumGuncelle(){
    if(x === elmaX && y === elmaY){ //elma ve yılan aynı konumdaysa
        //elma rastgele bir konuma geçsin
        elmaX = Math.floor(Math.random() * konum);//random 0-1 arası değer üretir
        elmaY = Math.floor(Math.random() * konum);//konumu en fazla 20 olabilir

        let elKonumuMusaitMi = false;
        while(!elKonumuMusaitMi){
            elKonumuMusaitMi = true;
            for(let parca of yilanParcalari){
                if(parca.x === elmaX && parca.y === elmaY){ //elma yılan parçaları ile aynı konumdaysa konumunu değiştirir
                    elmaX = Math.floor(Math.random() * konum);
                    elmaY = Math.floor(Math.random() * konum);
                }
            }
        }

        yilanUzunluğu++; //elmayı yediğinde
        skor = skor + 10;

        if(yilanUzunluğu % 3 === 0){
            hiz += 3;
        }
    }
}

function skoruCiz(){
    document.getElementById('skorLabel').textContent = `Skor: ${skor}`;
}

function hiziCiz(){
    document.getElementById('hizLabel').textContent = `Hız: ${hiz}`;
}

function oyunBittiMi(){
    let oyunBitti = false;
    if(hareketX === 0 && hareketY === 0) return;

    for(let index in yilanParcalari){
        let parca = yilanParcalari[index]
        if(parca.x === x && parca.y === y){ //kendine çarptığında
            can--;
            if(can === 0){
                oyunBitti = true;
                //can = 0;
                break;
            }
            yilanParcalari.splice(0,index);
            yilanUzunluğu = yilanParcalari.length;
            skor = yilanUzunluğu * 10;
            hiz -= 3;
            // oyunBitti = true;
            break
        }
    }

    if(oyunBitti){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText(`Game Over!`, canvasWidth/4.5, canvasHeight/2);
    }

    return oyunBitti;
}

function canCiz(){
    document.getElementById('canLabel').textContent = `Can: ${can}`;
}

function yeniOyun() {
    document.location.reload(); //sayfayı yeniler
}

oyunuCiz();