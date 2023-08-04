import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDialogComponent } from './custom-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule
  ]
})
export class CustomDialogModule { }
