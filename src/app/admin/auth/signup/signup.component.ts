import { Admin } from './../../admin.model';
import { OnInit, Component } from "@angular/core";
import { AdminAuthService } from "../admin-auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
	  private adminAuth: AdminAuthService,
	  private router: Router,
	  private route: ActivatedRoute
	) { }
	
  isSubmitted = false;
  passwordNotMatch = false;
  emailExist = false;
  userExist = false;

  signupForm: FormGroup;

  ngOnInit() {
	  this.signupForm = new FormGroup({
		'name': new FormControl(null, Validators.required),
		'username': new FormControl(null, Validators.required),
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'password': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
		'repassword': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
	  });
  }
  

  onSubmit() {
	  if (this.signupForm.valid) {
		const admin = new Admin(
			this.signupForm.value.name,
			this.signupForm.value.email,
			this.signupForm.value.username,
			this.signupForm.value.password
		  );
  
		if (this.signupForm.value.password === this.signupForm.value.repassword) {
			
			if (this.adminAuth.ifEmailExist(this.signupForm.value.email) === false) {
			  if (this.adminAuth.ifUserExist(this.signupForm.value.username) === false) {
				this.adminAuth.createAdmin(admin);
				this.signupForm.reset();
				this.passwordNotMatch = false;
				this.emailExist = false;
				this.isSubmitted = false;
				this.router.navigate(['../home'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			  } else {
				this.signupForm.reset();
				this.userExist = true;
			  }
			}
			else{
				this.signupForm.reset();
				this.emailExist = true;
			}
		}
		else{
		  this.signupForm.reset();
		  this.passwordNotMatch = true;
		}
	  }
  }

  submitted() {
	  this.isSubmitted = true;
  }
}
