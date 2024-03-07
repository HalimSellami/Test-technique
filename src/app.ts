import express from 'express';
import { createParking, getParkingById, getAllParkings, updateParking, deleteParking } from './Controller/parkingController';

const app = express();
const port = 3000;

app.use(express.json());

// Gestion des routes pour la gestion des parkings

// Page d'accueil
app.get('/', (req, res) => {
    res.send( `Gestion de parking` );
});

app.get('/parkings', getAllParkings); // Affiche tous les parkings
app.get('/parkings/:id', getParkingById); // Affiche un parking
app.post('/parkings', createParking); // Rajoute un parking
app.put('/parkings/:id', updateParking); // Modifie un parking
app.delete('/parkings/:id', deleteParking); // Supprime un parking

// Lancer le serveur
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
}).on('error', (err) => {
    console.error(err);
});