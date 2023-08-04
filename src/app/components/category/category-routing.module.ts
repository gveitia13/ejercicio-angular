import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from "./category.component";
import {FormCategoryComponent} from "./components/form-category/form-category.component";

const routes: Routes = [
  {path: 'list', component: CategoryComponent},
  {path: 'add', component: FormCategoryComponent},
  {path: 'edit/:id', component: FormCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
