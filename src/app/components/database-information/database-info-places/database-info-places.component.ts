import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { City, Countryy, State } from 'src/app/_interfaces/application.model';
import { ApplicationRepositoryService } from 'src/app/shared/services/application-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { PlaceCountryCreateComponent, dateValidator } from './place-country-create/place-country-create.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';
import { PlaceStateCreateComponent } from './place-state-create/place-state-create.component';
import { PlaceCityCreateComponent } from './place-city-create/place-city-create.component';
import { PlaceCountryUpdateComponent } from './place-country-update/place-country-update.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/_interfaces/country.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-database-info-places',
  templateUrl: './database-info-places.component.html',
  styleUrls: ['./database-info-places.component.css']
})
export class DatabaseInfoPlacesComponent implements OnInit{
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public role: string;
  countryForm: FormGroup;
  countryObj: Country = new Country();
  currentPgCountry: number = 1;
  currentPgState: number = 1;
  currentPgCity: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private toast: NgToastService, private router: Router, private fb: FormBuilder, private api: ApiService, public dialog: MatDialog, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getCountry()
      .subscribe(res=>{
      this.countries = res;
      });

      this.api.getState()
      .subscribe(res=>{
      this.states = res;
      });

      this.api.getCity()
      .subscribe(res=>{
      this.cities = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.countryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      acronym: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      continent: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), 
      dateCad: new FormControl('', dateValidator),
    });
  };

  dialogCreateCountry() {
    const dialogRef = this.dialog.open(PlaceCountryCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  dialogEditCountry(country: any) {
    const dialogRef = this.dialog.open(PlaceCountryUpdateComponent, {
      width: '65%'
    });
      this.countryObj.Id = country.Id;
      this.countryForm.controls['name'].setValue(country.name);
      this.countryForm.controls['dateCad'].setValue(country.dateCad);
      this.countryForm.controls['acronym'].setValue(country.Acronym);
      this.countryForm.controls['continent'].setValue(country.Continent);
      this.countryForm.controls['status'].setValue(country.Status);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
      
  }

  dialogCreateState() {
    const dialogRef = this.dialog.open(PlaceStateCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  dialogCreateCity() {
    const dialogRef = this.dialog.open(PlaceCityCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteCountryDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.auth.DeleteCountry(row.id)
     .subscribe({
      next:(res=>{
        this.toast.success({detail: "SUCESSO", summary:"País Deletado!", duration: 8000});
        this.router.navigate(['database/places']);
      }),
      error:(err=>{
        this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
      })
     }
     )}
  }

  decreasePageCountry() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePageCountry() {
    if(this.pageNumber < this.countries.length) {
      this.pageNumber += 5;
    }
  }

  decreasePageState() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePageState() {
    if(this.pageNumber < this.states.length) {
      this.pageNumber += 5;
    }
  }

  decreasePageCity() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePageCity() {
    if(this.pageNumber < this.cities.length) {
      this.pageNumber += 5;
    }
  }
}