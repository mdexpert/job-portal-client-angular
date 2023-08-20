import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-empregister',
  templateUrl: './empregister.component.html',
  styleUrls: ['./empregister.component.css']
})
export class EmpregisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private seekerservice:ForseekerService) { }
  EmpRegisterForm:FormGroup;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  submitted =false;
  ngOnInit() {
    this.EmpRegisterForm=this.fb.group({

      email:['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required],
      mobile: [''],
      firstName: ['',Validators.required],
      lastName: [''],
      country: [''],
      state: [''],
      profession: [''], 
      skillList: [''],
      Industry: [''],
      referenceCOde: [''],
      inviteCode: ['']             
      });
  }
  registeremployee()
  {
    this.submitted = true;

    if (!this.EmpRegisterForm.valid) {       
       return;
    }
    
    //console.log(this.EmpRegisterForm.value);
    this.seekerservice.employee_register(JSON.stringify(this.EmpRegisterForm.value)).subscribe(
      (response:any)=>{
        if(response.status===1){
          this.registrationsuccess='Congratulations your now a job seeker';
          this.EmpRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/emp_login']);
            }, 3000);
        }else if(response.status===3){
          this.regisfail='Email already exists';
        }else{
          this.regisfail='You are already a job seeker';
          console.log(this.regisfail);
        }
      },
      (error)=>{
          this.regisserver='Internal server error'; 
      }

    );
  }


  get form() { return this.EmpRegisterForm.controls; }

}
