import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { ClientComponent } from './views/client/client.component';
import { ContactComponent } from './views/contact/contact.component';
import { StockComponent } from './views/stock/stock.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "/admin", component: AdminComponent},
  {path: "/clientId", component: ClientComponent},
  {path: "/contact", component: ContactComponent },
  {path: "/stock", component: StockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
