import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../../../services/item.service";
import {Category} from "../../../../models/category";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {
  myFrom: FormGroup
  idItem: any
  loading = true
  action: string = 'Add';
  loadingForm = false;
  categories_list: Category[] = []

  constructor(private fb: FormBuilder, private itemService: ItemService,
              public snackBar: MatSnackBar, private aRoute: ActivatedRoute,
              private router: Router, private categoryService: CategoryService) {
    this.myFrom = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', Validators.required],
      categoryId: ['', Validators.required],
    })
    this.idItem = this.aRoute.snapshot.params['id']
  }

  saveItem() {
    const formData = this.myFrom.value
    this.myFrom.disable()
    this.loadingForm = true
    console.log(formData)
    if (!this.idItem)
      this.itemService.addItem(formData).subscribe({
        next: (v: any) => {
          this.myFrom.enable()
          this.loadingForm = false
          if (v.success) {
            this.snackBar.open('The item has been created!', '', {
              duration: 3000
            })
            this.router.navigate(['/item'])
          } else {
            this.snackBar.open(v.message, '', {
              duration: 5000,
            })
          }
        },
        error: (e) => {
          this.snackBar.open(e.message, '', {
            duration: 5000,
          })
          this.myFrom.enable()
          this.loadingForm = false
        },
        complete: () => {
        }
      })
    else
      this.itemService.editItem(formData, this.idItem).subscribe({
        next: (v: any) => {
          console.log(v)
          this.myFrom.enable()
          this.loadingForm = false
          if (v.success) {
            this.snackBar.open('The item has been updated!', '', {
              duration: 3000
            })
            this.router.navigate(['/item'])
          } else {
            this.snackBar.open(v.message, '', {
              duration: 5000,
            })
          }
        },
        error: (e) => {
          this.snackBar.open(e.message, '', {
            duration: 5000,
          })
          this.myFrom.enable()
          this.loadingForm = false
        },
        complete: () => {
        }
      })
  }

  isEdit() {
    this.itemService.getItem(this.idItem).subscribe({
      next: (v: any) => {
        this.myFrom.patchValue(v.data)
        const categoryName = v.data.category

        this.categoryService.getCategories().subscribe({
          next: v => {
            this.categories_list = v.items.slice()
            console.log(this.categories_list)
            const itemCategory = this.categories_list.find(c => c.name == categoryName)
            this.myFrom.patchValue({categoryId: itemCategory?.id})
            this.loading = false
          },
          error: e => {
            this.loading = false
            alert(e.message)
          },
          complete: () => {
            this.loading = false
          }
        })

      },
      error: (e) => {
        console.log(e)
        this.loading = false
      },
      complete: () => {
      }
    })

  }


  ngOnInit(): void {

    if (this.idItem !== undefined) {
      this.action = 'Edit'
      this.isEdit()
    } else {
      this.categoryService.getCategories().subscribe({
        next: v => {
          console.log(v)
          this.categories_list = v.items.slice()
          console.log(this.categories_list)
          this.loading = false
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
  }


}
