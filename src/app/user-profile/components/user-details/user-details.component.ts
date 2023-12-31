import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent {
  app = initializeApp(environment.firebase);
  storage = getStorage(this.app);
  fileData: File;
  editingForm: boolean;
  @Input() user: User;
  @ViewChild('modal', { static: true }) modal: EditProfileModalComponent;
  modalContent: { heading: string, message: string; };
  imageUrl: string;
  userForm: any;
  modalOpen: boolean = false;

  constructor(private userService: UserService, private readonly toastService: ToastrService) { }

  onEdit(): void {
    this.modalOpen = true;
    this.modal.toggleModal();
  }

  onEditSaved(event): void {
    this.fileData = event.fileData;
    this.userForm = event.form;
    this.onSubmit();
  }

  async onSubmit() {
    if (this.fileData) {
      const storageRef = ref(this.storage, `users/${this.user.uid}/profileImg/${this.fileData.name}`);
      await uploadBytes(storageRef, this.fileData);
      await getDownloadURL(ref(this.storage, `users/${this.user.uid}/profileImg/${this.fileData.name}`)).then(url => {
        // this.imageUrl = url;
        this.userForm.value.photoUrl = url;
        this.updateUser();
      });
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    this.userService.updateUser(this.user.uid, this.userForm.value).subscribe(res => {
      location.reload();
      this.toastService.success("Your profile has been upload successfully");
    }, (error) => {
      this.toastService.error(`There has been an error updating your profile: ${error}`);
    });
    this.modal.toggleModal();
  }
}
