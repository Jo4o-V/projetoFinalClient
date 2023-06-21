import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // dataBase
  private baseUrl: string = 'https://localhost:7012/api/User/'

  private baseUrlPartners: string = 'https://localhost:7012/api/Partner/'
  private baseUrlSuppliers: string = 'https://localhost:7012/api/Supplier/'
  private baseUrlCustomers: string = 'https://localhost:7012/api/Customer/'
  private baseUrlLocations: string = 'https://localhost:7012/api/Location/'
  private baseUrlCountry: string = 'https://localhost:7012/api/Country/'
  private baseUrlState: string = 'https://localhost:7012/api/State/'
  private baseUrlCity: string = 'https://localhost:7012/api/City/'

  // Rents
  private baseUrlgetRent: string = 'https://localhost:7012/api/Rent/'
  private baseUrlExpeditions: string = 'https://localhost:7012/api/Expeditions/'
  private baseUrlReturns: string = 'https://localhost:7012/api/Returns/'

  // Products
  private baseUrlCategory: string = 'https://localhost:7012/api/Category/'
  private baseUrlStock: string = 'https://localhost:7012/api/Product/'


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  getPartners() {
    return this.http.get<any>(this.baseUrlPartners);
  }

  getSuppliers() {
    return this.http.get<any>(this.baseUrlSuppliers);
  }

  getCustomers() {
    return this.http.get<any>(this.baseUrlCustomers);
  }

  getLocations() {
    return this.http.get<any>(this.baseUrlLocations);
  }

  getCountry() {
    return this.http.get<any>(this.baseUrlCountry);
  }
  getCountryId(id: string) {
    return this.http.get<any>(this.baseUrlCountry + id)
  }

  getState() {
    return this.http.get<any>(this.baseUrlState);
  }

  getCity() {
    return this.http.get<any>(this.baseUrlCity);
  }

  getRent() {
    return this.http.get<any>(this.baseUrlgetRent);
  }

  getExpeditions() {
    return this.http.get<any>(this.baseUrlExpeditions);
  }

  getReturns() {
    return this.http.get<any>(this.baseUrlReturns);
  }

  getCategory() {
    return this.http.get<any>(this.baseUrlCategory);
  }

  getStock() {
    return this.http.get<any>(this.baseUrlStock);
  }
}
