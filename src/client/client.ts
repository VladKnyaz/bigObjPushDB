onNet('getVehInfo', (name: string, hash: number) => {
    try {
        let tract = GetVehicleModelMaxTraction(hash);
        let speed = GetVehicleModelEstimatedMaxSpeed(hash);
        let bracking = GetVehicleModelMaxBraking(hash);
        let accelt = GetVehicleModelAcceleration(hash);
        emitNet('AddVehiclesInfo', name, hash, tract, speed, bracking, accelt);
    } catch (e) {
        console.warn('ошибка', e);
    }
});
