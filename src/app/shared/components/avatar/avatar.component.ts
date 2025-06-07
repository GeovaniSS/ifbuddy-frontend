import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  standalone: false,
})
export class AvatarComponent {
  @Input() nome = '';
  @Input() src: string | null = null;
  @Input() alt = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';

  get initials(): string {
    return this.nome
      .split(' ')
      .map(p => p.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  get srcImage() {
    const imageApiUrl = `https://ui-avatars.com/api/?name=${this.initials}&background=random&size=128`;
    if (this.hasImage) {
      return this.src;
    } else {
      return imageApiUrl;
    }
  }

  get hasImage(): boolean {
    return !!this.src;
  }

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-24 h-24';
      case '2xl':
        return 'w-48 h-48';
      default:
        return 'w-12 h-12';
    }
  }
}
