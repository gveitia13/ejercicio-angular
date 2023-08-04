import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {CategoryRoutingModule} from "./category-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    CategoryComponent
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
  ]
})
export class CategoryModule {

  constructor() {
  }


}
