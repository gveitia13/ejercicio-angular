import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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
  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  loading = true
  dataSource: MatTableDataSource<Category> = new MatTableDataSource()
  displayedColumns = ['id', 'name', 'description', 'options']
  categories_list: Category[] = []
  totalItems = 0

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData(page = 0) {
    this.loading = true
    this.categoryService.getCategories(page).subscribe({
      next: v => {
        console.log(v)
        this.categories_list = v.items.slice()
        this.totalItems = v.total
        console.log(this.categories_list)
        this.dataSource = new MatTableDataSource(this.categories_list)
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
        this.categoryService.deleteCategory(id).subscribe({
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

  pageIndex = 0

  handlePageEvent(e: PageEvent) {
    console.log(e.pageIndex);
    this.loadData(e.pageIndex)
    this.pageIndex = e.pageIndex
  }
}
