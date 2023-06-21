import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';

@Component({
  selector: 'app-rent-contract',
  templateUrl: './rent-contract.component.html',
  styleUrls: ['./rent-contract.component.css']
})
export class RentContractComponent implements OnInit {
  public rents: any = [];
  public role: string;

  currentPg: number = 1;
  pageNumber: number = 5;
  orderHeader: string = "";

  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
      this.api.getRent()
      .subscribe(res=>{
      this.rents = res;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  };

  decreasePage() {
    if(this.pageNumber > 5) {
      this.pageNumber -= 5;
    }
  }

  increasePage() {
    if(this.pageNumber < this.rents.length) {
      this.pageNumber += 5;
    }
  }
}
