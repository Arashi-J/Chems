"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCase = exports.textNormalizer = void 0;
const textNormalizer = (text) => {
    return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '').toLowerCase().trim();
};
exports.textNormalizer = textNormalizer;
const titleCase = (text = '') => {
    return text.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
};
exports.titleCase = titleCase;
//# sourceMappingURL=text-normalizers.js.map