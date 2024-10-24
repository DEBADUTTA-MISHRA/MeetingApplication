import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  {path:'sendOtp', component:SendOtpComponent},
  {path:'verifyOtp', component:VerifyOtpComponent},
  {path:'homePage', component:HomePageComponent},
  {path:'header', component:HeaderComponent},
  {path:"**", redirectTo:"sendOtp"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
