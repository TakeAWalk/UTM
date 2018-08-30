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
  menu();
});

function menu() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'View Products for Sale':
          itemsAvailableForSale();
          break;

        case 'View Low Inventory':
          lowInventory();
          break;

        case 'Add to Inventory':
          addMore();
          break;

        case 'Add New Product':
          addNewProduct();
          break;
      }
    });
}

function itemsAvailableForSale() {
  connection.query('SELECT * FROM products WHERE stock_quantity > 0', function(
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}

function lowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}

function addMore() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'selectedProductID',
        message: 'Enter the ID of the product you wish to add more to:'
      },
      {
        type: 'input',
        name: 'addQty',
        message: 'How many more would you like to add?'
      }
    ])
    .then(answers => {
      connection.query(
        'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
        [answers.addQty, answers.selectedProductID],
        function(err, res) {
          if (err) throw err;
          console.log(
            answers.addQty +
              ' units successfully added to product ' +
              answers.selectedProductID
          );
          connection.end();
        }
      );
    });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'productName',
        message: 'Enter the name of a new product: '
      },
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department the product belongs to: '
      },
      {
        type: 'input',
        name: 'price',
        message: 'Enter the unit price of the new product: '
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Enter starting quantity: '
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)',
        [
          answers.productName,
          answers.department,
          answers.price,
          answers.quantity
        ],
        function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        }
      );
    });
}
