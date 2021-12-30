"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtGenerator = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        (0, jsonwebtoken_1.sign)(payload, process.env.JWTK, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.jwtGenerator = jwtGenerator;
//# sourceMappingURL=jwt-generator.js.map