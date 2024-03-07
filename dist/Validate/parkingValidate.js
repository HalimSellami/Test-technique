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
exports.validateParking = void 0;
const class_validator_1 = require("class-validator");
const validateParking = (parking) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield (0, class_validator_1.validate)(parking);
    if (errors.length > 0) {
        return errors.map(error => Object.values(error.constraints)).flat();
    }
    return [];
});
exports.validateParking = validateParking;
//# sourceMappingURL=parkingValidate.js.map