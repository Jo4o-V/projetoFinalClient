import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'

import { CountryForCreation } from 'src/app/_interfaces/placesForCreation.model';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { ApiService } from 'src/app/shared/services/api.service';
import { ApplicationRepositoryService } from 'src/app/shared/services/application-repository.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-place-country-create',
  templateUrl: './place-country-create.component.html',
  styleUrls: ['./place-country-create.component.css']
})
export class PlaceCountryCreateComponent implements OnInit {
  countryForm: FormGroup;
  bsModalRef?: BsModalRef;

  public countries: any = [];

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      acronym: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      continent: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  }

  validateControl = (controlName: string) => {
    if(this.countryForm.get(controlName).invalid && this.countryForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.countryForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  getCountryDetails() {
    this.api.getCountry()
      .subscribe(res=>{
      this.countries = res.country;
    });
  }

  createCountry() {
    if(this.countryForm.valid) {
      this.auth.AddCountry(this.countryForm.value)
      .subscribe({
        next:(res=>{
          this.countryForm.reset();
          let ref = document.getElementById('close');
          ref?.click();
          this.getCountryDetails();
          this.toast.success({detail: "SUCESSO", summary:"País Cadastrado!", duration: 8000});
          this.router.navigate(['database/places']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.countryForm)
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
