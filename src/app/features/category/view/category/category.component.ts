import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainListComponent } from '../../components/main-list/main-list.component';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MainListComponent, ColorsListComponent],
  template: `
    <div class="flex flex-col justify-between h-full w-full">
      <app-main-list />
      <app-colors-list />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {}
