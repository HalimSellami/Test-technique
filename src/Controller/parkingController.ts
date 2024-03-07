import { Request, Response } from "express";
import { Parking } from "../interfaces/Parking";
import { parkingData } from "../datas/parkings";
import { validateParking } from "../Validate/parkingValidate";
import ParkingService from "../services/ParkingService";

const parkingService = new ParkingService();

// Controlleur pour ajouter un nouveau parking
export const createParking = async (req: Request, res: Response) => {
    // Récupère les données 
    const { name, capacity } = req.body;
    
    // Affecte les donnée dans la variable 'newParking'
    const newParking: Parking = { id: parkingData.length + 1, name, capacity };

    // Utilise validateParking pour vérifier si les données
    const validateErrors = await validateParking(newParking)

    if (validateErrors.length > 0) {
        // Si des erreurs son remontées on renvois 404 et les erreurs
        return res.status(400).json({ errors: validateErrors});
    }

    //Rajoute le nouveau parking en bdd ( ici dans mon tableau)
    parkingData.push(newParking);
    // Listeneur lors du rajouts de parking
    parkingService.emitParkingCreateEvent(newParking.id);
    res.status(201).json(newParking);
};

// Controlleur pour recupérer tous les parkings
export const getAllParkings = (req: Request, res: Response) => {
    // affiche le tableau des parkings
    res.status(200).json(parkingData);
};

// Controlleur pour recupérer un parking
export const getParkingById = (req: Request, res: Response) => {
    // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau
    const parking = parkingData.findIndex(parking => parking.id === parkingId);
    

    if(parking !== -1) {
        // Si présent affiche le tableau
        res.status(200).json(parkingData[parking]);
    } else {
        // Si non envoie un 404
        res.status(404).send( `Le parking n'existe pas` );
    }
};

// Controlleur pour modifier un parking
export const updateParking = async (req: Request, res: Response) => {
    // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau
    const parkingIndex = parkingData.findIndex(parking => parking.id === parkingId);

    if (parkingIndex !== -1) {
        // Si présent
        // Récupère les données 
        const { name, capacity } = req.body;
        // Stock les données dans la variable 'parkingUpdate'
        const parkingUpdate = { id: parkingId, name, capacity };

        // Utilise validateParking pour vérifier si les données
        const validateErrors = await validateParking(parkingUpdate);
        if (validateErrors.length > 0) {
            // Si des erreurs son remontées on renvois 404 et les erreurs
            return res.status(400).json({ errors: validateErrors});
        }

        // On replace les ancienne données par les nouvelles
        parkingData[parkingIndex] = parkingUpdate;
        // Listeneur lors de la modification de parking
        
        parkingService.emitParkingUpdateEvent(parkingIndex);
        res.status(200).json(parkingData[parkingIndex]);
    } else {
        // Si non envoie un 404
        res.status(404).send( `Le parking n'existe pas` );
    }
};

// Controlleur pour supprimer un parking
export const deleteParking = (req: Request, res: Response) => {
     // Récupére l'id du parking
    const parkingId = parseInt(req.params.id);
    // Vérifie si l'id est bien présent dans le tableau 
    const parkingIndex = parkingData.findIndex(parking => parking.id === parkingId);

    console.log(parkingIndex);
    
    if (parkingIndex !== -1) {
        // Si présent
        // Supprime le parking du tableau
        parkingData.splice(parkingIndex, 1);
        // Listeneur lors de la modification de parking
        console.log('tutu');
        
        parkingService.emitParkingDeleteEvent(parkingIndex);
        // Listeneur lors de la suppression  de parking
        res.status(200).send( `Le parking ${parkingId} a été supprimé` );
    } else {
        // Si non envoie un 404
        res.status(404).send( `Le parking n'existe pas` );
    }
};