import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  employeeName: string | null | undefined;
  showCreateMeetingForm: boolean = false;  // Toggle variable for form display
  organizerName: string = '';
  meetingLink: string = '';  // To store the generated meeting link

  constructor(private globalService:GlobalService){}

  ngOnInit(){
    if (typeof window !== 'undefined' && window.localStorage) {
      this.employeeName = localStorage.getItem('employeeName');
  }
}

// Method to toggle the form display
toggleCreateMeetingForm() {
  this.showCreateMeetingForm = !this.showCreateMeetingForm;
}

// Method to create a meeting and generate a Jitsi Meet link
createMeeting() {
  this.globalService.createMeeting(this.organizerName).subscribe(
    (response: any) => {
      console.log('Meeting created successfully', response);
      this.meetingLink = response.meetingUrl;  // Display the generated Jitsi Meet link
    },
    (error) => {
      console.error('Error creating meeting', error);
    }
  );
}

}
