import { EventEmitter } from 'events';

// Service qui permet différent listerneur concernant les actions ( creation, modification et suppression ) d'un parking
class ParkingService {
    private eventEmitter: EventEmitter;

    constructor() {
        this.eventEmitter= new EventEmitter();
    }

    emitParkingCreateEvent(parkingId: number) {
        this.eventEmitter.emit('parkingCreate', parkingId);
    }

    emitParkingUpdateEvent(parkingId: number) {
        this.eventEmitter.emit('parkingUpdate', parkingId);
    }

    emitParkingDeleteEvent(parkingId: number) {
        this.eventEmitter.emit('parkingDelete', parkingId);
    }

    onParkingCreate(callback: (parkingId: number) => void) {
        this.eventEmitter.on('parkingCreate', (parkingId: number) => {
            callback(parkingId);
            console.log(`Parking créé avec l'ID: ${parkingId}`);
        });
    }

    onParkingUpdate(callback: (parkindId: number) => void) {
        this.eventEmitter.on('parkingUpdate', (parkingId: number) => {
            callback(parkingId);
            console.log(`Parking avec l'ID: ${parkingId} a été modifié`);
        });
    }

    onParkingDelete(callback: (parkindId: number) => void) {
        this.eventEmitter.on('parkingDelete', (parkingId: number) => {
            callback(parkingId);
            console.log(`Parking avec l'ID: ${parkingId} a été supprimé`);
        });
    }
}

export default ParkingService;