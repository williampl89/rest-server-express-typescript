import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'root', 'abc123', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;