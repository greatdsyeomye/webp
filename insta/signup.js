console.log('hello sign')

//가입 버튼 비활성화하기
const button=document.querySelector(".login");
const input1=document.querySelector('.input1');
const input2=document.querySelector('.input2');
const input3=document.querySelector('.input3');
const input4=document.querySelector('.input4');

//함수를 클릭하여 페이지 이동하려면 해당함수를 버튼클릭 이벤트에 연결해야 한다. 
input1.addEventListener('keyup',changeColor);
input2.addEventListener('keyup',changeColor);
input3.addEventListener('keyup',changeColor);
input4.addEventListener('keyup',changeColor);

function changeColor(){
    /*아무것도 입력하지 않은 처음에 활성화 됨-----------------------------*/
    if (input1.value.length<1||input2.value.length<1||input3.value.length<1||input4.value.length<8 ){
        button.disabled=true; 
    }
    else{
        button.disabled=false;
    }

    if (!(input1.value.length<1||input2.value.length<1||input3.value.length<1||input4.value.length<8 )) {
        button.classList.remove("buttonLoginDisabled");
      } 
    else {
        button.classList.add("buttonLoginDisabled");
      }
}

/*fetch api사용하여 서버로 전송하기- 별도의 onclick 필요없음, 자동실행
입력값을 각각의 변수에 저장해주었기 때문에 별도의 배열을 만들어서 보내지 않아도 됨*/
document.getElementById('signupForm').addEventListener('submit',function(event){
    event.preventDefault();
    var phoneNumber = document.querySelector('.input1').value;
    var fullName = document.querySelector('.input2').value;
    var username = document.querySelector('.input3').value;
    var password = document.querySelector('.input4').value;
    const req={
    phoneNumber:input1.value,
    fullName:input2.value,
    username:input3.value,
    psword:input4.value,
};

console.log(req);
    fetch('/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            phoneNumber:phoneNumber,
            fullName:fullName,
            username:username,
            password:password
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('회원가입을 완료하였습니다.');
            alert('회원가입을 완료하였습니다.');
            window.location.href = 'http://localhost:3000/login';
            // 원하는 동작을 수행 (예: 페이지 이동 등)
        } else {
            console.error('회원가입 실패하였습니다.');
        }
    })
    .then(data=>{
        //서버에서 처리한 결과를 콘솔에 출력합니다. 
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
