import { Sequelize } from 'sequelize';
import Guest from '../models/Guest';

const models = [Guest];

class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
    });

    this.init();
  }

  init() {
    models.map((model) => model.start(this.connection));

    this.connection
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error);
      })
      .then(() => this.connection.sync({ force: false }));
  }
}

export default new Database();
