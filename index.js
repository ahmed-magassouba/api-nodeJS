var express = require('express');
const app = express();



// Construction des routes
app.get('/users',(request,response)=>{
    response.status(200);
    response.send('Users');
}) 
    




//creation du server et affectation d'un port
app.listen(3000, console.log('server is running on port 3000'));