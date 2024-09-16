const Joi = require('joi');

const employeeSchema = Joi.object({
    employeeName: Joi.string().min(2).max(20).required(),
    employeeId: Joi.string().min(2).max(10).required(),
    email: Joi.string().email().min(3).max(30).required(),
    designation: Joi.string().min(2).max(20).required(),
    department: Joi.string().min(2).max(20).required(),
    unit: Joi.string().min(2).max(20).required(),
});

const validateEmployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map(err => ({
                message: err.message,
                path: err.path.join('.')
            }))
        });
    }

    next();
};


module.exports ={
    validateEmployee
}
