# MySQL Full Stack App

## Application Name: **Eat-Da-Burger**

### https://cryptic-cove-16705.herokuapp.com

### App Overview

Welcome to Eat-Da-Burger. Your homepage for crafting and consuming virtual burgers. This app is to demonstrate a full-stack web app using front-end and back-end technologies.

### App Usage

- The home page shows you a list of all burgers that are ready to devour and that have been devoured.

![Main Page](https://takeawalk.github.io/eat-da-burger/public/img/main.PNG)

- To craft/add a burger, enter the name of the burger and click submit.

![Add A Burger](https://takeawalk.github.io/eat-da-burger/public/img/add.PNG)

- After submitting, the burger is added to the list of available burgers and is ready to be consumed.

![Burger Added](https://takeawalk.github.io/eat-da-burger/public/img/added.PNG)

- Click on the 'devour' button next to a burger to eat it. After doing so, the burger is added to the devoured (right side) column.

![Devoured](https://takeawalk.github.io/eat-da-burger/public/img/devour.PNG)

### **App Parts**

#### Express Handlebars

##### main.handlebars

This file contains the html scaffolding and defines the submission form to create a burger. It contains CDNs to jquery and bootstrap.

#### index.handlebars

This file creates the burgers and buttons and arranging the burgers using handlebar logic to show 'ready to devour' burgers on the left and side and 'devoured' burgers on the right hand side.

#### connection.js

This file defines the connection to the sql server. A heroku/jawsdb connection is attempted first, if it fails it connects locally.

#### orm.js

This file makes sql calls easier by developing generic SQL statement that can be used to make calls to multiple tables. As used in this particular project, it is simplied and somewhat redundant but still relevant as a learning tool on how to use ORMs.

#### burger.js

The burger.js file is the model of the burger. This file makes references to the orm to execute calls to the sql server.

#### burger_controller.js

The burger_controller.js file defines the api routes for executing functions against the database.

#### server.js

This defines the api server and serves the publicically accessible html pages.

#### server-easy.js

This is an unreqired file I created to demonstrate a function app without following the additional complexity of MVP models. It is unused in the production model of the app.

## Built Using

- [NodeJS](https://nodejs.org/en/)
- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
- Node Packages
  - [express](https://www.npmjs.com/package/express)
  - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
  - [body-parser](https://www.npmjs.com/package/body-parser)
  - [mysql](https://www.npmjs.com/package/mysql)

## Author

David Pham - email@davidpham.ca
