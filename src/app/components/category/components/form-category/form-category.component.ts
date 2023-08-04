import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  myFrom: FormGroup
  idCategory: any
  loading = true
  action: string = 'Add';
  loadingForm = false;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
              public snackBar: MatSnackBar, private aRoute: ActivatedRoute,
              private router: Router) {
    this.myFrom = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
    this.idCategory = this.aRoute.snapshot.params['id']
  }

  saveCategory() {
    const formData = this.myFrom.value
    this.myFrom.disable()
    this.loadingForm = true
    if (!this.idCategory)
      this.categoryService.addCategory(formData).subscribe({
        next: (v: any) => {
          this.myFrom.enable()
          this.loadingForm = false
          if (v.success) {
            this.snackBar.open('The category has been created!', '', {
              duration: 3000
            })
            this.router.navigate(['/category'])
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
      this.categoryService.editCategory(formData, this.idCategory).subscribe({
        next: (v: any) => {
          console.log(v)
          this.myFrom.enable()
          this.loadingForm = false
          if (v.success) {
            this.snackBar.open('The category has been updated!', '', {
              duration: 3000
            })
            this.router.navigate(['/category'])
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
          console.log('complete')
        }
      })
  }

  ngOnInit(): void {
    if (this.idCategory !== undefined) {
      this.action = 'Edit'
      this.isEdit()
    } else
      this.loading = false
  }

  isEdit() {
    this.categoryService.getCategory(this.idCategory).subscribe({
      next: (v: any) => {
        this.loading = false
        this.myFrom.patchValue(v.data)
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        this.loading = false
      },
      complete: () => {
        console.log('complete')
        this.loading = false
      }
    })

  }
}
