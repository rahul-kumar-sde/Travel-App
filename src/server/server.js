const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})
const port = 8081;
const server = app.listen(port, listening);
function listening() {
    console.log(`Running on localhost: ${port}`);
};
let projectData = {};
app.post('/add', addInfo);
function addInfo(req, res) {
    projectData['dCity'] = req.body.dCity;
    projectData['daysToGo'] = req.body.daysToGo;
    projectData['dDate'] = req.body.dDate;
    projectData['aCity'] = req.body.aCity;
    projectData['details'] = req.body.details;
    projectData['weatherDetails'] = req.body.weatherDetails;
    res.send(projectData);
    console.log(projectData);
}

