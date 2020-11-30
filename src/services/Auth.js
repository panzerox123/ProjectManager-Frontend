const fetch = require('node-fetch');

const URL = 'http://localhost:8000';

async function login(data) {
    var body = {
        userName: data.user,
        password: data.password
    };
    fetch(`${URL}/api/auth/userLogin`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        //console.log(res.headers.get("x-auth-token"))
        var token = res.headers.get("x-auth-token");
        //cookie.save('x-access-token',)
        localStorage.setItem('x-access-token',token);
    });
}

function register(data){

    var body = {
        userName: data.user,
        email: data.email,
        password: data.password
    };
    fetch(`${URL}/api/auth/userCreate`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        var token = res.headers.get("x-access-token");
        localStorage.setItem('x-access-token', token);
    })

}

async function auth(){
    let token = localStorage.getItem('x-access-token');
    if(!token) return 0;
    let res = await fetch(`${URL}/api/auth/current`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
    test = await res.text();
    if(res.status == 200) return JSON.parse(test);
    else return 0;
}

exports.login = login;
exports.register = register;
exports.auth = auth;