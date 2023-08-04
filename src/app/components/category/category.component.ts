import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Category} from "../../models/category";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CustomDialogComponent} from "../../shared/custom-dialog/custom-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private utilsService: UtilsService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  loading = true
  dataSource: MatTableDataSource<Category> = new MatTableDataSource()
  displayedColumns = ['id', 'name', 'description', 'options']
  categories_list: Category[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort) sort: MatSort | null = null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData() {
    this.loading = true
    this.utilsService.getCategories().subscribe({
      next: v => {
        console.log(v)
        this.categories_list = v.items.slice()
        // .map((e: Category) => new Category(e.id, e.name, e.description))
        console.log(this.categories_list)
        this.dataSource = new MatTableDataSource(this.categories_list)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
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

  deleteCategory(id: string) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '350px',
      data: {mensaje: 'Are you sure you want to delete the category?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.utilsService.deleteCategory(id).subscribe({
          next: (e: any) => {
            console.log(e)
            if (e.success) {
              this.loadData()
              this.snackBar.open('The Category has been successfully deleted!', '', {
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
