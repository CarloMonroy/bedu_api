const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("ecommerce", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

const Users = sequelize.define("users", {
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
});

const Adresses = sequelize.define("adresses", {
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
});

const Products = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Sales = sequelize.define("sales", {
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
});
