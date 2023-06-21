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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productsForm: FormGroup;
  bsModalRef?: BsModalRef;

  public stocks: any = [];
  public categories: any = [];

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]),
      type: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      range: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      size: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      value: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
      status: new FormControl('', [Validators.required]),
      waistMeasure: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
      barMeasure: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
      dateCad: new FormControl('', [dateValidator]),
    });

    this.api.getCategory()
      .subscribe(res=>{
      this.stocks = res;
    });
  }

  

  validateControl = (controlName: string) => {
    if(this.productsForm.get(controlName).invalid && this.productsForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.productsForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createProduct() {
    if(this.productsForm.valid) {
      this.auth.AddProduct(this.productsForm.value)
      .subscribe({
        next:(res=>{
          this.productsForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Produto Cadastrado!", duration: 8000});
          this.router.navigate(['products/stock']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })

    } else{
      ValidateForm.validateAllFormFields(this.productsForm)
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