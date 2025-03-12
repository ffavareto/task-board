import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InclusionFormComponent } from '../../components/inclusion-form/inclusion-form.component';

@Component({
  selector: 'app-task',
  imports: [InclusionFormComponent],
  template: `
    <div class="flex flex-col mx-10">
      <!-- Título -->
      <span class="font-bold text-4xl">Meu quadro de tarefas</span>

      <!-- Form -->
      <app-inclusion-form />

      <!-- Divisor -->
      <!-- Lista -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {}
