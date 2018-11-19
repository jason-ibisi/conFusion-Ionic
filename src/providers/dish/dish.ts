import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Response>(baseURL + 'dishes', {responseType: 'json'})
      .map(res => { return this.processHttpmsgService.extractData(res) })
      .catch(error => { return this.processHttpmsgService.handleError(error)});
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Response>(baseURL + 'dishes/' + id, {responseType: 'json'})
      .map(res => { return this.processHttpmsgService.extractData(res) })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Response>(baseURL + 'dishes?featured=true', {responseType: 'json'})
      .map(res => { return this.processHttpmsgService.extractData(res)[0] })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
  }

}
