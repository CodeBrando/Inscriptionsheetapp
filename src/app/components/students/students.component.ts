import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Career } from 'src/app/career';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';
import { UiService } from 'src/app/services/ui.service';
import {Student} from '../../student'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Output() updateClick = new EventEmitter;
  @Output() onAddStudent: EventEmitter<Student> = new EventEmitter;
  students!: Student[]
  faTimes = faTimes;
  faPencil = faPencilAlt;
  subscription!: Subscription;
  name!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  studentCode!: string;
  studentStatus!: string;
  career!: Career;
  selectedCareerForUpdate!: boolean;
  showCareersForUpdate!: boolean;
  careers!: Career[];
  showUpdateForm!: boolean;
  

  constructor(private studentService: StudentService, private careerService: CareerService, private uiService: UiService) {
    this.subscription = this.uiService.onToggleForUpdate().subscribe((value) => (this.showCareersForUpdate = value));
    this.subscription = this.uiService.onSelectedCareerToggleForUpdate().subscribe((value) => (this.selectedCareerForUpdate = value));
    this.subscription = this.uiService.onToggleUpdateForm().subscribe((value) => (this.showUpdateForm = value));
   }

  ngOnInit(): void {
    this.getStudents();
    this.getCareers();
  }

  public getStudents(): void{
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response.reverse();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onClickDelete(student: Student){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
        this.uiService.toggleLastEnrolled();
        this.studentService.deleteStudent(student).subscribe();
        
      }
    })
    
  }

  onSubmitUpdate(student: Student){
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

    const updatedStudent = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      studentStatus: this.studentStatus,
      studentCode: student.studentCode,
      career: this.career
    }
    this.studentService.updateStudent(updatedStudent).subscribe();
    this.uiService.toggleLastEnrolled();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Student has been successfully updated!',
      showConfirmButton: false,
      timer: 1500
    })

    this.name = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
    this.career;
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
  onClickUpdate(){
    this.uiService.toggleShowUpdateForm();
  }

  onClickForUpdate(career: Career){
    this.career = career;
    this.uiService.toggleSelectedCareerForUpdate();
    this.uiService.toggleCareersForUpdate();
  }

  onClickClearCareerForUpdate(){
    this.career;
    this.uiService.toggleSelectedCareerForUpdate();
  }

  toggleShowCareersForUpdate(){
    this.uiService.toggleCareersForUpdate();
  }

}
