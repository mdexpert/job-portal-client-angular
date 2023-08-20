import { Component, OnInit } from '@angular/core';
import {ForrecruiterService} from '../../forrecruiter.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-rprofile',
  templateUrl: './rprofile.component.html',
  styleUrls: ['./rprofile.component.css']
})
export class RprofileComponent implements OnInit {
  profileinfo: any;
  successmsg: any;

  constructor(private router:Router,private activeroute:ActivatedRoute,private recservice:ForrecruiterService) { }

  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
     this.recservice.getprofile().subscribe(
      (response: any) => {
        this.profileinfo = response; 

      }, (error) => {
        console.log("Server Error");
      }
     )
   }


   logout() {
    this.recservice.logout();
    this.router.navigate(['login/emp_login']);
  }
}
