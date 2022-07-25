const fs = require('fs');
const qs = require('qs');
const mysql = require('mysql');
const User = require('../model/user');

class UserController{
    constructor(){
        this.user = new User();
    }

    showUserListPage(req, res){
        fs.readFile('../views/admin/users.html', 'utf-8', async(err, data) => {
            if(err){
                console.log('File khong ton tai');
            } else {
                let users = await this.user.getUser();
                let tbody = '';
                users.map((user, index) =>{
                    tbody += `<tr>
                    <td>${index+1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.password}</td>
                    <td>${user.idrestaurant}</td>
                    <td><a href="/user-management/edit?id=${user.id}">Sửa</td>
                    <td><a href="/user-management/delete/id=${user.id}">Xóa</td>
                </tr>`
                data = data.replace('{listuser}', tbody);
                res.writeHead(200, {'Content-type':'text/html'});
                res.write(data);
                return res.end()
                })
            }
        })
    }
}

module.exports = UserController;