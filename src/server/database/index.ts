import { Sequelize } from 'sequelize';

const dbName = 'test';
const dbLogin = 'test';
const dbPass = 'test';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbLogin, dbPass, {
    host: dbHost,
    dialect: 'mysql',
    logging: console.log,
    pool: {
        max: 5200,
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
