import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Call } from '../models/call';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  create(call: Call) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  findById(id:any):Observable<Call>{
    return this.http.get<Call>(`${API_CONFIG.baseUrl}/calls/${id}`);
  }

  findAll(): Observable<Call[]>{
    return this.http.get<Call[]>(`${API_CONFIG.baseUrl}/calls`);
  }

  
}