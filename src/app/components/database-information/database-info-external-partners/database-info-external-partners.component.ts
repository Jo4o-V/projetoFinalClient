import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Partners } from 'src/app/_interfaces/application.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { ApplicationRepositoryService } from 'src/app/shared/services/application-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { PartnersCreateComponent } from './partners-create/partners-create.component';
import { UserStoreService } from 'src/app/shared/services/user-store.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-database-info-external-partners',
  templateUrl: './database-info-external-partners.component.html',
  styleUrls: ['./database-info-external-partners.component.css']
})
export class DatabaseInfoExternalPartnersComponent implements OnInit{
  public partners: any = [];
  public role: string;

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private api: ApiService, public dialog: MatDialog, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getPartners()
      .subscribe(res=>{
      this.partners = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  dialogCreate() {
    const dialogRef = this.dialog.open(PartnersCreateComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  decreasePage() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePage() {
    if(this.pageNumber < this.partners.length) {
      this.pageNumber += 5;
    }
  }
}
