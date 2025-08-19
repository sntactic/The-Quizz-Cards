const http = require('http');
const app = require('./app');


app.set('port', process.env.PORT || 3000)

const serve  = http.createServer(app);

serve.listen(process.env.PORT || 3000);