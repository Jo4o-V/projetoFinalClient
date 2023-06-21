import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';

@Component({
  selector: 'app-products-stock',
  templateUrl: './products-stock.component.html',
  styleUrls: ['./products-stock.component.css']
})
export class ProductsStockComponent implements OnInit {
  public stocks: any = [];
  public role: string;
  public categories: any = [];

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private toast: NgToastService, private router: Router, private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getStock()
      .subscribe(res=>{
      this.stocks = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  deleteDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.auth.DeleteProduct(row.id)
     .subscribe({
      next:(res=>{
        this.toast.success({detail: "SUCESSO", summary:"Produto Deletado!", duration: 8000});
        this.router.navigate(['products/stock']);
      }),
      error:(err=>{
        this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
      })
     }
     )}
  }

  decreasePage() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePage() {
    if(this.pageNumber < this.stocks.length) {
      this.pageNumber += 5;
    }
  }
}
