
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  fetchEmployee() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      // 'X-CSCAPIKey': 'mmmg1O2gmneucRDoNJQdfon7jU6HdSGN3IGNIK7o'
     })
  }

  getEmployee(): Observable<any> {
    return this.httpClient.get<any[]>(
      `http://localhost:3000/users/`,
      { headers: this.httpOptions.headers });
  
}
postEmployee(): Observable<any> {
  return this.httpClient.post<any[]>(
    `http://localhost:3000/users/`,
    {});
}

updateEmployee(id: string, value: any): Observable<any> {
  return this.httpClient.put<any[]>(
    `http://localhost:3000/users/`+id, value);
}

deleteEmployee(id: string): Observable<any> {
  return this.httpClient.delete(
    `http://localhost:3000/users/`+id)
}

}

