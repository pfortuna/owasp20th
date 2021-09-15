const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

const config = {
  agent: false,
  thirdPartyiframed: false,
  thirdPartyCompromised: false
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: (config.agent && 'main-agent') || 'main'
}));

app.use(express.static('public'));
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('home', {config: config});
});

//app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.post('/account', async (req, res) => {
  await serverLoginProcess();
  res.render('account', {
    id: req.body.id,
    password: req.body.password
  })
});
app.get('/iframe', (req, res) => {
  res.render('iframe', {layout: false});
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});

function serverLoginProcess() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}