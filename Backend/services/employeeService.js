const Employee = require('../models/employeeModel');

const addEmployee = async (data) => {
    const existingEmployee = await Employee.findOne({ 
        $or: [{ email: data.email }, { employeeId: data.employeeId }]
    });
    
    if (existingEmployee) {
        return { success: false, message: 'Employee ID or Email already exists' };
    }

    const newEmployee = new Employee(data);
    await newEmployee.save();

    return { success: true, message: 'Employee created successfully', employee: newEmployee };
};

const fetchEmployees = async (query) => {
    const { searchKey } = query;

    
    const limit = query.limit || 8;
    const page = query.page || 1;

    const filters = {};

    if (searchKey) {
        filters.$or = [
            { employeeName: { $regex: searchKey, $options: 'i' } },
            { employeeId: searchKey },
            { designation: searchKey }
        ];
    }

    const totalEmployees = await Employee.countDocuments(filters);

    const totalPages = Math.ceil(totalEmployees / limit);

    const employees = await Employee.find(filters)
        .limit(limit)
        .skip((page - 1) * limit);

    return {
        success: true,
        currentPage: page,
        totalPages,
        totalEmployees,
        employees
    };
};

const toggleEmployeeStatus = async (data) =>{

        const employee = await Employee.findOne(data);

        if(employee){
            employee.isActive = !employee.isActive;

            await employee.save();
            return (`Employee Status Updated to ${employee.isActive?'Active' :'inActive'}`);
        }
        else{
            console.log('Employee not found');
        }
}


module.exports = {
    addEmployee,
    fetchEmployees,
    toggleEmployeeStatus,
}
