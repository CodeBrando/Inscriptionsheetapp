import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Career } from 'src/app/career';
import { CareerService } from 'src/app/services/career.service';
import { Student } from 'src/app/student';
import { UiService } from 'src/app/services/ui.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onAddStudent: EventEmitter<Student> = new EventEmitter;
  name!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  studentCode!: string;
  studentStatus!: string;
  careers!: Career[];
  showCareers!: boolean;
  subscription!: Subscription;
  career!: Career;
  selectedCareer!: boolean;
  faTimes = faTimes;

  constructor(private careerService: CareerService, private uiService: UiService, private studentService: StudentService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showCareers = value));
    this.subscription = this.uiService.onSelectedCareerToggle().subscribe((value) => (this.selectedCareer = value));
   }

  ngOnInit(): void {
    this.getCareers();
  }

  onSubmit(){
    if(!this.name){
      alert('Please add a name!');
      return;
    }

    if(!this.lastName){
      alert('Please add a last name!');
      return;
    }

    if(!this.email){
      alert('Please add an email!');
      return;
    }

    if(!this.phoneNumber){
      alert('Please add a phone number!');
      return;
    }
    
    if(!this.career){
      alert('Please select a career!');
      return;
    }

    const student = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      studentStatus: this.studentStatus,
      studentCode: this.studentCode,
      career: this.career
    }
    this.studentService.enrollStudent(student).subscribe();
    this.uiService.toggleLastEnrolled();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Student has been successfully enrolled!',
      showConfirmButton: false,
      timer: 1500
    })

    this.name = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
    this.career;
  }

  toggleShowCareers(){
    this.uiService.toggleCareers();
  }

  public getCareers(): void{
    this.careerService.getCareers().subscribe(
      (response: Career[]) => {
        this.careers = response;
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onClick(career: Career){
    this.career = career;
    this.uiService.toggleSelectedCareer();
    this.uiService.toggleCareers();
  }

  onClickClearCareer(){
    this.career;
    this.uiService.toggleSelectedCareer();
  }

}
