const fs = require('fs');

class HomeController{
    showHomePage(req, res){
        fs.readFile('views/home.html', 'utf-8', (err, data) => {
            if(err){
                console.log(err);
            } else {
                res.writeHead(200, {'Contect-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
}

module.exports = HomeController;