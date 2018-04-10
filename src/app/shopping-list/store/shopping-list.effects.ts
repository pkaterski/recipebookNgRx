import { Actions, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";

import * as ShoppingListActions from './shopping-list.actions';
import * as fromApp from '../../shared/store/app.reducers';
import * as fromShoppingList from './shopping-list.reducers';
import { Ingredient } from "../../shared/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

@Injectable()
export class ShoppingListEffects {
    @Effect()
    fetchIngredients = this.action$
        .ofType(ShoppingListActions.FETCH_INGREDIENTS)
        .switchMap(() => {
            return this.http.get<Ingredient[]>('https://udemy-recipe-project-db.firebaseio.com/shop.json')
        })
        .map((ingredients: Ingredient[]) => {
            return {
                type: ShoppingListActions.SET_INGREDIENTS,
                payload: ingredients
            }
        })
    @Effect({dispatch: false})
    saveIngredients = this.action$
        .ofType(ShoppingListActions.SAVE_INGREDIENTS)
        .switchMap(() => {
            return this.store.select('shoppingList');
        })
        .switchMap((shoppingListState: fromShoppingList.State) => {
            return this.http.put('https://udemy-recipe-project-db.firebaseio.com/shop.json', shoppingListState.ingredients);
        })
        

    constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}