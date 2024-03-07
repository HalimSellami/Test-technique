import { Request, Response } from 'express';
import { getParkingById, createParking, getAllParkings, updateParking, deleteParking } from '../src/Controller/parkingController';
import { parkingData } from '../src/datas/parkings';

describe('ParkingController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    // Initialise les variables avant chaque test
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

    // Permet de tous réinitialisées a la fin de chaque test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test sur la création de parking avec la methode createParking
    test(`Créer un nouveau parking`, async () => {
        // Affectue des données 
        req.body = { name: 'Nouveau parking', capacity: 200 };
    
        // Utilise createParking avec les données
        await createParking(req as Request, res as Response);
    
        // Verifie le status de la réponse
        expect(res.status).toHaveBeenCalledWith(201);
        // Vérifie bien que la fonction createParking a été appeler avec les bonnes données
        expect(res.json).toHaveBeenCalledWith({ id: expect.any(Number), name: 'Nouveau parking', capacity: 200 });
    });

    // Test sur la recupération de parking avec la methode getAllParkings
    test(`Récupérer tous les parkings`, () => {
        getAllParkings(req as Request, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(parkingData);
    });

    // Test sur la recupération d'un seul parking avec la methode getParkingById
    test(`Afficher un parking via son id`, () => {
        req.params = { id: '2' };

        getParkingById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 2, name: 'Parking 2', capacity: 200 });
    });

    // Test sur la modification de parking avec la methode updateParking
    test(`Mettre à jour un parking existant`, async () => {
        req.params = { id: '1' };
        req.body = { name: 'Nom modifier', capacity: 600 };
    
        await updateParking(req as Request, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Nom modifier', capacity: 600 });
    });

    // Test sur la suppression  de parking avec la methode deleteParking
    test(`Supprimer un parking existant`, () => {
        req.params = { id: '1' };
    
        deleteParking(req as Request, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Le parking 1 a été supprimé');
    });

    // Test sur la recupération d'un parking qui n'existe pas
    test(`Retourne 404 car parking n'existe pas`, () => {
        req.params = { id: '999' };
        
        getParkingById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});