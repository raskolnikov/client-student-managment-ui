import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { getUsersApiCall, deleteUserApiCall } from '../_helpers/ApiCall'
import { Context, history } from "../_helpers/";
import { getUrlParam } from '../_helpers/setUrlParams'
import UserTable from '../_components/UserTable'
import FilterTable from '../_components/FilterTable'
import confirmService from '../_helpers/confirmService';
import { alertService } from '../_services/alert.service'
import { convertErrorToMessage } from '../_helpers/parseServerError'


/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const List = () => {

    const context = useContext(Context);

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
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

            alertService.error(convertErrorToMessage(err))

            setLoading(false);

        })

    }, [filterParams])

    const deleteUser = async (user) => {

        const result = await confirmService.show({
            message: 'Are you sure of delete this user?'
        })

        if (result) {

            let userId = user.id;

            setLoading(true);

            deleteUserApiCall(user.id).then(res => {

                let newUserList = users.filter(user => user.id !== userId)

                setUsers(newUserList)

                alertService.success({ message: 'User successfully deleted!' })

                setLoading(false);

            }).catch(err => {

                alertService.error(convertErrorToMessage(err))
                setLoading(false);

            })
        }
    }


    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, ...filter })

    }

    return (

        <React.Fragment>

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

        </React.Fragment>

    )
}

export { List }