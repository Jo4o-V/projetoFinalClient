import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutHelpComponent } from './about-help/about-help.component';

const routes: Routes = [
  {
    path: 'help',
    component: AboutHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
