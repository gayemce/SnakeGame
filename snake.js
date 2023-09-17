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
let hiz = 10;
let can = 3;

const elmaGorsel = new Image();
elmaGorsel.src = 'elma.png';


let yilanUzunluğu = 3;
let yilanParcalari = [];

class yilanParcasi{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let liste = [10,50,30,50];
for(let i in liste){
    console.log(i);
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

function ekraniTemizle(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
}

function yilanCiz(){
    //yılanın gövdesi
    ctx.fillStyle = "green";
    for(let i of yilanParcalari){ //for of, forech gibi çalışır
        ctx.fillRect(i.x * konum, i.y * konum, boyut, boyut);
    }

    yilanParcalari.push(new yilanParcasi(x,y));


    if(yilanParcalari.length > yilanUzunluğu){
        yilanParcalari.shift();
    }

    //yılanın başı
    ctx.fillStyle = "white";
    ctx.fillRect(x * konum, y * konum, boyut, boyut);
}

function elmaCiz(){
    ctx.fillStyle = "red";
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
    ctx.fillStyle = "white";
    ctx.font = "16px verdana";
    ctx.fillText(`Skor: ${skor}`, canvasWidth - 80, 18)
}

function hiziCiz(){
    ctx.fillStyle = "white";
    ctx.font = "16px verdana";
    ctx.fillText(`Hız: ${hiz}`, canvasWidth - 390, 18)
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
    ctx.fillStyle = "white";
    ctx.font = "16px verdana";
    ctx.fillText(`Can: ${can}`,canvasWidth-230,18)
}

function yeniOyun() {
    document.location.reload(); //sayfayı yeniler
}

oyunuCiz();