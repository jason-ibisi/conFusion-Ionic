import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Response>(baseURL + 'leaders')
      .map(res => { return this.processHttpmsgService.extractData(res) })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Response>(baseURL + 'leader/' + id)
      .map(res => { return this.processHttpmsgService.extractData(res) })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Response>(baseURL + 'leaders?featured=true')
      .map(res => { return this.processHttpmsgService.extractData(res)[0] })
      .catch(error => { return this.processHttpmsgService.handleError(error) });
  }

}
