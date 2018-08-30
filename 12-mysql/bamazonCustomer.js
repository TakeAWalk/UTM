var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  itemsAvailableForSale();
  menu();
});

function itemsAvailableForSale() {
  connection.query('SELECT * FROM products WHERE stock_quantity > 0', function(
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
  });
}

function menu() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'selectedProductID',
        message: 'Enter the ID of the product you wish to buy:'
      },
      {
        type: 'input',
        name: 'qtyToPurchase',
        message: 'How many would you like to buy?'
      }
    ])
    .then(answers => {
      order(answers);
    });
}

function order(answers) {
  connection.query(
    'SELECT * FROM products WHERE item_id = ? AND stock_quantity >= ?',
    [answers.selectedProductID, answers.qtyToPurchase],
    function(err, res) {
      if (err) throw err;
      if (res.length === 0) {
        console.log('Insufficient quantity!');
        connection.end();
      } else {
        fulfill(answers);
      }
    }
  );
}

function fulfill(answers) {
  connection.query(
    'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
    [answers.qtyToPurchase, answers.selectedProductID],
    function(err, res) {
      if (err) throw err;
      connection.query(
        'SELECT * FROM products WHERE item_id = ?',
        answers.selectedProductID,
        function(err, res) {
          console.table(res);
          console.log(
            'Order Total: $' +
              parseFloat(res[0].price) * parseFloat(answers.qtyToPurchase)
          );
          console.log('Thank you for ordering!');
          connection.end();
        }
      );
    }
  );
}
