import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {Category} from "../../models/category";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private utilsService: UtilsService,) {
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

  ngOnInit(): void {
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
        alert('hay error en el server :' + e)
        console.log(e)
      },
      complete: () => {
        this.loading = false
        console.log('complete')
      }
    })
  }

  deleteCategory(id: string) {

  }
}
