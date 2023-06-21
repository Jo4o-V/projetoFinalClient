import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customers-create',
  templateUrl: './customers-create.component.html',
  styleUrls: ['./customers-create.component.css']
})
export class CustomersCreateComponent implements OnInit {
  customerForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerCode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern("^[a-z0-9]")]), 
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      contact: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern("(\\(?\\d{2}\\)?\\s?)?(9?\\d{4}\\-?\\d{4})")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      address: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      city: new FormControl('', [Validators.required]),
      // state: new FormControl('', [Validators.required]),
      // country: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  }

  validateControl = (controlName: string) => {
    if(this.customerForm.get(controlName).invalid && this.customerForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.customerForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createCustomer() {
    if(this.customerForm.valid) {
      this.auth.AddCustomer(this.customerForm.value)
      .subscribe({
        next:(res=>{
          this.customerForm.reset();
          let ref = document.getElementById('close');
          ref?.click();
          this.toast.success({detail: "SUCESSO", summary:"Cliente Cadastrado!", duration: 8000});
          this.router.navigate(['database/internal/customers']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.customerForm)
    }
  }

  
}

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const controlDateCad = control.value as Date;
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  if(controlDateCad <= todayDate) {
    return null;
  }
  else{
    return {"invalidDate":true}
  }
}