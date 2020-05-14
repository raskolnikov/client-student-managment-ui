import React from 'react'
import { render } from '../../_helpers'
import * as ApiCall from '../../_helpers/ApiCall'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, waitFor } from '@testing-library/react'

import MutationObserver from '@sheerun/mutationobserver-shim'
import { Add } from '../Add'
window.MutationObserver = MutationObserver

const mockRegisterUserApiCall = jest.spyOn(ApiCall, 'registerUserApiCall')

test('Should show error message if any mandatory field is not entered', async () => {

    const screen = render(<Add />)

    const firstName = screen.getByPlaceholderText('First Name')
    const lastName = screen.getByPlaceholderText('Last Name')
    const email = screen.getByPlaceholderText('Email')

    const submit = screen.getByText('Submit')

    fireEvent.change(firstName, { target: { name: 'firstName', value: 'Mehmet' } })
    fireEvent.change(lastName, { target: { name: 'lastName', value: 'Aktas' } })

    fireEvent.change(email, { target: { name: 'email', value: '' } })

    fireEvent.click(submit)


    await waitFor(() => {

        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument()

    })

})

test.skip('Should create new user if all required fields are entered', async () => {

    mockRegisterUserApiCall.mockImplementationOnce(() => {
        return Promise.resolve("User created")
    })

    const screen = render(<Add />)

    const firstName = screen.getByPlaceholderText('First Name')
    const lastName = screen.getByPlaceholderText('Last Name')
    const email = screen.getByPlaceholderText('Email')
    const password = screen.getByPlaceholderText('Password')
    const role = screen.getByText('Role2')
    const mobileNumber = screen.getByPlaceholderText('Mobile Number')

    const submit = screen.getByText('Submit')

    fireEvent.change(firstName, { target: { name: 'firstName', value: 'Mehmet' } })
    fireEvent.change(lastName, { target: { name: 'lastName', value: 'Aktas' } })

    fireEvent.change(email, { target: { name: 'email', value: 'mehmet@yopmail.com' } })
    fireEvent.change(role, { target: { name: 'role', value: 'user' } })
    fireEvent.change(password, { target: { name: 'password', value: 'pass12345' } })
    fireEvent.change(mobileNumber, { target: { name: 'mobileNumber', value: '7777777777' } })

    fireEvent.click(submit)

    await waitFor(() => {

        expect(mockRegisterUserApiCall).toBeCalledTimes(1)

    })

})