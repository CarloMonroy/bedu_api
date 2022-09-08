require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
const port = 8080;

const sequelize = new Sequelize("ecommerce", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
  res.send("Api Core Working!");
});

app.post("/create_account", (req, res) => {
  let email = req.query.email;
  let name = req.query.name;
  let password = req.query.password;
  // Create a new user using seuqelize
  Users.create({
    email: email,
    name: name,
    password: password,
  }).catch((err) => {
    console.log(err);
    res.send("Error creating user");
  });
  res.send("Account created!");
});

app.post("/add_address", (req, res) => {
  let email = req.query.email;
  let user_id = req.query.user_id;
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let zip = req.query.zip;

  Adresses.create({
    user_id: user_id,
    street: street,
    city: city,
    state: state,
    zip: zip,
  }).catch((err) => {
    console.log(err);
    res.send("Error adding address");
  });
  res.send("Address added!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get("/get_address", (req, res) => {
  let email = req.query.email;
  let user_id = req.query.user_id;
  let query = Adresses.findAll({
    where: {
      user_id: 1,
    },
    raw: true,
  }).catch((err) => {
    console.log(err);
    res.send("Error getting address");
  });
});

app.post("/get_reviews", (req, res) => {
  let product_id = req.query.product_id;
  let query = Reviews.findAll(
    {
      where: {
        product_id: product_id,
      },
    },
    { raw: true }
  ).catch((err) => {
    console.log(err);
    res.send("Error getting reviews");
  });
  console.log(query);
  res.send(query);
});

// Models
const Users = sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Adresses = sequelize.define(
  "adresses",
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

const Products = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Sales = sequelize.define(
  "sales",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Products,
        key: "id",
      },
    },
  },
  { timestamps: false }
);
