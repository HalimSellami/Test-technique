"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageParking {
    constructor() {
        this.parkings = [];
    }
    addParking(parking) {
        this.parkings.push(parking);
    }
    getAllParkings() {
        return this.parkings;
    }
    getParkingById(id) {
        return this.parkings.find(parking => parking.id === id);
    }
    updateParking(updateParking) {
        const parkingIndex = this.parkings.findIndex(parking => parking.id === updateParking.id);
        if (parkingIndex !== -1) {
            this.parkings[parkingIndex] = updateParking;
        }
    }
    deleteParking(id) {
        this.parkings = this.parkings.filter(parking => parking.id !== id);
    }
}
//# sourceMappingURL=StorageParking.js.map