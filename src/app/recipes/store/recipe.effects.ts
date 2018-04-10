import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';


import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs';


@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.http.get<Recipe[]>('https://udemy-recipe-project-db.firebaseio.com/recipes.json');
        })
        .map(
        // Add the ingredients propery when it's missing
        (fetchedData) => {
            for (let item of fetchedData) {
                if (!item['ingredients'])
                    item['ingredients'] = [];
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: fetchedData
            }
        });

    @Effect({dispatch: false})
    SaveRecipes = this.actions$
        .ofType(RecipeActions.SAVE_RECIPES)
        .switchMap((action: RecipeActions.SaveRecipes) => {
            return this.store.select('recipes');
        })
        .map((recipeState: fromRecipe.State) => {
            return recipeState.recipes
        })
        .switchMap((recipes: Recipe[]) => {
            const req = new HttpRequest('PUT', 'https://udemy-recipe-project-db.firebaseio.com/recipes.json', recipes, { reportProgress: true });
            return this.http.request(req);
        });

    constructor (private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
}