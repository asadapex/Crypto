"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCardInfo = void 0;
const client_1 = require("@prisma/client");
exports.VideoCardInfo = {
    [client_1.VideoCardType.GTX_1660]: { hashRate: 0.0002, price: 200 },
    [client_1.VideoCardType.RTX_3060]: { hashRate: 0.0005, price: 350 },
    [client_1.VideoCardType.RTX_3080]: { hashRate: 0.0009, price: 700 },
    [client_1.VideoCardType.RTX_4090]: { hashRate: 0.0015, price: 1600 },
};
//# sourceMappingURL=VideoCardInfo.js.map