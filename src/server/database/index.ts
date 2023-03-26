import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testres', 'root', 'cAfXUqWWWK', {
    host: 'localhost',
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
