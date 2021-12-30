import { sign } from 'jsonwebtoken'

export const jwtGenerator = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        sign(payload, process.env.JWTK!, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token)
            }
        });
    });
}