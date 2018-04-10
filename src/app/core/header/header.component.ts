import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromApp from '../../shared/store/app.reducers';

import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
    }
    
    onSaveData() {
        if (confirm('Save Current Data?')) {
            this.store.dispatch(new RecipeActions.SaveRecipes());
            this.store.dispatch(new ShoppingListActions.SaveIngredients());
        }
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        this.store.dispatch(new ShoppingListActions.FetchIngredients());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}