import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { ForrecruiterService } from '../../../forrecruiter.service';
@Component({
  selector: 'app-recruiterregister',
  templateUrl: './recruiterregister.component.html',
  styleUrls: ['./recruiterregister.component.css']
})
export class RecruiterregisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private rec_service:ForrecruiterService){ }
  RecruiterRegisterForm:FormGroup;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  submitted =false;
  ngOnInit() {
    this.RecruiterRegisterForm=this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required],
      mobile: [''],
      firstName: ['',Validators.required],
      lastName: [''],
      country: [''],
      state: [''],
      companyName: ['',Validators.required],
      referenceCOde: [''],
      inviteCode: [''],      
      
      // industryType:['',Validators.required],
      // yearsofExp: [''],
      // About: ['',Validators.required]
      });
  }
  register_rectuiter()
  {
    this.submitted = true;

    if (!this.RecruiterRegisterForm.valid) {       
       return;
    }

    this.rec_service.recruiter_register(JSON.stringify(this.RecruiterRegisterForm.value)).subscribe(
      (response:any)=>{
        if(response.status===1){
          this.registrationsuccess='Congratulations your now a job Giver';
          this.RecruiterRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/emp_login']);
            }, 3000);
        }else{
          this.regisfail='You are already a job Giver';
          console.log(this.regisfail);
         }
      },
      (error)=>{
          this.regisserver='Internal server error'; 
      }

    );
  }

  get form() { return this.RecruiterRegisterForm.controls; }

}
