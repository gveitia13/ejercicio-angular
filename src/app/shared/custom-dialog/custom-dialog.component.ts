import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {
  mensaje = ''
  btn = 'accept'

  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.mensaje = data.mensaje
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
