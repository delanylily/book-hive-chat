import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FrameComponent } from "./frame.component";
import { HeaderComponent } from "../header/header.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FrameComponent, HeaderComponent],
  exports: [FrameComponent]
})

export class FrameModule { }
