import { Injectable } from '@angular/core';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showCareers: boolean = false;
  private showCareersForUpdate: boolean = false;
  private selectedCareer: boolean = false;
  private selectedCareerForUpdate: boolean = false;
  private showLastEnrolled: boolean = false;
  private showLastEnrolledForUpdate: boolean = false
  private showUpdateForm: boolean = false;
  private subject = new Subject<any>();
  private secondSubject = new Subject<any>();
  private thirdSubject = new Subject<any>();
  private fourthSubject = new Subject<any>();
  private fifthSubject = new Subject<any>();
  private sixthSubject = new Subject<any>();
  private seventhSubject = new Subject<any>();


  constructor() { }

  toggleCareers(): void {
    this.showCareers = !this.showCareers;
    this.subject.next(this.showCareers);
  }

  toggleSelectedCareer(): void{
    this.selectedCareer = !this.selectedCareer;
    this.secondSubject.next(this.selectedCareer);
  }

  toggleLastEnrolled(): void{
    this.showLastEnrolled = !this.showLastEnrolled;
    this.thirdSubject.next(this.showLastEnrolled);
  }

  toggleShowUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
    this.fourthSubject.next(this.showUpdateForm);
  }

  onToggle(): Observable<any>{
    return this.subject.asObservable();
  }

  onSelectedCareerToggle(): Observable<any>{
    return this.secondSubject.asObservable();
  }

  onToggleLastEnrolled(): Observable<any>{
    return this.thirdSubject.asObservable();
  }

  onToggleUpdateForm(): Observable<any>{
    return this.fourthSubject.asObservable();
  }




  toggleCareersForUpdate(): void {
    this.showCareersForUpdate = !this.showCareersForUpdate;
    this.fifthSubject.next(this.showCareersForUpdate);
  }

  toggleSelectedCareerForUpdate(): void{
    this.selectedCareerForUpdate = !this.selectedCareerForUpdate;
    this.sixthSubject.next(this.selectedCareerForUpdate);
  }

  toggleLastEnrolledForUpdate(): void{
    this.showLastEnrolledForUpdate = !this.showLastEnrolledForUpdate;
    this.seventhSubject.next(this.showLastEnrolledForUpdate);
  }


  onToggleForUpdate(){
    return this.fifthSubject.asObservable();
  }

  onSelectedCareerToggleForUpdate(): Observable<any>{
    return this.sixthSubject.asObservable();
  }

  onToggleLastEnrolledForUpdate(): Observable<any>{
    return this.seventhSubject.asObservable();
  }

  
}
