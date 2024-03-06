import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environment/environment";
import {httpJsonResponse} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + '/' + endPoint).pipe(
      catchError(this.handleError)
    );
  }
  post<T>(endPoint: string, data: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl + '/' + endPoint, data).pipe(
      catchError(this.handleError)
    );
  }
  put<T>(endPoint: string, data: any): Observable<T> {
    return this.http.put<T>(environment.apiUrl + '/' + endPoint, data).pipe(
      catchError(this.handleError)
    );
  }
  delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + '/' + endPoint).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.error && error.error['hydra:description']) {
      errorMessage = error.error['hydra:description'];
    }
    return throwError(errorMessage);
  }

   format_Response(json?: any): httpJsonResponse {
    return {
      count: json?.count || 0,
      page: json?.page || 0,
      message: json?.message || '',
      data: json?.data || [],
      error: json?.status || ''
    };
  }

}
