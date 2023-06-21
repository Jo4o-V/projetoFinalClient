import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  bsModalRef?: BsModalRef;

  public countries: any = [];

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private auth: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      category: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      type: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator)
    });
  }

  validateControl = (controlName: string) => {
    if(this.categoryForm.get(controlName).invalid && this.categoryForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.categoryForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  getCountryDetails() {
    this.api.getCountry()
      .subscribe(res=>{
      this.countries = res.country;
    });
  }

  createCategory() {
    if(this.categoryForm.valid) {
      this.auth.AddCategory(this.categoryForm.value)
      .subscribe({
        next:(res=>{
          this.categoryForm.reset();
          let ref = document.getElementById('close');
          ref?.click();
          this.getCountryDetails();
          this.toast.success({detail: "SUCESSO", summary:"Categoria Cadastrada!", duration: 8000});
          this.router.navigate(['products/category']);
          // location.reload()
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })

    } else{
      ValidateForm.validateAllFormFields(this.categoryForm)
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