"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _FileController = require('../controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _FileController2.default.store);
exports. default = router;
