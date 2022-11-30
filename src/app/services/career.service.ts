import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Career } from '../career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(`${this.apiServerUrl}/careers`);
  }

  public getCareerByCareerCode(career: Career): Observable<Career>{
    return this.http.get<Career>(`${this.apiServerUrl}/careers/${career.careerCode}`)
  }
}
