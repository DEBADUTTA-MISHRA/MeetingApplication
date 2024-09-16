const express = require('express');
const { createEmployee, retrieveEmployees, disableEmployee } = require('../controllers/employeeController');
const { validateEmployee } = require('../validators/employeeValidator');
const {verifyJwt} = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/', validateEmployee, verifyJwt, createEmployee);

router.post('/disableUser', verifyJwt, disableEmployee);

router.get('/', retrieveEmployees);

module.exports = router;
