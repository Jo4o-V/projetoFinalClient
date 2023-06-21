import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-place-city-create',
  templateUrl: './place-city-create.component.html',
  styleUrls: ['./place-city-create.component.css']
})
export class PlaceCityCreateComponent implements OnInit {
  cityForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  }

  validateControl = (controlName: string) => {
    if(this.cityForm.get(controlName).invalid && this.cityForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.cityForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createCity() {
    if(this.cityForm.valid) {
      this.auth.AddCity(this.cityForm.value)
      .subscribe({
        next:(res=>{
          this.cityForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Cidade Cadastrada!", duration: 8000});
          this.router.navigate(['database/places']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.cityForm)
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