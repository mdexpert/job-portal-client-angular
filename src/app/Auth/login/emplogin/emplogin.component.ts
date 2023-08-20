import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder ,ValidationErrors } from '@angular/forms';
import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrls: ['./emplogin.component.css']
})
export class EmploginComponent implements OnInit {
  loginsuccess: any;
  loginfail: any;
  loginForm: FormGroup;
  constructor(private router: Router, private empservice: ForseekerService,private fb:FormBuilder) { }  
  submitted =false;


  ngOnInit() {
    this.loginForm =  this.fb.group({
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]], 
      password: [null,Validators.required]
    });
  }
  moveToRegister() {
    this.router.navigate(['register/emp_register']);
  }
  login() { 
    this.submitted = true;

    if (!this.loginForm.valid) {
      this.getFormValidationErrors();
       return;
    }
     
    this.empservice.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        (response: any) => { 
          if (response.status && response.status === 1) {
            this.loginsuccess = "Login Success-Going to Dashboard";
            localStorage.setItem('token',response.data.token);
            let payload=this.empservice.getpayload();
              
            this.loginForm.reset();this.submitted = false;  // false because form is being reset
            
            setTimeout(() => {
                       
             
              if(response.isEmployee){
                localStorage.setItem('currentemployeeid',payload.id);    
                localStorage.setItem('currentemployee',payload.email);
                this.router.navigate(['dashboard/jobs']);
              }else{
                localStorage.setItem('id',payload.id);    
                localStorage.setItem('currentrecruiter',payload.email);
                this.router.navigate(["rdashboard/postedjobs"]);
              }
              
            }, 2000);
          }
          else {
            this.loginfail = "Invalid Username/Password";
            this.loginsuccess=false; 
          }
        },
        (error) => { console.log(error); }
      );
  }
  get form(){
    return this.loginForm.controls;
  }
  // clearForm(){
  //   (<HTMLFormElement>document.getElementById("loginform")).reset();
  //  }

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }


}
