import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.scss'
})
export class SendOtpComponent {

constructor(private globalService:GlobalService,private router:Router, private toastr:ToastrService){}

email:any = '';
name:any =''
otpSent:boolean = false;
message:any;
error:boolean = false;

sendOtp(){
  const emailRegex = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if(emailRegex.test(this.email)){
    this.globalService.sendOtp(this.email).subscribe(
      (response:any)=>{
        if(response.success){
          this.globalService.setEmail(this.email);
          this.otpSent = true;
          this.toastr.success('OTP sent successfully');
          this.router.navigate(['/verifyOtp']);
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
  else{
    this.error = true;
    this.message = 'Please enter a valid email'
  }
}

}
