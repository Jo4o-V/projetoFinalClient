import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {
  rentsForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.rentsForm = this.fb.group({
      rentCode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]),
      customerCode: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      prodCode1: new FormControl('', [Validators.required]),
      prodCode2: new FormControl(''),
      prodCode3: new FormControl(''),
      prodCode4: new FormControl(''),
      prodCode5: new FormControl(''),
      amount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
      dateEvent: new FormControl('', dateValidatorEvent),
      dateExped: new FormControl('', dateValidatorExped),
      dateReturn: new FormControl('', dateValidatorReturn),
      dateCad: new FormControl('', dateValidator)
    });
  }

  validateControl = (controlName: string) => {
    if(this.rentsForm.get(controlName).invalid && this.rentsForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.rentsForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createRent() {
    if(this.rentsForm.valid) {
      this.auth.AddRent(this.rentsForm.value)
      .subscribe({
        next:(res=>{
          this.toast.success({detail: "SUCESSO", summary:"Aluguel Cadastrado!", duration: 8000});
          this.router.navigate(['rents/contracts']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })

    } else{
      ValidateForm.validateAllFormFields(this.rentsForm)
    }
  }

  generateContract() {
    if(this.rentsForm.valid) {
        this.router.navigate(['rents/contract-document']);
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

export const dateValidatorEvent: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const controlDateCad = control.value as Date;
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  if(controlDateCad >= todayDate) {
    return null;
  }
  else{
    return {"invalidDate":true}
  }
}

export const dateValidatorExped: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const controlDateCad = control.value as Date;
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  if(controlDateCad >= todayDate) {
    return null;
  }
  else{
    return {"invalidDate":true}
  }
}

export const dateValidatorReturn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const controlDateCad = control.value as Date;
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  if(controlDateCad >= todayDate) {
    return null;
  }
  else{
    return {"invalidDate":true}
  }
}