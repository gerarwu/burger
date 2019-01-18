import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router-dom';

const asyncCheckout = React.lazy(()=> import('./containers/Checkout/Checkout'))
const asyncBurgerBuilder = React.lazy(()=> import('./containers/BurgerBuilder/BurgerBuilder'));
const asyncAuth = React.lazy(()=> import('./containers/Auth/Auth'));
const asyncOrders = React.lazy(()=> import('./containers/Orders/Orders'));
const asyncLogout = React.lazy(()=> import('./containers/Auth/Logout/Logout'));

class App extends Component {
  render() {    
    return (
      <div>
        <Layout>    
          <React.Suspense fallback={"loading"}>      
            <Switch>            
              <Route path='/checkout' component={asyncCheckout} />
              <Route path='/orders' component={asyncOrders} />
              <Route path='/auth' component={asyncAuth} />
              <Route path='/logout' component={asyncLogout} />
              <Route path='/' exac    component={asyncBurgerBuilder} />            
            </Switch>          
          </React.Suspense>
        </Layout>
      </div>
    );
  }
}

export default App;
