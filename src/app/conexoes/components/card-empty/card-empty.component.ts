import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-empty',
  templateUrl: './card-empty.component.html',
  standalone: false,
})
export class CardEmptyComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() iconClass = '';
}
