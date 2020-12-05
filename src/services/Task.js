const fetch = require('node-fetch')

URL = 'http://localhost:8000'

async function createMainTask(data, teamNumber) {
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    var body = {
        taskName: data
    }
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/createMainTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    });
    if (res.status == 200) {
        return 1;
    } else return 0;
}

async function createSubTask(data, teamNumber, taskID) {
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    var body = {
        taskName: data
    }
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/createSubTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    })
    if (res.status == 200) {
        return 1;
    } else return 0;
}

async function getTaskDetails(teamNumber, taskID) {
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/details`, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'x-access-token': token
        }
    })
    if (res.status == 200) {
        var temp = await res.json();
        return temp;
    } else return 0;
}

async function deleteTask_main(teamNumber, taskID) {
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/delete_main_task`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'x-access-token': token
        }
    });
    console.log(res.status)
    if (res.status == 200) return 1 
    else return 0;
}

async function deleteTask_sub(teamNumber, taskID) {
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/delete_sub_task`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'x-access-token': token
        }
    });
    if (res.status == 200) return 1 
    else return 0;
}

async function renameTask(data,teamNumber,taskID){
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    var body = {
        taskName: data
    }
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/rename`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    });

    if (res.status==200) return 1
    else return 0
}

async function updateStatus(data,teamNumber,taskID){
    let token = localStorage.getItem('x-access-token')
    if (!token) return 0;
    let res = await fetch(`${URL}/api/tasks/${teamNumber}/${taskID}/${data}`,{
        method: 'PUT',
        headers: {
            'x-access-token': token
        },
    });
    if(res.status==200) return 1
    else return 0
}

exports.createMainTask = createMainTask;
exports.getTaskDetails = getTaskDetails;
exports.createSubTask = createSubTask;
exports.deleteTask_main = deleteTask_main;
exports.deleteTask_sub = deleteTask_sub;
exports.renameTask = renameTask;
exports.updateStatus = updateStatus;