import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {CategoryRoutingModule} from "./category-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MaterialModule} from "../../shared/material/material.module";
import {FormCategoryComponent} from './components/form-category/form-category.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CustomDialogModule} from "../../shared/custom-dialog/custom-dialog.module";


@NgModule({
  declarations: [
    CategoryComponent,
    FormCategoryComponent
  ],
  exports: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    CategoryRoutingModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ReactiveFormsModule,
    CustomDialogModule,
  ]
})
export class CategoryModule {

  constructor() {
  }


}
