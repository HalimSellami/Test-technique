import { validate } from 'class-validator';
import { Parking } from '../interfaces/Parking';

export const validateParking = async (parking: Parking): Promise<string[]> => {
    const errors = await validate(parking);
    if (errors.length > 0) {
        return errors.map(error => Object.values(error.constraints)).flat();
    }
    return [];
};