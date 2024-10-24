import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private apiUrl = 'http://localhost:8000/api/auth'
  private email:String | null=null;

constructor(private http:HttpClient) { }

sendOtp(email:String){
  console.log(email);
return this.http.post<any>(`${this.apiUrl}/request-otp`,{email});
}

setEmail(email:String){
this.email = email;
}

getEmail(){
return this.email;
}

verifyOtp(data:{email:String, otp:String}):Observable<any>{
return this.http.post<any>(`${this.apiUrl}/verify-otp`,data);
}

createEmployee(empData:any, token:any){
  const apiUrl = 'http://localhost:8000/api/employees'
  const headers = new HttpHeaders({'AuthoriZation':`${token}`});
return this.http.post<any>(`${apiUrl}`,empData, {headers});
}

listEmployee(searchKey: string = '', page: number, itemsPerPage:number ): Observable<any> {

  const apiUrl = 'http://localhost:8000/api/employees';

  const params: any = {
    searchKey,
    page: page.toString(),
    limit:itemsPerPage
  };

  if (searchKey) {
    params.searchKey = searchKey;
  }

  return this.http.get<any>(apiUrl, { params });
}

disableEmployee(email:String, token:any){

  const apiUrl = 'http://localhost:8000/api/employees/disableUser';
  const headers = new HttpHeaders({'AuthoriZation':`${token}`});

  return this.http.post<any>(`${apiUrl}`,email,{headers});
}

createMeeting(organizer: string): Observable<any>{
  const apiUrl = 'http://localhost:8000/api/createMeeting/create';
  const body = { organizer }; 
  return this.http.post<any>(`${apiUrl}`,body)
}

}
