"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteParking = exports.updateParking = exports.getParkingById = exports.gatAllParkings = exports.createParking = void 0;
const parkings_1 = require("../datas/parkings");
const parkingValidate_1 = require("../Validate/parkingValidate");
const ParkingService_1 = __importDefault(require("../services/ParkingService"));
const parkingService = new ParkingService_1.default();
// Controlleur pour ajouter un nouveau parking
const createParking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capacity } = req.body;
    const newParking = { id: parkings_1.parkingData.length + 1, name, capacity };
    const validateErrors = yield (0, parkingValidate_1.validateParking)(newParking);
    if (validateErrors.length > 0) {
        return res.status(400).json({ errors: validateErrors });
    }
    parkings_1.parkingData.push(newParking);
    parkingService.emitParkingCreateEvent(newParking.id);
    res.status(201).json(newParking);
});
exports.createParking = createParking;
// Controlleur pour recupérer tous les parkings
const gatAllParkings = (req, res) => {
    res.json(parkings_1.parkingData);
};
exports.gatAllParkings = gatAllParkings;
// Controlleur pour recupérer un parking
const getParkingById = (req, res) => {
    const parkingId = parseInt(req.params.id);
    const parking = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    if (parking !== -1) {
        res.json(parkings_1.parkingData[parking]);
    }
    else {
        res.status(404).send(`Le parking n'hésiste pas`);
    }
};
exports.getParkingById = getParkingById;
// Controlleur pour modifier un parking
const updateParking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parkingId = parseInt(req.params.id);
    const { name, capacity } = req.body;
    const parkingIndex = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    if (parkingIndex !== -1) {
        const validateErrors = yield (0, parkingValidate_1.validateParking)(parkings_1.parkingData[parkingIndex]);
        if (validateErrors.length > 0) {
            return res.status(400).json({ errors: validateErrors });
        }
        parkings_1.parkingData[parkingIndex] = { id: parkingId, name, capacity };
        parkingService.emitParkingUpdateEvent(parkingIndex);
        res.json(parkings_1.parkingData[parkingIndex]);
    }
    else {
        res.status(404).send(`Le parking n'hésiste pas`);
    }
});
exports.updateParking = updateParking;
// Controlleur pour supprimer un parking
const deleteParking = (req, res) => {
    const parkingId = parseInt(req.params.id);
    const parkingIndex = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    if (parkingIndex !== -1) {
        parkings_1.parkingData.splice(parkingIndex, 1);
        parkingService.emitParkingDeleteEvent(parkingIndex);
        res.send(`Le parking ${parkingId} a été supprimé`);
    }
    else {
        res.status(404).send(`Le parking n'hésiste pas`);
    }
};
exports.deleteParking = deleteParking;
//# sourceMappingURL=parkingController.js.map