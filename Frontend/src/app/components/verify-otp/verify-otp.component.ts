import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export class VerifyOtpComponent {

  otp:any;
email:any = '';
name:any =''
otpSent:boolean = false;
message:any;
error:boolean = false;

  constructor(private globalService:GlobalService,private router:Router, private toastr:ToastrService){}

  verifyOtp(){
    const email = this.globalService.getEmail();

    if(email){
      this.globalService.verifyOtp({email:email, otp:this.otp}).subscribe(
        (response)=>{
          if(response.success){
            this.toastr.success("LogIn Successfully");
            localStorage.setItem("employeeName",response.employee.employeeName);
            console.log("toekn",response.token);
            localStorage.setItem("token",response.token);
            this.router.navigate(['/homePage']);
          } else{
            this.toastr.error(response.message);
          }
        },
        error =>{
          console.error("Error Verifying OTP");
          this.toastr.error("Error Vreifyin OTP");
        }
      )
    }
    else{
      console.log("Email Not Found");
      this.toastr.error("Email Not Found. Please retry the process");
    }
  }

  sendOtp(){
    this.email = this.globalService.getEmail();
      this.globalService.sendOtp(this.email).subscribe(
        (response:any)=>{
          if(response.success){
            this.otpSent = true;
            this.toastr.success('OTP resent successfully');
          } 
          else {
            this.toastr.error(response.message);
          }
        },
        error =>{
          console.error("Error Sending OTP",error);
          this.toastr.error('Error sending OTP');
        }
      );
  }

}
