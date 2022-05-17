import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
// import Inventory from './components/Inventory/viewInventory';
import Warehouse from './components/Warehouse/viewWarehouse';
import WarehouseLocation from './components/Warehouse/warehouseLocation';
import EditItem from './components/Warehouse/editItemForm';

import {getAllWarehouses} from './store/warehouse'
import {getAllItems} from './store/inventory'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllWarehouses());
      await dispatch(getAllItems())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact={true}>
          <Warehouse />
        </Route>

        <Route path={'/:warehouseId'} exact={true}>
          <WarehouseLocation />
        </Route>

        <Route path={'/items/:itemId'} exact={true}>
          <EditItem />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
