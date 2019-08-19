const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();

const port = 3000;
const xlsxToJSON = require('xlsx-to-json');

app.use('/', expressStaticGzip(`${__dirname}/../public`, {
  index: false,
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

app.use(express.static('public'));

app.get('/properties', (req, res) => {
  xlsxToJSON({
    input: 'Enodo_Skills_Assessment_Data_File_4-19-2019.xlsx',
    output: null,
    lowerCaseHeaders: true
  }, (err, properties) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(properties);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
