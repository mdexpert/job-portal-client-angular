import { Component, OnInit } from '@angular/core';
import {ForrecruiterService} from '../../forrecruiter.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-rprofile',
  templateUrl: './rprofile.component.html',
  styleUrls: ['./rprofile.component.css']
})
export class RprofileComponent implements OnInit {

  constructor(private router:Router,private activeroute:ActivatedRoute,private recservice:ForrecruiterService) { }

  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
  //   this.recservice.getprofile().subscribe(
  //     (response: any) => {
  //       this.profileinfo = response;
  //       //console.log(JSON.stringify(response.profileimage));
  //       let image:any = response.profileimage;
  //       //console.log(image);
  //       if (image != "") {
  //         this.picexists = true;
  //       }
  //       else {
  //         this.picexists = false;
  //       }

  //     }, (error) => {
  //       console.log("Server Error");
  //     }
  //   )
   }
}
