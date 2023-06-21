import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-locations-create',
  templateUrl: './locations-create.component.html',
  styleUrls: ['./locations-create.component.css']
})
export class LocationsCreateComponent implements OnInit {
  stockForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      contact: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern("(\\(?\\d{2}\\)?\\s?)?(9?\\d{4}\\-?\\d{4})")]),
      email: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      stockType: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      qtdTotal: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  }

  validateControl = (controlName: string) => {
    if(this.stockForm.get(controlName).invalid && this.stockForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.stockForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createStock() {
    if(this.stockForm.valid) {
      this.auth.AddLocation(this.stockForm.value)
      .subscribe({
        next:(res=>{
          this.stockForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Estoque Cadastrado!", duration: 8000});
          this.router.navigate(['database/internal/locations']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.stockForm)
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