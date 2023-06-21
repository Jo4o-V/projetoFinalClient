import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-place-state-create',
  templateUrl: './place-state-create.component.html',
  styleUrls: ['./place-state-create.component.css']
})
export class PlaceStateCreateComponent implements OnInit {
  stateForm: FormGroup;
  bsModalRef?: BsModalRef;

  public countries: any = [];

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      acronym: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      country: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });

    this.api.getCountry()
      .subscribe(res=>{
      this.countries = res;
    });
  }

  validateControl = (controlName: string) => {
    if(this.stateForm.get(controlName).invalid && this.stateForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.stateForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createState() {
    if(this.stateForm.valid) {
      this.auth.AddState(this.stateForm.value)
      .subscribe({
        next:(res=>{
          this.stateForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Estado Cadastrado!", duration: 8000});
          this.router.navigate(['database/places']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.stateForm)
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