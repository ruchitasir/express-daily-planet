# Daily Planet (Adding a database!)

![Daily Planet](http://blogs.smithsonianmag.com/design/files/2013/06/first-daily-planet1.jpg)

Welcome to the Daily Planet. We need your superhuman developer skills to help us share news with the world. We've seen that you have some Express knowledge and need you to make us a MVP website as soon as possible.

You'll need to hook your server up to a database to create, store and display articles.

## Prerequisites

Before attempting this assignment, please ensure you have learned the following:

* Creating an Express app from scratch
* GET and POST routes
* Using SQL
* Using ORMs such as Sequelize

## Getting Started

* Fork and clone this repository
* Follow the below directions

## Requirements

At the end of this deliverable, you will have

* A database with an `articles` table
* A working Express app with several routes
* Working Sequelize that interfaces between your Express app and your database

## Directions

### Setting up the Express App

To get going we need to set up a basic Express server (see this week's notes for
full details).

* Run `npm init` in the directory
* Install express, ejs, express-ejs-layouts, pg via npm
* Create an index.js file
* Setup a basic Express server with a root route

Use this for your basic root route just to make sure it is working.

```js
app.get('/', function(req, res) {
  res.send('HELLO TACO!!!');
});
```

At this point you should be able to run `nodemon` and then go to `http://localhost:3000` and see "HELLO TACO!!!".

#### Create a home page with a view

* Create a `views` folder
* Create a file for your home page: `index.ejs`
* Add HTML to the file created above
* Render the index page on your root route
  * Don't forget to set up your EJS view engine

Change your root route to render your home page (index.ejs)

```js
app.get('/', function(req, res) {
  res.render('index.ejs');
});
```

**STOP** At this point we should be able to go to `localhost:3000` and see an html page that is the result of the contents of what is in `index.ejs`. 

> Note: If you'd like, feel free to use partials for parts of the page.

#### Structure

Your EJS views should be organized using folders. Here is an example.
Use the `express-ejs-layouts` module so the main structure of your site
appears in only one file, the `layout.ejs` file.

```
- express-daily-planet
  - views
    - layout.ejs
    - articles
      - index.ejs
      - new.ejs
      - show.ejs
    - site
      - home.ejs
      - about.ejs
      - contact.ejs
```

### Data setup

We'll store all the articles in Postgres. Use Sequelize to create a model
representing an article. Articles should have a `title` property and a `content`
property.

#### The Articles Model

| Column Name | Column Type |
| ----------------- | ---------------------- |
| title | string |
| content | text |
| author | string |

Use this table as a reference when running the `sequelize model:create` command in the next section

> Note: You do not need to create the columns `id`, `createdAt`, or `updatedAt`. Sequelize gives you those ones for free.

#### Setting up Sequelize

* Set up Sequelize
  * The `sequelize init` command. This sets up a `config.json` file.
  * Set up your config file as appropriate - change the database name, credentials, and SQL flavor. We'll use `postgres` as our SQL flavor!
  * Create a database for this app to use on your local machine with the `createdb DB_NAME` command. Be sure to replace `DB_NAME` with an actual name of your actual database!
  * Don't create your tables with raw SQL. Instead use the `sequelize model:create` command. Remember to make the names singular and lower case!
  * Remember that even though you've created the models, the tables don't actually get created until you run `sequelize db:migrate`!
* Replace the old references to the JSON file with actual Sequelize commands to read/write to the database

> Tip: You can run `sequelize db:migrate:undo` to reverse a migration

#### Routes

You'll need to create the following `articles` routes. Here's the class notes on implementing basic [CRUD in Express](https://gawdiseattle.gitbooks.io/wdi/05-node-express/express-REST-crud/00readme.html)

> Note: you won't need to create routes to update or delete articles at this time. We'll go back and do this in a later assignment

* `GET /`
  * view: `views/index.ejs`
  * purpose: Serve the homepage of your site.
* `GET /articles`
  * view: `views/articles/index.ejs`
  * purpose: displays a list of all articles
* `GET /articles/new`
  * view: `views/articles/new.ejs`
  * purpose: displays a form that users use to create a new article
* `POST /articles`
  * view: none (redirects to /articles after the article is created)
  * purpose: creates a new article (adds to articles array and saves the file)
* `GET /articles/:id`
  * view: `views/articles/show.ejs`
  * purpose: find an article by id in the array of `articles` and display it.

### Your Turn

Reference course notes on [Sequelize](https://gawdiseattle.gitbooks.io/wdi/05-node-express/express-sequelize/04usingmodels.html) for how to use Sequelize's functions.

Refer to the list above and try to implement each route's requirements. For example, the `GET /articles` route needs a list of all articles. You can use Sequelize's `findAll()` function for this! Your code might look something like this:

```js
db.Article.findAll()
.then(function(articles){
  // TODO: Pass articles array to relevant EJS page
})
.catch(function(err){
  // TODO: Some error handling!
})
```

Keep in mind that your articles array could be empty if you haven't put any articles into it yet. 

> Tip: Make sure you include the models folder in your controller!

### Extras

It's up to you how far to go with the styling and static files. If you've really struggled up to this point, it's okay to skip this section.

#### Static Pages

Static pages are pages with data that doesn't get dynamically generated. Often it's data that doesn't change or very rarely changes. A company's "about" page is a good example of a page that changes very infrequently. Instead of having an EJS file for this type of page you might want to just write an HTML file and send it as a response with the `sendFile` method. You can use EJS with these pages if you would rather, but you won't be passing any data to them.

Create the following routes for static pages. Your pick whether to use EJS files or HTML files.

* `GET /about` serve a static about daily planet page.
* `GET /contact` serve a static contact page.

#### How do I use static files, like CSS, HTML, and front-end JS?

We'll need to set up a folder for serving up static files. Usually by convention, this will be a folder in your root directory called either `public` or `static`. Aside from that, you will need a small bit of code to let Express know where to look for those files. Don't worry - it's fairly straight-forward! Check out [Express documentation](http://expressjs.com/starter/static-files.html) for a useful resource.

#### Styling (Bootstrap, Materialize, etc.)

Style the page and include a navigation bar to help the user navigate the site.
Note that this is a news site, so style accordingly. Put the navbar in your
`layout.ejs` file so it appears everywhere easily! 

## Bonus Ideas

* Create a search form (can be on home page or articles index)
* Accept `q` query string on your articles route `/articles?q=search+term`
    * find how to access the query string from the request (Hint: the query isn't in `req.params`)
    * displays list of articles filtered by search term
    * ensure the route still works without a query string (displays all articles)
* There's no magic back-end solution to filtering! Use what you know about setting up routes, figure out how to access the query string and use regular JavaScript logic and array manipulation to build up an array of results.


---

## Licensing

1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
