
export const textNormalizer = (text: string) => {

    return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '').toLowerCase().trim();

}

export const titleCase = (text: string = ''): string => {
    return text.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}



