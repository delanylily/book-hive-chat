import { NgModule } from "@angular/core";
import { GenericModalComponent } from "./generic-modal.component";
import { CommonModule } from "@angular/common";
import { BookCardModule } from "../book-card/book-card.module";

@NgModule({
  imports: [CommonModule, BookCardModule],
  declarations: [
    GenericModalComponent
  ],
  exports: [GenericModalComponent],
})
export class GenericModalModule { }
