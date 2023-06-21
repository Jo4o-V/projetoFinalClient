import { Injectable } from '@angular/core';

import { City, Countryy, Partners, State, Suppliers } from 'src/app/_interfaces/application.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountryForCreation } from 'src/app/_interfaces/placesForCreation.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  // Country
  public getCountry = (route: string) => {
    return this.http.get<Countryy[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createCountry = (route: string, countries: CountryForCreation) => {
    return this.http.post<Countryy>(this.createCompleteRoute(route, this.envUrl.urlAddress), countries, this.generateHeaders());
  }
  public updateCountry = (route: string, countries: Countryy) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), countries, this.generateHeaders());
  }
  public deleteCountry = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  // State
  public getState = (route: string) => {
    return this.http.get<State[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createState = (route: string, states: State) => {
    return this.http.post<State>(this.createCompleteRoute(route, this.envUrl.urlAddress), states, this.generateHeaders());
  }
  public updateState = (route: string, states: State) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), states, this.generateHeaders());
  }
  public deleteState = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  // City
  public getCity = (route: string) => {
    return this.http.get<City[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createCity = (route: string, cities: City) => {
    return this.http.post<City>(this.createCompleteRoute(route, this.envUrl.urlAddress), cities, this.generateHeaders());
  }
  public updateCity = (route: string, cities: City) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), cities, this.generateHeaders());
  }
  public deleteCity = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  // Suppliers
  public getSuppliers = (route: string) => {
    return this.http.get<Suppliers[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createSuppliers = (route: string, suppliers: Suppliers) => {
    return this.http.post<Suppliers>(this.createCompleteRoute(route, this.envUrl.urlAddress), suppliers, this.generateHeaders());
  }
  public updateSuppliers = (route: string, suppliers: Suppliers) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), suppliers, this.generateHeaders());
  }
  public deleteSuppliers = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  // Partners
  public getPartners = (route: string) => {
    return this.http.get<Partners[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createPartners = (route: string, partners: Partners) => {
    return this.http.post<Partners>(this.createCompleteRoute(route, this.envUrl.urlAddress), partners, this.generateHeaders());
  }
  public updatePartners = (route: string, partners: Partners) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), partners, this.generateHeaders());
  }
  public deletePartners = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
