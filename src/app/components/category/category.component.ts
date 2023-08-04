import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private utilsService: UtilsService) {
  }

  loading = true
  columns = []

  ngOnInit(): void {
    this.utilsService.getCategories().subscribe({
      next: v => {
        console.log(v)
        this.columns = v.items
        this.loading = false
        console.log(this.columns)
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

}
