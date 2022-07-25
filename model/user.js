const { rejects } = require('assert');
const { resolve } = require('path');
const Connection = require('./connection');

class User{
    constructor(){
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if(err){
                console.log(err);
            }else{
                console.log('Connect success!');
            }
        })
    }

    getUser(){
        return new Promise((rejects, resolve) => {
            this.connection.query('select * from users;', (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve(data)
                }
            })
        });
    }

    createUser(user){
        return new Promise((rejects, resolve) => {
            let insertQuery = (`Insert into users(name, email, phone, password)
            values(${user.name}, ${user.email}, ${user.phone}, ${user.password})`);
            this.connection.query(insertQuery, (err, data) => {
                if(err){
                    rejects(err);
                }else{
                    resolve('Insert success!');
                }
            })
        })
    };

    getLastUser(){
        return new Promise((rejects, resolve) => {
            this.connection.query('select * from users order by id DESC limit 1', (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    addUserRole(idRole, idUser){
        return new Promise((rejects, resolve) => {
            let insertQuery = (`Insert into role_user(idrole, iduser)
            values(${idRole}, ${idUser})`);
            this.connection.query(insertQuery, (err, data) => {
                if(err){
                    rejects(err);
                }else{
                    resolve('Insert success!');
                }
            })
        })
    };

    updateUser(idUser, User){
        return new Promise((rejects, resolve) => {
            let updateQuery = (`update users set name='${User.name}', email='${User.email}', phone='${User.phone}', password='${User.password}' where id=${idUser}`);
            this.connection.query(updateQuery, (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve('Update Success!');
                }
            })
        })
    };

    remoteUser(id){
        return new Promise((rejects, resolve) => {
            let deleteQuery = `delete from users where id=${id}`
            this.connection.query(deleteQuery, (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve('Remove success!');
                }
            })
        })
    }
};
module.exports = User;