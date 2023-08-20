import { Component, OnInit } from '@angular/core';
import { ForseekerService } from '../../forseeker.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  profileinfo: any; 
  successmsg: any;
  constructor(private seekerservice: ForseekerService, private router: Router) { }

  ngOnInit() {
    this.getprofile();

  }
  getprofile() {
    this.seekerservice.getprofile().subscribe(
      (response: any) => {
        this.profileinfo = response; 
      }, (error) => {
        console.log("Server Error");
      }
    )
  }
  logout() {
    this.seekerservice.logout();
    this.router.navigate(['login/emp_login']);
  }
  

}
