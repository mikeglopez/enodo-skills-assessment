const express = require('express');

const app = express();

const port = 3000;
const xlsxToJSON = require('xlsx-to-json');

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
