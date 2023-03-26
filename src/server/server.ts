import { vehicleHashes } from './storage/transport';
import { VehicleDb } from './database/models/vehicleModel';
import { fixedNum3 } from './utils';
import sequelize from './database/index';

class Vehicles {
    static async loadVehicles(listHash: { [name: string]: number }) {
        return new Promise(async (resolve, reject) => {
            await sequelize.authenticate();
            let i = 0;
            for (let veh in listHash) {
                i += 1;
                // название ТС
                let name: string = veh;

                // hash ТС
                let hash: number = listHash[name];
                // если ТС больше чем 100 шт, чтобы база не выдавала to many connect и клиент игрока не охерел, делаем задержку
                if (i >= 100) {
                    setTimeout(() => {
                        emitNet('getVehInfo', 1, name, hash);
                    }, 1000 + i * 10);
                }
            }
        }).catch((e) => {
            console.log('ошибка', e);
        });
    }

    static async loadInDb(
        name: string,
        hash: number,
        traction: number,
        speed: number,
        braking: number,
        acceleration: number,
    ) {
        try {
            if (!name || !hash || !traction || !speed || !acceleration || !braking) return;

            traction = fixedNum3(traction); // округлеие до 3 знаков
            speed = fixedNum3(speed);
            acceleration = fixedNum3(acceleration);
            braking = fixedNum3(braking);

            let tst = await VehicleDb.create({
                name,
                hash,
                traction,
                speed,
                braking,
                acceleration,
            });

            await tst.save();
        } catch (e) {
            console.log('ошибка!');
            await sequelize.close();
        }
    }
}

onNet(
    'AddVehiclesInfo',
    async (
        name: string,
        hash: number,
        tract: number,
        speed: number,
        braking: number,
        accelt: number,
    ) => {
        try {
            Vehicles.loadInDb(name, hash, tract, speed, braking, accelt);
        } catch (e) {
            console.warn('ошибка', e);
        }
    },
);

RegisterCommand(
    'loadVehDb',
    async () => {
        try {
            await Vehicles.loadVehicles(vehicleHashes).then(() => {
                console.log('пуш в бд successfully');
            });
        } catch (e) {
            console.warn('ошибка', e);
        }
    },
    false,
);
