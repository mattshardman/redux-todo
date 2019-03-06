import React from 'react';

import { StoreContext } from './Context';

export const Provider = ({ children, store }) =>
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>;

export default Provider;
