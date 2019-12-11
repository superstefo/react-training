import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

const functionsQueue = [];

let addToFunctionsQ = (funct) => {
  functionsQueue.push(funct);

  while (functionsQueue.length > 0) {
    let funcToCall = functionsQueue.shift()
    funcToCall();
  }
}

store.getStore = () => {
  // add dummy function as a placeholder
  addToFunctionsQ(() => {});
  return store;
}

store.getMatchById = (id) => {
  if (!id) {
    throw "'id' is not allowed to be: " + id
  }
  let matches = store.getStore().update.data.matches
  for (var i = 0; i < matches.length; i++) {
    if (id == matches[i]._id) {
      return matches[i];
    }

  }
  return null;
}

store.addToStore = (key, value) => {
  if (!key ||  typeof (key) != 'string') {
    throw "Only objects of type 'string' are allowed!"
  }

  addToFunctionsQ(
    function() {
      store[key]=value;
    }
  );

}



export default store;
