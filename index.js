window.onload=start;

var boxPunti,tempoTimer=30;
function start(){

    generaPerDifficolta();
    
}
var NumCoppie;
function generaPerDifficolta(){
    // let coppie=prompt("NUmero  di coppie? ")

    let box=document.getElementById("boardgame");
    boxPunti=document.querySelector("main section article:first-child");
    let boxTempo=document.querySelector("main section article:last-child");
console.log(boxTempo)

NumCoppie=10
    generaCoppieCarte();
    disordinaBox();


    function  generaCoppieCarte(){
        for(let i=0;i<NumCoppie;i++){
            src=getImageSrc();
            carta=document.createElement("div");
            carta.innerHTML=`<img src="${src}" alt="">
            <img src="imgs/Scan_0002__4x3z.jpeg" alt="">`
            carta.setAttribute("idInterval","");
            carta.className="elemento_animato"
            carta.onclick=gira;
            carta2=document.createElement("div");
            carta2.innerHTML=`<img src="${src}" alt="">
            <img src="imgs/Scan_0002__4x3z.jpeg" alt="">`
            carta2.setAttribute("idInterval","");
            carta2.className="elemento_animato"
            carta2.onclick=gira;
            
            box.appendChild(carta);
            box.appendChild(carta2);
        }
    }

    function getImageSrc(){
        let src
        switch(Math.round(Math.random()*(17-1)+1)){
            case 1:
                src="imgs/Scan_0001__7z3w.jpeg"
            break;
            case 2:
                src="imgs/Scan_0001__azvm.jpeg"
            break;
            case 3:
                src="imgs/Scan_0001__dnf0.jpeg"
            break;
            case 4:
                src="imgs/Scan_0001__itsm.jpeg"
            break;
            case 5:
                src="imgs/Scan_0001__j49w.jpeg"
            break;
            case 6:
                src="imgs/Scan_0001__jn1m.jpeg"
            break;
            case 7:
                src="imgs/Scan_0001__ohhw.jpeg"
            break;
            case 8:
                src="imgs/Scan_0001__wqaf.jpeg"
            break;
            case 9:
                src="imgs/Scan_0001__x00w.jpeg"
            break;
            case 10:
                src="imgs/Scan_0002__13rt.jpeg"
            break;
            case 11:
                src="imgs/Scan_0002__64bz.jpeg"
            break;
            case 12:
                src="imgs/Scan_0002__aihw.jpeg"
            break;
            case 13:
                src="imgs/Scan_0002__btob.jpeg"
            break;
            case 14:
                src="imgs/Scan_0002__kkdh.jpeg"
            break;
            case 15:
                src="imgs/Scan_0002__o7ih.jpeg"
            break;
            case 16:
                src="imgs/Scan_0002__qvxm.jpeg"
            break;
            case 17:
                src="imgs/Scan_0002__yx2h.jpeg"
            break;
        }
        return src
    }
    function  disordinaBox(){
        for(let i=0;i<box.children.length;i++){
            cartaSpostata=box.children[Math.floor(Math.random()*(box.children.length))]
            box.insertBefore(cartaSpostata,box.children[Math.floor(Math.random()*(box.children.length))]);
        }
    }

    let id=setInterval(timerDisplay,1000);
    function timerDisplay(){
        if(0<tempoTimer){

            tempoTimer-=1;
            boxTempo.innerHTML="timer "+getMinutes(tempoTimer);
        }
        else{
            esito("sconfitta");
            clearInterval(id);
        }
    }

    function getMinutes(secondi){
            testoTimer=`0${parseInt(secondi/60)}:`
            if(secondi-(60*(parseInt(secondi/60)))<10)
            testoTimer+=`0${secondi-(60*(parseInt(secondi/60)))}`
            else
            testoTimer+=secondi-(60*(parseInt(secondi/60)))
        return testoTimer
        }
}
var nomeClasse="elemento_animato"

var indicatoreCoppia=0,punti=0;;
var coppie=[{
    oggetto:"",
    srcImg:""
},
{
    oggetto:"",
    srcImg:""
},id=""];


function gira(event){
    let cartaAttuale=event.currentTarget;
    
    coppie[indicatoreCoppia]["oggetto"]=cartaAttuale;
    coppie[indicatoreCoppia].srcImg=cartaAttuale.children[0].attributes["src"].value;
    indicatoreCoppia++;

    cartaAttuale.className=nomeClasse+" gira180"
    cartaAttuale.onclick=""
    
            if(indicatoreCoppia==2){
        indicatoreCoppia=0;
        if(coppie[0].srcImg==coppie[1].srcImg){
            aggiungiPunti();
            if(punti==NumCoppie) esito("vittoria");
        }
        else
        coppie.id=setInterval(proteggiCarta,500);
                   
    }    

        function proteggiCarta(){
            coppie[0].oggetto.onclick=gira
            coppie[1].oggetto.onclick=gira        
            coppie[0].oggetto.className=nomeClasse+" gira360"
            coppie[1].oggetto.className=nomeClasse+" gira360"

            clearInterval(coppie.id);
        }
}
    
function aggiungiPunti(){

    boxPunti.innerHTML="points "+(++punti)
}

function esito(risultato){
    let main=document.querySelector("main");
     main.style.opacity="0.3"

    let article=document.createElement("article");
    article.innerHTML=`Esito: ${risultato}<br><a href="index.html">clicca per rigiocare</a>`
    article.className="esito"
    if(risultato=="vittoria") article.style.backgroundColor="green"
    else article.style.backgroundColor="red"
    article.style.zIndex="1"

    document.querySelector("body").insertBefore(article,main)

}