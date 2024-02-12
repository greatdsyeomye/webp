const main = document.querySelector("#main");
const qna= document.querySelector("#qna");
const result=document.querySelector('#result');
const endPoint=12;
const select=[0,0,0,0,0,0,0,0,0,0,0,0];
function calResult(){
    var result=select.indexOf(Math.max(...select));
    return result;
}
function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
  }
  
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
      result.style.WebkitAnimation = "fadeIn 1s";
      result.style.animation = "fadeIn 1s";
      setTimeout(() => {
        qna.style.display = "none";
        result.style.display = "block"
      }, 450)})
      console.log(select);
      setResult();
  }

function addAnswer(answerText,qIdx,idx){
    var a= document.querySelector('.answerBox');
    var answer=document.createElement('button'); //createElement를 creatElement라고 해서 uncaught type error 발생함 
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    a.appendChild(answer);
    answer.innerHTML= answerText;

    answer.addEventListener("click",function(){ 
        //addEventListener은 선택한 질문이 사라지고 다음질문을 띄우도록 하는 함수 
        var children = document.querySelectorAll('.answerList');
        for (let i=0;i<children.length;i++){
            children[i].disabled=true;
            children[i].style.WebkitAnimation="fadeIn 0.5s";
            children[i].style.animation ="fadeIn 0.5s";
        }
        setTimeout(()=>{
            var target=qnaList[qIdx].a[idx].type; //선택한 answer에 해당하는 type의 인자를 1씩 증가해주는 거임 
            for(let j=0;j<target.length;j++){
                select[target[j]]+=1;
            }
           
            for (let i=0;i<children.length;i++){
                children[i].style.display='none';
            }
            goNext(++qIdx); //반복문이 끝난이후 다음 질문을 띄우도록 
        },450)
    },false);
}
function goNext(qIdx){
    if (qIdx===endPoint){
        goResult();
        return;
    }
    var q= document.querySelector('.qBox');
    q.innerHTML=qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    var status=document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+ '%';
}
function begin(){
    main.style.WebkitAnimation="fadeOut 1s";
    main.style.animation="fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation="fadeIn 1s";
        qna.style.animation ="fadeIn 1s";
        setTimeout(() =>{
            main.style.display="none";
            qna.style.display="block";
        },450)
        let qIdx= 0;
        goNext(qIdx);
     },450 );
     
}
