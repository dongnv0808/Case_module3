const fs = require('fs');

class ErrorController{
    showErrorPage(req, res){
        fs.readFile('views/error-404.html', 'utf-8', (err, data) => {
            if(err){
                console.log('Không tìm thấy file');
            } else {
                res.writeHead(200, {'Content-type':'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
}

module.exports = ErrorController;