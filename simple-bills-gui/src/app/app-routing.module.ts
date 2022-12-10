import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./content/home/home.component";
import { TransactionsComponent } from "./content/transactions/transactions.component";
import { CategoryComponent } from "./content/category/category.component";
import { AssetsComponent } from "./content/assets/assets.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'assets', component: AssetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
