import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  imports: [],
})
export class SubmitButtonComponent {
  @Input() isDisabled: boolean = false;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.isDisabled) {
      this.buttonClicked.emit();
    }
  }
}
