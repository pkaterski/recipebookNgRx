import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipes.State>;

  constructor(private store: Store<fromRecipes.FeatureState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
