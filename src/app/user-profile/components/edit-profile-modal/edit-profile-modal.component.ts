import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.less', '../../../../assets/styles/buttons.less']
})
export class EditProfileModalComponent implements OnInit {
  @Output() onConfirmed: EventEmitter<any> = new EventEmitter<any>();
  @Input() userDetails: any;
  isOpen: boolean = false;
  imageUrl: any;
  fileData: File;
  userForm = new FormGroup({
    photoUrl: new FormControl(),
    displayName: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.userForm = new FormGroup({
      photoUrl: new FormControl(this.userDetails.photoURL),
      displayName: new FormControl(this.userDetails.displayName),
      description: new FormControl(this.userDetails.description)
    });
    const url = this.userForm.get('photoUrl');
    if (url) {
      this.imageUrl = url.value;
    }
  }

  removeImage(): void {
    this.imageUrl = undefined;
    this.userForm.controls.photoUrl.setValue('');
  }

  onConfirm(): void {
    if (this.fileData) {
      this.onConfirmed.emit({ form: this.userForm, fileData: this.fileData });
    } else {
      this.onConfirmed.emit({ form: this.userForm });
    }
  }

  onFileSelected(event): void {
    this.fileData = <File>event.target.files[0];
  }

  toggleModal(): void {
    this.isOpen = !this.isOpen;
    this.setForm();
  }

}
