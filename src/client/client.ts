import { IVehicleInfo } from './../globalInterfaces';

onNet('getVehInfo', (name: string, hash: number) => {
    try {
        let vehiclesNames = GetAllVehicleModels();
        let vehiclesInfo: IVehicleInfo[] = [];

        for (let name of vehiclesNames) {
            let hash = GetHashKey(name);

            let traction = GetVehicleModelMaxTraction(hash);
            let speed = GetVehicleModelEstimatedMaxSpeed(hash);
            let braking = GetVehicleModelMaxBraking(hash);
            let acceleration = GetVehicleModelAcceleration(hash);

            vehiclesInfo.push({ name, hash, traction, speed, braking, acceleration });
        }

        // emitNet('AddVehiclesInfo', name, hash, tract, speed, bracking, accelt);
        if (vehiclesInfo.length < 1) {
            throw Error('Array empty');
        }
        emitNet('AddVehiclesInfo', vehiclesInfo);
    } catch (e) {
        console.warn('ошибка', e);
    }
});
