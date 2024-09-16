const { addEmployee , fetchEmployees, toggleEmployeeStatus } = require('../services/employeeService');

const createEmployee = async (req, res) => {
    try {
        const result = await addEmployee(req.body);
        res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// New retrieveEmployees function
const retrieveEmployees = async (req, res) => {
    try {
        const result = await fetchEmployees(req.query);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const disableEmployee = async (req, res) =>{
    try{
        const employee = await toggleEmployeeStatus(req.body);
        res.status(200).json(employee);
    }
    catch(error){
        res.status(500).json({success:false, message:'Server error'});
    }
}


module.exports ={
    createEmployee,
    retrieveEmployees,
    disableEmployee,
}