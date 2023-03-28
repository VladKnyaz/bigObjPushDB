import { Sequelize } from 'sequelize';

const dbName = 'testres';
const dbLogin = 'root';
const dbPass = 'test';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbLogin, dbPass, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 1,
        min: 1,
        idle: 15000,
    },
});

export default sequelize;
// полное удаление всех таблиц и восстановление без данных
async function syncDB() {
    sequelize.sync({ force: true });
}

// syncDB();
