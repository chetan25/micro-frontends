// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('build'));

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(6060);
