import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private apiUrl = 'https://localhost:5001/api/person';
  constructor(private http: HttpClient) {}
  addPerson(data: any): Observable<any> { return this.http.post(this.apiUrl, data); }
  getAll(): Observable<any[]> { return this.http.get<any[]>(this.apiUrl); }
}
