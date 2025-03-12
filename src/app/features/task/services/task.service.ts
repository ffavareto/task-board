import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly httpClient = inject(HttpClient);
  public tasks = signal<Task[]>([]);
  public numberOfTasks = computed(() => this.tasks().length);
  private readonly apiUrl = environment.apiUrl;
  public isLoadingTask = signal(false);

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public insertATaskInTheTasksList(newTask: Task): void {
    this.tasks.update(tasks => {
      const newTasksList = [...tasks, newTask];
      return this.getSortedTasks(newTasksList);
    });
  }

  public updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient
      .put<Task>(`${this.apiUrl}/tasks/${updatedTask.id}`, updatedTask)
      .pipe(tap(task => this.updateATaskInTheTasksList(task)));
  }

  public updateIsCompletedStatus(
    taskId: string,
    isCompleted: boolean
  ): Observable<Task> {
    return this.httpClient
      .patch<Task>(`${this.apiUrl}/tasks/${taskId}`, {
        isCompleted,
      })
      .pipe(tap(task => this.updateATaskInTheTasksList(task)));
  }

  public deleteTask(taskId: string): Observable<Task> {
    return this.httpClient
      .delete<Task>(`${this.apiUrl}/tasks/${taskId}`)
      .pipe(tap(() => this.deleteATaskInTheTasksList(taskId)));
  }

  public deleteATaskInTheTasksList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  public updateATaskInTheTasksList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedtaskRemoved = tasks.filter(
        task => task.id !== updatedTask.id
      );

      const updatedTaskList = [...allTasksWithUpdatedtaskRemoved, updatedTask];
      return this.getSortedTasks(updatedTaskList);
    });
  }

  public getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title?.localeCompare(b.title));
  }
}
