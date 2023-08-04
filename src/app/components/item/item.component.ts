import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemService} from "../../services/item.service";
import {MatTableDataSource} from "@angular/material/table";
import {Category} from "../../models/category";
import {Item} from "../../models/item";
import {CustomDialogComponent} from "../../shared/custom-dialog/custom-dialog.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private itemService: ItemService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  loading = true
  dataSource: MatTableDataSource<Item> = new MatTableDataSource()
  displayedColumns = ['id', 'name', 'category', 'code', 'description', 'options']
  items_list: Item[] = []

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData() {
    this.loading = true
    this.itemService.getItems().subscribe({
      next: v => {
        console.log(v)
        this.items_list = v.items.slice()
        console.log(this.items_list)
        this.dataSource = new MatTableDataSource(this.items_list)
        this.loading = false
        console.log(this.dataSource)
      },
      error: e => {
        this.loading = false
        alert(e.message)
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  deleteItem(id: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '350px',
      data: {mensaje: 'Are you sure you want to delete the item?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.itemService.deleteItem(id).subscribe({
          next: (e: any) => {
            if (e.success) {
              this.loadData()
              this.snackBar.open('The Item has been successfully deleted!', '', {
                duration: 3000
              })
            } else
              this.snackBar.open(e.message, '', {
                duration: 5000
              })
          },
          error: e => {
            this.snackBar.open(e.message, '', {
              duration: 5000
            })
          }
        })
      }
    });
  }
}
