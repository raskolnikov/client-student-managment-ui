import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, waitFor } from '@testing-library/react'
import { ForgotPassword } from '../ForgotPassword'
import * as ApiCall from '../../_helpers/ApiCall'
import { render } from '../../_helpers'
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const mockForgotPasswordApiCall = jest.spyOn(ApiCall, 'forgotPasswordApiCall')


afterEach(() => {
    mockForgotPasswordApiCall.mockClear()
})

test('Render component without crash', async () => {

    const screen = render(<ForgotPassword />)

    expect(screen.getByPlaceholderText('Email or Mobile Number')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()

})

test('Should show successfull message if api call successfull', async () => {

    mockForgotPasswordApiCall.mockImplementationOnce(() => {

        return Promise.resolve('Email sent!')
    })

    const screen = render(<ForgotPassword />)

    const logonName = screen.getByPlaceholderText(/email or mobile number/i)
    const loginButton = screen.getByText(/submit/i)

    fireEvent.change(logonName, { target: { name: 'logonName', value: 'mymail@yopmail.com' } })
    fireEvent.click(loginButton)

    await waitFor(() => {

        expect(screen.getByText(/Please check your email for password reset instructions/i)).toBeInTheDocument()
        expect(mockForgotPasswordApiCall).toBeCalledTimes(1)

    })


})


