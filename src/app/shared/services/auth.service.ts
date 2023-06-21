import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7012/api/User/"
  
  private baseUrlRent: string = "https://localhost:7012/api/Rent/"
  
  private baseUrlProduct: string = "https://localhost:7012/api/Product/"
  private baseUrlCategory: string = "https://localhost:7012/api/Category/"
  
  private baseUrlPartner: string = "https://localhost:7012/api/Partner/"
  private baseUrlSupplier: string = "https://localhost:7012/api/Supplier/"

  private baseUrlLocation: string = "https://localhost:7012/api/Location/"
  private baseUrlCustomer: string = "https://localhost:7012/api/Customer/"
  
  private baseUrlCountry: string = "https://localhost:7012/api/Country/"
  private baseUrlState: string = "https://localhost:7012/api/State/"
  private baseUrlCity: string = "https://localhost:7012/api/City/"

  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  AddRent(userObj: any) {
    return this.http.post<any>(`${this.baseUrlRent}`, userObj)
  }
  DeleteRent(id: number) {
    return this.http.delete<any>(`${this.baseUrlRent}` + id)
  }
  UpdateRent(userObj: any, id: number) {
    return this.http.put<any>(`${this.baseUrlRent}` + id, userObj)
  }

  AddProduct(userObj: any) {
    return this.http.post<any>(`${this.baseUrlProduct}`, userObj)
  }
  DeleteProduct(id: number) {
    return this.http.delete<any>(`${this.baseUrlProduct}` + id)
  }
  UpdateProduct(userObj: any, id: number) {
    return this.http.put<any>(`${this.baseUrlProduct}` + id, userObj)
  }

  AddCategory(userObj: any) {
    return this.http.post<any>(`${this.baseUrlCategory}`, userObj)
  }
  DeleteCategory(id: number) {
    return this.http.delete<any>(`${this.baseUrlCategory}` + id)
  }
  UpdateCategory(userObj: any, id: number) {
    return this.http.put<any>(`${this.baseUrlCategory}` + id, userObj)
  }

  AddCustomer(userObj: any) {
    return this.http.post<any>(`${this.baseUrlCustomer}`, userObj)
  }
  DeleteCustomer(id: number) {
    return this.http.delete<any>(`${this.baseUrlCustomer}` + id)
  }
  UpdateCustomer(userObj: any, id: number) {
    return this.http.put<any>(`${this.baseUrlCustomer}` + id, userObj)
  }

  AddLocation(userObj: any) {
    return this.http.post<any>(`${this.baseUrlLocation}`, userObj)
  }

  AddPartner(userObj: any) {
    return this.http.post<any>(`${this.baseUrlPartner}`, userObj)
  }

  AddSupplier(userObj: any) {
    return this.http.post<any>(`${this.baseUrlSupplier}`, userObj)
  }

  AddCountry(userObj: any) {
    return this.http.post<any>(`${this.baseUrlCountry}`, userObj)
  }
  DeleteCountry(id: number) {
    return this.http.delete<any>(`${this.baseUrlCountry}` + id)
  }
  UpdateCountry(userObj: any, id: number) {
    return this.http.put<any>(`${this.baseUrlCountry}` + id, userObj)
  }

  AddState(userObj: any) {
    return this.http.post<any>(`${this.baseUrlState}`, userObj)
  }

  AddCity(userObj: any) {
    return this.http.post<any>(`${this.baseUrlCity}`, userObj)
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  Register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  signIn(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj)
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken() {
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken() {
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }
}
