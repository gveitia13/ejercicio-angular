import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import {ItemRoutingModule} from "./item-routing.module";
import { FormItemComponent } from './components/form-item/form-item.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    ItemComponent,
    FormItemComponent
  ],
    imports: [
        CommonModule,
        ItemRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatPaginatorModule,
    ],
  exports:[
    ItemComponent
  ]
})
export class ItemModule { }
