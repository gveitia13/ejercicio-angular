import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) {
  }

  url = environment.url

  getCategories(): Observable<any> {
    return this.http.post(this.url + 'Category/Search', {
      "pageNo": 0,
      "pageSize": 100,
      "filters": null
    })
  }

  addCategory(formData: any) {
    return this.http.post(this.url + 'Category', formData)
  }

  editCategory(formData: any, id: string) {
    return this.http.put(this.url + 'Category/' + id, formData)
  }

  deleteCategory(formData: any, id: string) {
    return this.http.post(this.url + 'Category/' + id + '/Remove', formData)
  }

  getCategory(id: string) {
    return this.http.post(this.url + 'Category/' + id, {})
  }
}
