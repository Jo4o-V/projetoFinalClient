import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Country } from 'src/app/_interfaces/country.model';
import { CountryForUpdate } from 'src/app/_interfaces/countryForUpdate.model';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-place-country-update',
  templateUrl: './place-country-update.component.html',
  styleUrls: ['./place-country-update.component.css']
})
export class PlaceCountryUpdateComponent implements OnInit {
  countryForm: FormGroup;
  bsModalRef?: BsModalRef;
  countryObj: Country = new Country(); 
  country: Country;

  public countries: any = [];

  constructor(private activeRoute: ActivatedRoute, private api: ApiService, private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      acronym: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      continent: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });

    // this.getCountryById();
  }

  // getCountryById(countries: any) {
  //   this.countryObj.Id = countries.Id;
  //     this.countryForm.controls['name'].setValue(countries.name);
  //     this.countryForm.controls['dateCad'].setValue(countries.dateCad);
  //     this.countryForm.controls['acronym'].setValue(countries.Acronym);
  //     this.countryForm.controls['continent'].setValue(countries.Continent);
  //     this.countryForm.controls['status'].setValue(countries.Status);
  //   const countryId: string = this.activeRoute.snapshot.params['Id'];
  //   const countryByIdUri: string = `Country/${countryId}`;
  //   this.api.getCountryId(countryByIdUri)
  //   .subscribe({
  //     next: (collab: Country) => {
  //       this.country = { ...collab, 
  //         dateCad: new Date(this.datePipe.transform(collab.dateCad, 'MM/dd/yyyy'))
  //       };
  //       this.countryForm.patchValue(this.country);
  //     }, 
  //     error:(err=>{
  //       this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
  //     })
  //   })
  // }

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

  // public updateCountry = (countryFormValue) => {
  //   if(this.countryForm.valid)
  //     this.executeCountryUpdate(countryFormValue)
  // }

  // private executeCountryUpdate = (countryFormValue) => {
  //   const collaboratorForUpd: CountryForUpdate = {
  //     Name: countryFormValue.name,
  //     dateCad: this.datePipe.transform(countryFormValue.dateCad, 'yyyy-MM-dd'),
  //     Acronym: countryFormValue.acronym,
  //     Continent: countryFormValue.continent,
  //     Status: countryFormValue.status
  //   }

  //   const apiUri: string = `Country/${this.countries.id}`;
  updateCountry() {
    if(this.countryForm.valid) {
      this.auth.UpdateCountry(this.countryForm.value, this.countries.Id)
      .subscribe({
        next:(res=>{
          this.countryForm.reset();
          let ref = document.getElementById('close');
          ref?.click();
          this.getCountryDetails();
          this.toast.success({detail: "SUCESSO", summary:"País Atualizado!", duration: 8000});
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

  getCountryDetails() {
    this.api.getCountry()
      .subscribe(res=>{
      this.countries = res.country;
    });
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
