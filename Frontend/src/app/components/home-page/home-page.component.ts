import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'node:console';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  empData = {
    employeeName: '',
    employeeId: '',
    email: '',
    designation: '',
    department: '',
    unit: ''
  }

  errorMessage = {
    employeeName: '',
    employeeId: '',
    email: '',
    designation: '',
    department: '',
    unit: ''
  };

  employeeName: string | null = '';

  employees: any[] = [];
  searchKey: string = '';
  currentPage: number = 1;
  // rowsOerPageOptions:number[] = [5, 10, 15, 20, 25];
  itemsPerPage = 5;
  totalEmployees: number = 0;
  start:number = 0;
  end:number = 0;
  paginatedItems:any[] = [];
  totalPage:number = 0;

  private token:any;


  // selectedRowsPerPage:number = this.rowsOerPageOptions[0];

  constructor(private globalService: GlobalService, private toastr: ToastrService) { }
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.employeeName = localStorage.getItem('employeeName');
      this.token = localStorage.getItem('token');
    }
    this.listEmployee(this.currentPage, this.searchKey);
    // this.updatePagination();
  }
  addEmployee() {

    this.errorMessage = {
      employeeName: '',
      employeeId: '',
      email: '',
      designation: '',
      department: '',
      unit: ''
    };

    if (!this.empData.employeeName) {
      this.errorMessage.employeeName = 'Employee Name is required.';
    } else if (this.empData.employeeName.length < 2 || this.empData.employeeName.length > 20) {
      this.errorMessage.employeeName = 'Employee Name must be between 2 and 20 characters.';
    }

    if (!this.empData.employeeId) {
      this.errorMessage.employeeId = 'Employee ID is required.';
    } else if (this.empData.employeeId.length < 3 || this.empData.employeeId.length > 10) {
      this.errorMessage.employeeId = 'Employee ID must be between 3 and 10 characters.';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.empData.email) {
      this.errorMessage.email = 'Email is required.';
    } else if (!emailPattern.test(this.empData.email)) {
      this.errorMessage.email = 'Please enter a valid email address.';
    }

    if (!this.empData.designation) {
      this.errorMessage.designation = 'Please select a designation.';
    }

    if (!this.empData.department) {
      this.errorMessage.department = 'Please select a department.';
    }

    if (!this.empData.unit) {
      this.errorMessage.unit = 'Please select a unit.';
    }

    if (Object.values(this.errorMessage).some(msg => msg !== '')) {
      return;
    }

    console.log("EmployeeManans:  ", this.employeeName);
    console.log("toekn in home ",this.token);
    this.globalService.createEmployee(this.empData,this.token).subscribe({
      next: (response) => {
        this.toastr.success("Employee created successfully");
        console.log(response);
        console.log("Employee added to list with data: ", response.employee);
      },
      error: (error) => {
        this.toastr.error('Failed to create employee. Please try again');
      }
    })
  }

  listEmployee(page: number, searchKey: string = ''): void {
    this.globalService.listEmployee(searchKey, page, this.itemsPerPage).subscribe(
      (response: any) => {
        if (response.success) {
          this.employees = response.employees;
          this.totalEmployees = response.totalEmployees;
          this.currentPage = response.currentPage;
          this.totalPage = response.totalPages;

          this.start = (this.currentPage - 1) * this.itemsPerPage + 1;
        this.end = Math.min(this.currentPage * this.itemsPerPage, this.totalEmployees);

        } else {
          this.toastr.error('Failed to load employees');
        }
      },
      (error) => {
        this.toastr.error('Error loading employees');
      }
    );
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.listEmployee(this.currentPage, this.searchKey);
  }


  onRowsPerPageChange(newValue:number){
    this.itemsPerPage = newValue;
    this.listEmployee(this.currentPage, this.searchKey);
  }

  toggleStatus(employee:any){
    employee.isActive = !employee.isActive;
    this.globalService.disableEmployee(employee.email, this.token).subscribe(
      (response)=>{
        console.log('Employee Status Changed');
      },
      (error)=>{
        console.error('Failed to change employee status');
        employee.isActive = !employee.isActive;
      }
    )
  }
}
