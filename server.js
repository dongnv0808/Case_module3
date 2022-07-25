const http = require('http');
const url = require('url');
const fs= require('fs');
const ErrorController = require('./controller/error-controller');
const HomeController = require('./controller/home-controller');
const UserController = require('./controller/user-controller');


const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "min.js": "text/javascript",
    "css": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};
let homeConTroller = new HomeController();
let errorController = new ErrorController();
let userController = new UserController();
let server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let urlPath = urlParse.pathname;
    let method = req.method;
    const filesDefences = req.url.match(/\.js|.css|.jpg|.png|.gif|min.js|min.css/);
    if (filesDefences) {
        let filePath = filesDefences[0].toString();
        let extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        if (filePath.includes('/css')){
            extension = mimeTypes[filesDefences[0].toString().split('/')[1]];
        }
        if (extension.includes('?')){
            extension = extension.split('?')[0];
        }
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res)
    }
    switch(urlPath){
        case '/':{
            homeConTroller.showHomePage(req, res);
            break;
        };
        case '/register-user': {

            break;
        };
        case '/register-collaborator': {

            break;
        };
        case '/login': {

            break;
        };
        case '/admin/product-list': {

            break;
        };
        case '/collaborator-page': {

            break;
        };
        case '/user-products': {

            break;
        };
        case '/users': {
            userController.showUserListPage(req, res);
            break;
        }
        // default: {
        //     errorController.showErrorPage(req, res);
        //     break;
        // }
    }
})
server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080')
})