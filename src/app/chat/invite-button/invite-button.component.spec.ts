import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteButtonComponent } from './invite-button.component';

describe('InviteButtonComponent', () => {
  let component: InviteButtonComponent;
  let fixture: ComponentFixture<InviteButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteButtonComponent]
    });
    fixture = TestBed.createComponent(InviteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
