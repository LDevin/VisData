const {create, defaults, rewriter, router, bodyParser} = require('json-server');
const config = require('../utils/config');

const routes = require('./routes.json');
const db = router(require('../utils/mock-merge')(config.jsondir));

const server = create();
const middles = defaults({bodyParser: true});

server.use(rewriter(routes));
server.use(middles);
server.use(require('./middlewares'));

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

server.use(bodyParser);
server.use(db);

db.render = require('./renders').normal;

const PORT = process.env.MOCK_PORT | config.port;

server.listen(PORT, () => {
    console.log('json-server is running!')
})