import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocationsCreateComponent } from './locations-create/locations-create.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';

@Component({
  selector: 'app-database-info-internal-locations',
  templateUrl: './database-info-internal-locations.component.html',
  styleUrls: ['./database-info-internal-locations.component.css']
})
export class DatabaseInfoInternalLocationsComponent implements OnInit {
  public locations: any = [];
  public role: string;

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private api: ApiService, public dialog: MatDialog, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getLocations()
      .subscribe(res=>{
      this.locations = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  dialogCreate() {
    const dialogRef = this.dialog.open(LocationsCreateComponent, {
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
    if(this.pageNumber < this.locations.length) {
      this.pageNumber += 5;
    }
  }
}
