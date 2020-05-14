import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, waitFor } from '@testing-library/react'
import { Login } from '../Login'
import * as ApiCall from '../../_helpers/ApiCall'
import { render } from '../../_helpers'
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const mockLoginApiCall = jest.spyOn(ApiCall, 'loginApiCall')


afterEach(() => {
    mockLoginApiCall.mockClear()
})

test('Render component without crash', () => {

    const { getByText, getByPlaceholderText } = render(<Login />)

    getByText(/login/i)
    getByPlaceholderText(/email or mobile number/i)
    getByPlaceholderText(/password/i)
    getByText(/submit/i)
    getByText(/forgot password/i)
})

test('Should not send login creadentials to server if fields are empty', async () => {

    const screen = render(<Login />)

    const logonName = screen.getByPlaceholderText(/email or mobile number/i)
    const password = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByText(/submit/i)

    fireEvent.change(logonName, { target: { name: 'logonName', value: '' } })
    fireEvent.change(password, { target: { name: 'password', value: '' } })

    fireEvent.click(loginButton)

    // wait for appearance
    await waitFor(() => {

        //expect(screen.container.getElementsByClassName(/loading/i)).()

        expect(screen.getByText(/Email or mobile number is required/i)).toBeInTheDocument()
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()

    }).then(() => {

        expect(mockLoginApiCall).toHaveBeenCalledTimes(0)
    })

})

test('Should not send login creadentials to server if fields are empty', async () => {

    const screen = render(<Login />)

    const logonName = screen.getByPlaceholderText(/email or mobile number/i)
    const password = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByText(/submit/i)

    fireEvent.change(logonName, { target: { name: 'logonName', value: '' } })
    fireEvent.change(password, { target: { name: 'password', value: '' } })

    fireEvent.click(loginButton)

    // wait for appearance
    await waitFor(() => {

        expect(screen.getByText(/Email or mobile number is required/i)).toBeInTheDocument()
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()

    }).then(() => {

        expect(mockLoginApiCall).toHaveBeenCalledTimes(0)
    })

})

test('Should display error message if username or password wrong', async () => {

    mockLoginApiCall.mockImplementationOnce(() => {
        return Promise.reject({message:"Invalid logon name or password"})
    })


    const screen = render(<Login />)

    const logonName = screen.getByPlaceholderText(/email or mobile number/i)
    const password = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByText(/submit/i)

    fireEvent.change(logonName, { target: { name: 'logonName', value: 'wrong_username' } })
    fireEvent.change(password, { target: { name: 'password', value: 'wrong_password' } })

    fireEvent.click(loginButton)

    await waitFor(() => {

        expect(mockLoginApiCall).toHaveBeenCalledTimes(1)
        expect(screen.getByText(/Invalid logon name or passwor/i)).toBeInTheDocument()

    })

})

test('Should call server with correct params', async () => {

    mockLoginApiCall.mockImplementationOnce(() => {
        return Promise.resolve({ data: { jwtToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJNZWhtZXQiLCJsYXN0TmFtZSI6IkFrdGFzIiwic3ViIjoiNDEiLCJyb2xlIjoiQURNSU4iLCJpZCI6NDEsImV4cCI6MTU4OTU0OTQ3MH0.JGtnYqHH6n3ffve5TADDxjYy_Ys9PurMs0YNvBqJE2f5K7xHe3j0YT4deVrTrpCLo2ktXh64bsaUrWS0amXlIw' } })
    })


    const screen = render(<Login />)

    const logonName = screen.getByPlaceholderText(/email or mobile number/i)
    const password = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByText(/submit/i)

    fireEvent.change(logonName, { target: { name: 'logonName', value: 'username' } })
    fireEvent.change(password, { target: { name: 'password', value: 'password' } })

    fireEvent.click(loginButton)

    await waitFor(() => {

        expect(mockLoginApiCall).toHaveBeenCalledTimes(1)
        expect(mockLoginApiCall).toHaveBeenLastCalledWith({ logonName: 'username', password: 'password' })


    })

})