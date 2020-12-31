import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CovidTrackerService {
  private rootUrl: string = 'https://api.covidtracking.com/v1/states/current.json';
  
  constructor(private http: HttpClient) { }

  getStateWiseData(): Observable<object>{
    return this.http.get(this.rootUrl)
  }

}