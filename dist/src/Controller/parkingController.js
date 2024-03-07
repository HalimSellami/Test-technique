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
exports.deleteParking = exports.updateParking = exports.getParkingById = exports.getAllParkings = exports.createParking = void 0;
const parkings_1 = require("../datas/parkings");
const parkingValidate_1 = require("../Validate/parkingValidate");
const ParkingService_1 = __importDefault(require("../services/ParkingService"));
const parkingService = new ParkingService_1.default();
// Controlleur pour ajouter un nouveau parking
const createParking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Récupère les données 
    const { name, capacity } = req.body;
    // Affecte les donnée dans la variable 'newParking'
    const newParking = { id: parkings_1.parkingData.length + 1, name, capacity };
    // Utilise validateParking pour vérifier si les données
    const validateErrors = yield (0, parkingValidate_1.validateParking)(newParking);
    if (validateErrors.length > 0) {
        // Si des erreurs son remontées on renvois 404 et les erreurs
        return res.status(400).json({ errors: validateErrors });
    }
    //Rajoute le nouveau parking en bdd ( ici dans mon tableau)
    parkings_1.parkingData.push(newParking);
    // Listeneur lors du rajouts de parking
    parkingService.emitParkingCreateEvent(newParking.id);
    res.status(201).json(newParking);
});
exports.createParking = createParking;
// Controlleur pour recupérer tous les parkings
const getAllParkings = (req, res) => {
    // affiche le tableau des parkings
    res.status(200).json(parkings_1.parkingData);
};
exports.getAllParkings = getAllParkings;
// Controlleur pour recupérer un parking
const getParkingById = (req, res) => {
    // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau
    const parking = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    if (parking !== -1) {
        // Si présent affiche le tableau
        res.status(200).json(parkings_1.parkingData[parking]);
    }
    else {
        // Si non envoie un 404
        res.status(404).send(`Le parking n'existe pas`);
    }
};
exports.getParkingById = getParkingById;
// Controlleur pour modifier un parking
const updateParking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau
    const parkingIndex = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    if (parkingIndex !== -1) {
        // Si présent
        // Récupère les données 
        const { name, capacity } = req.body;
        // Stock les données dans la variable 'parkingUpdate'
        const parkingUpdate = { id: parkingId, name, capacity };
        // Utilise validateParking pour vérifier si les données
        const validateErrors = yield (0, parkingValidate_1.validateParking)(parkingUpdate);
        if (validateErrors.length > 0) {
            // Si des erreurs son remontées on renvois 404 et les erreurs
            return res.status(400).json({ errors: validateErrors });
        }
        // On replace les ancienne données par les nouvelles
        parkings_1.parkingData[parkingIndex] = parkingUpdate;
        // Listeneur lors de la modification de parking
        parkingService.emitParkingUpdateEvent(parkingIndex);
        res.status(200).json(parkings_1.parkingData[parkingIndex]);
    }
    else {
        // Si non envoie un 404
        res.status(404).send(`Le parking n'existe pas`);
    }
});
exports.updateParking = updateParking;
// Controlleur pour supprimer un parking
const deleteParking = (req, res) => {
    // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau 
    const parkingIndex = parkings_1.parkingData.findIndex(parking => parking.id === parkingId);
    console.log(parkingIndex);
    if (parkingIndex !== -1) {
        // Si présent
        // Supprime le parking du tableau
        parkings_1.parkingData.splice(parkingIndex, 1);
        // Listeneur lors de la modification de parking
        console.log('tutu');
        parkingService.emitParkingDeleteEvent(parkingIndex);
        // Listeneur lors de la suppression  de parking
        res.status(200).send(`Le parking ${parkingId} a été supprimé`);
    }
    else {
        // Si non envoie un 404
        res.status(404).send(`Le parking n'existe pas`);
    }
};
exports.deleteParking = deleteParking;
//# sourceMappingURL=parkingController.js.map