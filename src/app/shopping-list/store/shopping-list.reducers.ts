import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return addIngredientToState(state, action.payload);
        case ShoppingListActions.ADD_INGREDIENTS:
            for (let i of action.payload) {
                state = addIngredientToState(state, i);
            }
            return state;
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredientsDel = [...state.ingredients];
            ingredientsDel.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredientsDel,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            }
        case ShoppingListActions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }
        default:
            return state;
    }
}


// account from duplicates
function addIngredientToState(oldState: State, ingredient: Ingredient): State {
    let state = {...oldState};
    
    let match = false;
    state.ingredients.forEach((item) => {
        if (item.name.toUpperCase() === ingredient.name.toUpperCase()) {
            item.amount += ingredient.amount;
            match = true;
            
            // returning the state here causes a problem
            // the result is undefined?! (after the first match)
            // why?
            // return state;
            // OMG THAT'S WHY!!!
            // WE ARE IN A ES6 ARROW FUNCTION
            // SO WE ARE RETURNING FROM THE ANNONYMOUS FUNCTION
            // (item) => {...return} <- not returning from addIngredientToState
            return state; // not a result of addIngredientToState but a result of the arrow function!!!
        }
    });

    if (!match) {
        return {
            ...state,
            // new ingredient because of known bug where ingredients not in the shopping list are located in the
            // same place in memory so they get edited when item.amount += ingredient.amount;
            ingredients: [...state.ingredients, {...ingredient}]
        }
    } else {
        return state;
    }
    
}