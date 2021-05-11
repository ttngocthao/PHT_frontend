import{createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import dailyNoteReducer from '../state/reducers/dailyNote.reducer';
import mealNoteReducer from '../state/reducers/mealNote.reducer';

const reducer = combineReducers({
    dailyNotes: dailyNoteReducer,
    mealNotes: mealNoteReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof reducer>;
export default store;