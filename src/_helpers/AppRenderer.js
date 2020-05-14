import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Context } from "../_helpers/";
import { Alert, Header } from '../_components'



const AllTheProviders = ({ children }) => {

    const route = '/';
    const history = createMemoryHistory({ initialEntries: [route] });
    const stateAuth = { user: { role: 'Admin', firstName: 'Mehmet', lastName: 'Aktas' } }

    return (<Context.Provider value={{ stateAuth: stateAuth }} >
        <Router history={history} >

            <div>
                <Header /><Alert />
                {children}
            </div>
        </Router></Context.Provider>)

}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// override render method
export { customRender as render }