import React, { useState, useEffect, useContext } from 'react';
import { Card, Loader, Button, Icon, Grid, Menu, Table } from 'semantic-ui-react';
import { getUsersApiCall, deleteUserApiCall } from '../../utils/ApiCall'
import Context from '../../utils/context'
import FlashMessage from '../common/FlashMessage'
import YesNoModal from '../common/YesNoModal'
import { getUrlParam } from '../../utils/setUrlParams'
import UserTable from '../common/UserTable'
import FilterTable from '../common/FilterTable'
import history from '../../utils/history'

/**
 * Created by Mehmet Aktas on 2020-03-10
 */


const UserListPage = () => {

    const context = useContext(Context);

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showYesNoModal, setShowYesNoModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const [modelMessage, setModelMessage] = useState("")

    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true);
        getUsersApiCall(filterParams).then(res => {

            setUsers(res.data);

            setLoading(false);

        }).catch(err => {

            context.flashErrorMessage(err)
            setLoading(false);

        })

    }, [filterParams])

    const deleteUser = (user) => {

        setSelectedUser(user);
        setModelMessage("Please confirm to delete user: " + user.firstName + " " + user.lastName);
        setShowYesNoModal(true)

    }

    const deleteUserConfirm = (user) => {

        let userId = user.id;

        setShowYesNoModal(false)
        setLoading(true);

        deleteUserApiCall(user.id).then(res => {

            let users = users.filter(user => user.id !== userId)
            setUsers(users)

            setLoading(false);

        }).catch(err => {

            context.flashErrorMessage(err)
            setLoading(false);

        })

    }

    const hideYesNoModal = () => {

        setShowYesNoModal(false);
    }

    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, ...filter })

    }

    return (

        <React.Fragment>

            {context.stateAuth.message && <FlashMessage message={context.stateAuth.message} />}

            <Grid>

                <Grid.Row columns="2">
                    <Grid.Column>
                        <FilterTable onChangeFilter={onChangeFilter} filterStatus={filterParams.status} defaultSearchValue={filterParams.search} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/users/new") }}>
                            <Icon name='user' /> Add User
                    </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns='1'>
                    <Grid.Column>
                        <UserTable users={users} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteUser={deleteUser} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <YesNoModal
                onClickYes={deleteUserConfirm}
                onClickNo={hideYesNoModal}
                showModal={showYesNoModal}
                message={modelMessage}
                selectedItem={selectedUser}
            />

        </React.Fragment>

    )
}

export default UserListPage