"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parkingController_1 = require("./Controller/parkingController");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Gestion des routes pour la gestion des parkings
// Page d'accueil
app.get('/', (req, res) => {
    res.send(`Gestion de parking`);
});
app.get('/parkings', parkingController_1.gatAllParkings); // Affiche tous les parkings
app.get('/parkings/:id', parkingController_1.getParkingById); // Affiche un parking
app.post('/parkings', parkingController_1.createParking); // Rajoute un parking
app.put('/parkings/:id', parkingController_1.updateParking); // Modifie un parking
app.delete('/parkings/:id', parkingController_1.deleteParking); // Supprime un parking
// Lancer le serveur
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
}).on('error', (err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map