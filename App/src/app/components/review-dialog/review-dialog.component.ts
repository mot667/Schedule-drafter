import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html'
})
export class ReviewDialogComponent implements OnInit {
    addReviewFormGroup: FormGroup;
    message: string = ""
    cancelButtonText = "Cancel"
    course;
    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<ReviewDialogComponent>,
      private _formBuilder: FormBuilder, 
      private tutorialService: TutorialService
      ) {
      this.dialogRef.updateSize('300vw','300vw')
    }
    

ngOnInit() {
    this.addReviewFormGroup = this._formBuilder.group({
        review: ['', Validators.required],
      });
    var className = JSON.parse(localStorage.getItem("reviewCourse"));
    this.message = className.className;
}


  onConfirmClick(){
      var courseInfo = JSON.parse(localStorage.getItem("reviewCourse"));
    console.log(this.addReviewFormGroup.value.review)
    this.tutorialService.postReview({review:this.addReviewFormGroup.value.review,className:courseInfo.className, course:courseInfo})
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
    this.dialogRef.close(true);
  }

}