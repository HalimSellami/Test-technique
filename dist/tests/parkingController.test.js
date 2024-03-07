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
Object.defineProperty(exports, "__esModule", { value: true });
const parkingController_1 = require("../src/Controller/parkingController");
const parkings_1 = require("../src/datas/parkings");
describe('ParkingController', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            params: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test(`Créer un nouveau parking`, () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = { name: 'Nouveau parking', capacity: 200 };
        yield (0, parkingController_1.createParking)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: expect.any(Number), name: 'Nouveau parking', capacity: 200 });
    }));
    test(`Récupérer tous les parkings`, () => {
        (0, parkingController_1.getAllParkings)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(parkings_1.parkingData);
    });
    test(`Afficher un parking via son id`, () => {
        req.params = { id: '2' };
        (0, parkingController_1.getParkingById)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 2, name: 'Parking 2', capacity: 200 });
    });
    test(`Mettre à jour un parking existant`, () => __awaiter(void 0, void 0, void 0, function* () {
        req.params = { id: '1' };
        req.body = { name: 'Nom modifier', capacity: 600 };
        yield (0, parkingController_1.updateParking)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Nom modifier', capacity: 600 });
    }));
    test(`Supprimer un parking existant`, () => {
        req.params = { id: '1' };
        (0, parkingController_1.deleteParking)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Le parking 1 a été supprimé');
    });
    test(`Retourne 404 car parking n'existe pas`, () => {
        req.params = { id: '999' };
        (0, parkingController_1.getParkingById)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
});
//# sourceMappingURL=parkingController.test.js.map