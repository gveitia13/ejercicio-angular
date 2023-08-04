import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemComponent} from "./item.component";
import {FormItemComponent} from "./components/form-item/form-item.component";

const routes: Routes = [
  {path: 'list', component: ItemComponent},
  {path: 'add', component: FormItemComponent},
  {path: 'edit/:id', component: FormItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
