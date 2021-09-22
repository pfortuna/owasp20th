const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

const config = {
  agent: false,
  thirdPartyiframed: false,
  thirdPartyCompromised: false,
  caja: false
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'main'
}));

app.use(express.static('public'));
app.set('views', 'views');

app.get('/', (req, res) => {  
  function setConfig(p) {
    if (req.query[p]) config[p] = true;
    else config[p] = false;
  }
  setConfig("agent");
  setConfig("thirdPartyiframed");
  setConfig("thirdPartyCompromised");
  setConfig("caja");
  console.dir(config);
  if (config.agent) req.app.locals.layout = "main-agent";
  else if (config.caja) req.app.locals.layout = "main-caja";
  else req.app.locals.layout = "main";
  console.log("layout: " + req.app.locals.layout);

  res.render('home', {config: config});
});

app.use(express.urlencoded({extended: true}));
app.post('/account', async (req, res) => {
  await serverLoginProcess();
  res.render('account', {
    id: req.body.id,
    password: req.body.password
  })
});
app.get('/iframe', (req, res) => {
  res.render('iframe', {layout: false, config: config});
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});

function serverLoginProcess() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}