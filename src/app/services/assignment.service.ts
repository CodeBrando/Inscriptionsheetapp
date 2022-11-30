import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Assignment } from '../assignment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiServerUrl}/assignments`);
  }
}
