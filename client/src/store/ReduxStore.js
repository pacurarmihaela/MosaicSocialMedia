import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import {thunk} from "redux-thunk";
import { reducers } from "../reducers";

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem('store', serializedStore);
  } catch (e) {
    console.error('Error saving to local storage:', e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store');
    return serializedStore ? JSON.parse(serializedStore) : undefined;
  } catch (e) {
    console.error('Error loading from local storage:', e);
    return undefined;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
