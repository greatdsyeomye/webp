
    console.log('login js loaded')

    //가입 버튼 비활성화하기
    const button = document.querySelector(".login");
    const input1 = document.querySelector('.input1');
    const input2 = document.querySelector('.input2');

    //함수를 클릭하여 페이지 이동하려면 해당함수를 버튼클릭 이벤트에 연결해야 한다. 
    input1.addEventListener('keyup', changeColor);
    input2.addEventListener('keyup', changeColor);

    function changeColor() {
        /*아무것도 입력하지 않은 처음에 활성화 됨-----------------------------*/
        if (input1.value.length < 1 || input2.value.length < 8) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }

        if (!(input1.value.length < 1 || input2.value.length < 8)) {
            button.classList.remove("buttonLoginDisabled");
        } else {
            button.classList.add("buttonLoginDisabled");
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.querySelector('.input1').value;
        var password = document.querySelector('.input2').value;
    
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // 서버에서 JSON 데이터를 반환합니다.
            } else {
                throw new Error('로그인 실패하였습니다.');
            }
        })
        .then(data => {
            console.log('서버로부터의 응답:', data);
            if (data.success) {
                // 로그인 성공 시 다음 페이지로 이동하거나 작업을 수행합니다.
                window.location.href = 'http://localhost:3000';
            } else {
                // 로그인 실패 시 사용자에게 메시지를 알립니다.
                alert(data.message);
            }
        })
        
    });
    