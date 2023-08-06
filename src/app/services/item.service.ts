import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  url = environment.url

  getItems(page = 0): Observable<any> {
    return this.http.post(this.url + 'Item/Search', {
      "pageNo": page,
      "pageSize": 5,
      "filters": null
    })
  }

  addItem(formData: any) {
    return this.http.post(this.url + 'Item', formData)
  }

  editItem(formData: any, id: string) {
    return this.http.put(this.url + 'Item/' + id, formData)
  }

  deleteItem(id: string) {
    return this.http.post(this.url + 'Item/' + id + '/Remove', {})
  }

  getItem(id: string) {
    return this.http.post(this.url + 'Item/' + id, {})
  }
}
