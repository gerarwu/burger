import * as actions from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENTS_PRICE = {
    salad: 5,
    bacon: 10,
    cheese: 15,
    meat: 20
}

const reducer = (state = initialState, action)=>{

    switch(action.type){
        case actions.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }

        case actions.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        
        case actions.SET_INGREDIENTS:            
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice: 0
            }
        
        case actions.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }

        default:
            return state
    }

}

export default reducer;