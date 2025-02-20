import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtractRequest } from '../model/extract-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtractRequestService {
  
  constructor(private http: HttpClient) { }

    getExtractRequests(): Observable<ExtractRequest[]> {
      var url: string = 'data/extractRequest.json'; 
      return this.http.get<ExtractRequest[]>(url);
    }
}
