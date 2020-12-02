const fetch = require('node-fetch');

const URL = 'http://localhost:8000';

async function getTeams(){
    let token = localStorage.getItem('x-access-token');
    let res = await fetch(`${URL}/api/auth/teams`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    });
    res = res.json();
    return res;
}

async function createTeam(data){
    let token = localStorage.getItem('x-access-token');
    var body = {
        teamName: data
    }
    console.log(body);
    let res = await fetch(`${URL}/api/teams/createTeam`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    })
    if(res.status==200){
        return 1;
    } else return 0;
}

async function joinTeam_1(data){
    let token = localStorage.getItem('x-access-token');
    var body = {
        teamNumber: data
    }
    let res = await fetch(`${URL}/api/teams/joinTeam`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    })
    if(res.status == 200){
        return 1
    } else return 0;
}

exports.getTeams = getTeams;
exports.createTeam = createTeam;
exports.joinTeam_1 = joinTeam_1;