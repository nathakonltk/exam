import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output() toggleClick = new EventEmitter<boolean>();
  toggleMenu() {
    // console.log(11)
    this.toggleClick.emit();
  }
}
