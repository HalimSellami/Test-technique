"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
// Service qui permet différent listerneur concernant les actions ( creation, modification et suppression ) d'un parking
class ParkingService {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    emitParkingCreateEvent(parkingId) {
        this.eventEmitter.emit('parkingCreate', parkingId);
    }
    emitParkingUpdateEvent(parkingId) {
        this.eventEmitter.emit('parkingUpdate', parkingId);
    }
    emitParkingDeleteEvent(parkingId) {
        this.eventEmitter.emit('parkingDelete', parkingId);
    }
    onParkingCreate(callback) {
        this.eventEmitter.on('parkingCreate', (parkingId) => {
            callback(parkingId);
            console.log(`Parking créé avec l'ID: ${parkingId}`);
        });
    }
    onParkingUpdate(callback) {
        this.eventEmitter.on('parkingUpdate', (parkingId) => {
            callback(parkingId);
            console.log(`Parking avec l'ID: ${parkingId} a été modifié`);
        });
    }
    onParkingDelete(callback) {
        this.eventEmitter.on('parkingDelete', (parkingId) => {
            callback(parkingId);
            console.log(`Parking avec l'ID: ${parkingId} a été supprimé`);
        });
    }
}
exports.default = ParkingService;
//# sourceMappingURL=ParkingService.js.map