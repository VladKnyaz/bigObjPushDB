import { VehicleDb } from './database/models/vehicleModel';
import sequelize from './database/index';
import { IVehicleInfo } from './../globalInterfaces';
import Transaction from 'sequelize/types/transaction';

class Vehicles {
    static async isVehicleInDb(hash: number, transaction?: Transaction) {
        try {
            return await VehicleDb.findOne({
                where: {
                    hash,
                },
                transaction,
            });
        } catch (e: any) {
            console.error('Ошибка isVehicleInDb', e.message);
        }
    }

    static async loadInDb(vehiclesInfo: [IVehicleInfo]) {
        const transaction = await sequelize.transaction();

        try {
            let vehicle: IVehicleInfo;
            for (vehicle of vehiclesInfo) {
                if (
                    vehicle.name == undefined ||
                    vehicle.hash == undefined ||
                    vehicle.traction == undefined ||
                    vehicle.speed == undefined ||
                    vehicle.acceleration == undefined ||
                    vehicle.braking == undefined
                ) {
                    console.log(vehicle);
                    console.warn('Некоторые свойства объекта не указаны');
                    return;
                }
                let isInDB = await this.isVehicleInDb(vehicle.hash, transaction);

                if (isInDB != undefined) continue;

                let vehDb = await VehicleDb.create(
                    {
                        name: vehicle.name,
                        hash: vehicle.hash,
                        traction: vehicle.traction,
                        speed: vehicle.speed,
                        braking: vehicle.braking,
                        acceleration: vehicle.acceleration,
                    },
                    { transaction },
                );
            }

            await transaction.commit();
            TriggerClientEvent('chat:addMessage', 1, 'Данные успешно загружены');
        } catch (e: any) {
            TriggerClientEvent('chat:addMessage', 1, 'Ошибка: при загрузке данных в бд');
            console.error('Ошибка loadInDb: ', e.message);
            await transaction.rollback();
        }
    }
}

onNet('AddVehiclesInfo', async (vehiclesInfo: [IVehicleInfo]) => {
    try {
        Vehicles.loadInDb(vehiclesInfo);
    } catch (e: any) {
        console.warn('Ошибка AddVehiclesInfo:', e.message);
    }
});

RegisterCommand(
    'loadVehDb',
    async () => {
        try {
            emitNet('getVehInfo', 1);
        } catch (e: any) {
            console.error('Ошибка getVehInfo:', e.message);
        }
    },
    false,
);
