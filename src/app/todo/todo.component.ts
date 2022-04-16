import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../models/ITask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public todoForm!: FormGroup;

  public tasks: ITask[] = [];
  public inProgress: ITask[] = [];
  public done: ITask[] = [];
  public editableIndex: number | undefined;
  public isEditEnabled: boolean = false;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.formbuilder.group({
      todos: ['', Validators.required],
    });
  }

  public addTodos = () => {
    this.tasks.push({
      description: this.todoForm.value.todos,
      done: false,
    });
    this.todoForm.reset();
  };

  public deleteTodo = (i: number) => {
    this.tasks.splice(i, 1);
  };

  public deleteInProgress = (i: number) => {
    this.inProgress.splice(i, 1);
  };
  public deleteDoneTodo = (i: number) => {
    this.done.splice(i, 1);
  };

  public editTodo = (item: ITask, i: number) => {
    console.log('item', item);
    console.log('index', i);
    this.todoForm.controls['todos'].setValue(item.description);
    this.editableIndex = i;
    this.isEditEnabled = true;
  };
  public updateTodo = () => {
    this.tasks[this.editableIndex!].description = this.todoForm.value.todos;
    this.tasks[this.editableIndex!].done = false;
    this.todoForm.reset();
    this.editableIndex = undefined;
    this.isEditEnabled = false;
  };

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
