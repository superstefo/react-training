import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)
store.update333 = {
}
store.profile333 = {}

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
  console.log("Get store");
  return store;
}

store.getMatchById = (id) => {
  console.log(id);
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
  if (!value) {
    throw "'value' is not allowed: " + value
  }
  addToFunctionsQ(
    function() {
      // for (var i = 0; i < 999999999; i++) {
      //
      // }
    //  console.debug("Adding to store: " +key + "; and value:  " + value);
      store[key]=value;
    }
  );

}

// store.addToStore("ssssssssssssss", "ssss")
// console.log("store.getStore()" ); store.getStore()
// store.addToStore("sssssssssssssssss2", "ssss2")
// console.log("store.getStore()"); store.getStore()
// store.addToStore("ssssss333ssssss3", "ssss33333")
// console.log("store.getStore()"); store.getStore()
//  console.log(store);
export default store;
