import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { CustomersCreateComponent } from './customers-create/customers-create.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database-info-internal-customers',
  templateUrl: './database-info-internal-customers.component.html',
  styleUrls: ['./database-info-internal-customers.component.css']
})
export class DatabaseInfoInternalCustomersComponent implements OnInit {
  public customers: any = [];
  public role: string;

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private router: Router, private toast: NgToastService, private api: ApiService, public dialog: MatDialog, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getCustomers()
      .subscribe(res=>{
      this.customers = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  dialogCreate() {
    const dialogRef = this.dialog.open(CustomersCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.auth.DeleteCustomer(row.id)
     .subscribe({
      next:(res=>{
        this.toast.success({detail: "SUCESSO", summary:"Cliente Deletado!", duration: 8000});
        this.router.navigate(['database/internal/customers']);
        location.reload();
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
    if(this.pageNumber < this.customers.length) {
      this.pageNumber += 5;
    }
  }
}
