"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
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
        this.eventEmitter.on('parkingCreate', callback);
    }
    onParkingUpdate(callback) {
        this.eventEmitter.on('parkingUpdate', callback);
    }
    onParkingDelete(callback) {
        this.eventEmitter.on('parkingUpdate', callback);
    }
}
exports.default = ParkingService;
//# sourceMappingURL=ParkingService.js.map