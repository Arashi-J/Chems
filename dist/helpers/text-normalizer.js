"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textNormalizer = void 0;
const textNormalizer = (text) => {
    return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '').toLowerCase().trim();
};
exports.textNormalizer = textNormalizer;
//# sourceMappingURL=text-normalizer.js.map