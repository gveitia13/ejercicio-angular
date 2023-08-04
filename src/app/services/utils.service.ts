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
      "pageSize": 1,
      "filters": null
    })
  }
}
