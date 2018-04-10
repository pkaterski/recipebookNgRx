import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../shared/store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() removeSelection = new EventEmitter<void>();
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        
        if (data.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = data.editedIngredient;          

          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit() {
    const value = this.shoppingListForm.value;
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(value.name, value.amount)));
      this.editMode = false;
      this.shoppingListForm.reset();
      this.removeSelection.emit();
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(value.name, value.amount)))
      this.shoppingListForm.reset();
    }
  }

  onDelete() {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.editMode = false;
      this.removeSelection.emit();
      this.shoppingListForm.reset();
    }
  }

  onClearSelection() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.removeSelection.emit();
  }
}
