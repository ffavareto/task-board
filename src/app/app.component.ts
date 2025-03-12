import { Component } from '@angular/core';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { MainComponent } from './layout/main/main.component';

@Component({
  selector: 'app-root',
  imports: [ThemeToggleComponent, MainComponent],
  template: `
    <div class="relative min-h-screen w-full">
      <app-theme-toggle />
      <app-main />
    </div>
  `,
})
export class AppComponent {}
