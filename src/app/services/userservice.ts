import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    active?: boolean;
  }): Observable<User[]> {
    let httpParams = new HttpParams();

    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.active !== undefined) httpParams = httpParams.set('active', params.active);

    return this.http
      .get<User[]>(this.apiUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(catchError(this.handleError));
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  toggleStatus(id: number): Observable<User> {
    return this.http
      .patch<User>(`${this.apiUrl}/${id}/toggle-status`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('User API Error:', error);

    let message = 'Erro inesperado';

    if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.status === 0) {
      message = 'Servidor indisponível';
    } else if (error.status === 404) {
      message = 'Usuário não encontrado';
    }

    return throwError(() => new Error(message));
  }
}
