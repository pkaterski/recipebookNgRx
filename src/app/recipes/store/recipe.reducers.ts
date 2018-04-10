import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import { AppState } from "../../shared/store/app.reducers";

export interface FeatureState extends AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe('Hot Dog', 'a hot dog', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png', [new Ingredient('dog', 1)]),
        new Recipe('Hot Dog', 'a hot dog', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png', [new Ingredient('dog', 1)]),
        new Recipe('Hot Dog', 'a hot dog', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png', [new Ingredient('dog', 1)]),
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                recipes: action.payload
            };
        case RecipeActions.ADD_RECIPE:
            return {
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            let newRecipes = [...state.recipes];
            newRecipes[action.payload.index] = action.payload.recipe;
            return {
                recipes: newRecipes
            };
        case RecipeActions.DELETE_RECIPE:
            let delRecipes = [...state.recipes];
            delRecipes.splice(action.payload, 1)
            return {
                recipes: delRecipes
            };
        default:
            return state;
    }
}