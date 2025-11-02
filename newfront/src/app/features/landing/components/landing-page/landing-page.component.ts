import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { AnimateOnVisibleDirective } from '../../../../core/directives/AnimationOnVisible.directive';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    AnimateOnVisibleDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
}

