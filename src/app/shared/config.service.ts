import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";
import { Store } from "@ngrx/store";

import * as fromRecipe from '../recipes/store/recipe.reducers';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


@Injectable()
export class ConfigService {
constructor(
            private store: Store<fromRecipe.FeatureState>,
        ) {}

saveData() {
    this.saveRecipes();
    this.saveSL();
}

fetchData() {
    this.fetchRecipes();
    this.fetchSL();
}

saveRecipes() {
    this.store.dispatch(new RecipeActions.SaveRecipes());
}

saveSL() {
    this.store.dispatch(new ShoppingListActions.SaveIngredients());
}

fetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
}

fetchSL() {
    this.store.dispatch(new ShoppingListActions.FetchIngredients());
}
}