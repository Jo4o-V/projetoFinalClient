import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.css']
})
export class SuppliersCreateComponent implements OnInit {
  supplierForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      cnpj: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      contact: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern("(\\(?\\d{2}\\)?\\s?)?(9?\\d{4}\\-?\\d{4})")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      supply: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  }

  validateControl = (controlName: string) => {
    if(this.supplierForm.get(controlName).invalid && this.supplierForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.supplierForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createSupplier() {
    if(this.supplierForm.valid) {
      this.auth.AddSupplier(this.supplierForm.value)
      .subscribe({
        next:(res=>{
          this.supplierForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Fornecedor Cadastrado!", duration: 8000});
          this.router.navigate(['database/external/suppliers']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })
    } else{
      ValidateForm.validateAllFormFields(this.supplierForm)
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