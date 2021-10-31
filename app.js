const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItem = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get('/', function(req, res) {
  let today = new Date();
  let option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  var day = today.toLocaleDateString("en-US", option);

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.post('/', function(req, res) {

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItem.push(item);
    res.redirect('/work');
  } else {
    item.push(item);
    res.redirect('/')
  }

});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: 'Work List',
    newListItems: workItem
  });
});

app.post('/work', function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
