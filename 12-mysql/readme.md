# Node.js & MySQL Homework

## Application: bAmazon

### App Parts

bamazonCustomer - Purchasing app allowing the customer to see products and make purchases while specifying quantities.

bamazonManager - Store management app that allows the manager to see products, review low inventory items, restock and add new items.

### How to use the app?

#### bamazonCustomer

![Image of bamazonCustomer](https://takeawalk.github.io/UTM/12-mysql/media/customer - order.png)

1. Using the printed table of available products, specify an item_id to purchase.
2. Specify the quantity you wish to purchase.
   - If the item is available in the quantity you requested,
     - the purchase is made,
     - the order total displayed and
     - the database is updated.
   - Otherwise you will recieve an error message of "Insufficient quantity!"

#### bamazonManager

The following options are available when the app is launched:

- View Products for Sale
  - Display all inventory items
    ![Image of bamazonManager inventory](https://takeawalk.github.io/UTM/12-mysql/media/manager - inventory.png)
- View Low Inventory
  ![Image of bamazonManager inventory](https://takeawalk.github.io/UTM/12-mysql/media/manager - low inventory.png)
- Add to Inventory
  ![Image of bamazonManager inventory](https://takeawalk.github.io/UTM/12-mysql/media/manager - add inventory.png)
- Add New Product
  ![Image of bamazonManager inventory](https://takeawalk.github.io/UTM/12-mysql/media/manager - add new product.png)

## How do I use this?

- Use Node to run this app.
  - To execute the customer purchasing app, in terminal run `node bamazonCustomer.js`
  - To execute the manager app, in terminal run `node bamazonManager.js`

## Built Using

- [NodeJS](https://nodejs.org/en/)
- Node Packages
  - [inquirer](https://www.npmjs.com/package/inquirer)
  - [mysql](https://www.npmjs.com/package/mysql)
- [MySQL](https://www.mysql.com/)

## Author

David Pham - email@davidpham.ca
