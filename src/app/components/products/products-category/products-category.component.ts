import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {
  public categories: any = [];
  public role: string;

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private toast: NgToastService, private router: Router, private api: ApiService, public dialog: MatDialog, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getCategory()
      .subscribe(res=>{
      this.categories = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  dialogCreate() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.auth.DeleteCategory(row.id)
     .subscribe({
      next:(res=>{
        this.toast.success({detail: "SUCESSO", summary:"Categoria Deletada!", duration: 8000});
        this.router.navigate(['products/category']);
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
    if(this.pageNumber < this.categories.length) {
      this.pageNumber += 5;
    }
  }
}
