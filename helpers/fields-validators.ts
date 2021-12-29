export const validPhrases = (value: any) => {

    if (value === []) {
        return
    }

    if (!Array.isArray(value)) {
        throw new Error('Las frases P y H deben ser un arreglo de objetos tipo Phrase: [{code: string, description: string}]');
    }

    for (const item of value) {
        if (!(typeof (item.code) === 'string' && typeof (item.description) === 'string')) {
            throw new Error(`No se recibió un arreglo de objetos tipo Phrase: {code: string, description: string}`)
        }
    }
}