import React from 'react'
import { render } from '../../_helpers'
import * as ApiCall from '../../_helpers/ApiCall'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, waitFor } from '@testing-library/react'

import MutationObserver from '@sheerun/mutationobserver-shim'
import { List } from '../List'
window.MutationObserver = MutationObserver

const mockGetUsersApiCall = jest.spyOn(ApiCall, 'getUsersApiCall')
const mockDeleteUserApiCall = jest.spyOn(ApiCall, 'deleteUserApiCall')

afterEach(() => {

    mockGetUsersApiCall.mockClear()
    mockDeleteUserApiCall.mockClear()
})


test('Should show list of users', async () => {

    const user = {
        id: 1,
        firstName: 'Mehmet',
        lastName: 'Aktas',
        email: 'meh@yopmail.com',
        mobileNumber: '7777777777',
        role: 'user'
    }


    const users = new Array(10)

    for (var i = 0; i < 10; i++) {
        users[i] = { ...user, id: i }
    }

    mockGetUsersApiCall.mockImplementationOnce(() => {
        return Promise.resolve({ data: users })
    })

    const screen = render(<List />)


    await waitFor(() => {

        expect(mockGetUsersApiCall).toBeCalledTimes(1)

    }).then(() => {

        const userRows = screen.getAllByText(/mehmet/i)
        expect(userRows.length).toBe(10)

    })

})

test('Should display confirmation if delete clicked', async () => {

    const user = {
        id: 1,
        firstName: 'Mehmet',
        lastName: 'Aktas',
        email: 'meh@yopmail.com',
        mobileNumber: '7777777777',
        role: 'user'
    }


    const users = new Array(10)

    for (var i = 0; i < 10; i++) {
        users[i] = { ...user, id: i }
    }

    mockGetUsersApiCall.mockImplementationOnce(() => {
        return Promise.resolve({ data: users })
    })

    mockDeleteUserApiCall.mockImplementationOnce(() => {
        return Promise.resolve({ message: "User deleted" })
    })

    const screen = render(<List />)

    await waitFor(() => {

        expect(mockGetUsersApiCall).toBeCalledTimes(1)

    }).then(async () => {

        const deleteRow = screen.getAllByText(/Delete/i)[0]
        fireEvent.click(deleteRow);

        expect(screen.getByText(/Are you sure of delete this user/i)).toBeInTheDocument()

        const yesButton = screen.getByText(/yes/i)

        fireEvent.click(yesButton)

        await waitFor(() => {

            expect(mockDeleteUserApiCall).toBeCalledTimes(1)
            expect(mockDeleteUserApiCall).toBeCalledWith(0)
            //expect(screen.getAllByText(/User successfully deleted!/i)).toBeInTheDocument()

        })

    })

})