import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'category', redirectTo: 'category/list'},
  {
    path: 'category',
    loadChildren: () => import('../app/components/category/category.module').then(m => m.CategoryModule),
  },
  {path: 'item', redirectTo: 'item/list'},
  {
    path: 'item',
    loadChildren: () => import('../app/components/item/item.module').then(m => m.ItemModule),
  },
  {path: '**', pathMatch: "full", redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
