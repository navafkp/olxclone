import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './farebase/config'
import { FirebaseContext } from './store/farebaseContext';
import Context from './store/farebaseContext';


ReactDOM.render(
<FirebaseContext.Provider value={firebase}>
<Context>
<App />
</Context>

</FirebaseContext.Provider>
, document.getElementById('root'));
