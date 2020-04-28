import React, { useState, useEffect, useContext } from 'react';
import { Card, Loader, Button, Icon, Grid, Menu } from 'semantic-ui-react';
import UsertList from './UserList'
import { getUsersApiCall, deleteUserApiCall } from '../../utils/ApiCall'
import Context from '../../utils/context'
import FlashMessage from '../common/FlashMessage'
import YesNoModal from '../common/YesNoModal'
import history from '../../utils/history'
import StatusFilter from '../common/StatusFilter'
import CustomPagination from '../common/CustomPagination'
import { getUrlParam } from '../../utils/setUrlParams'

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const defaultStatus = "ACTIVE"
const recordPerPage = 2

const UserListPage = () => {

    const context = useContext(Context);

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showYesNoModal, setShowYesNoModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const [modelMessage, setModelMessage] = useState("")

    let initialCurrentPage = parseInt(getUrlParam("page") || 1)
    const [currentPage, setCurrentPage] = useState(initialCurrentPage)
    
    let initalStatus = getUrlParam("status") || defaultStatus
    const [filterStatus, setFilterStatus] = useState(initalStatus);

    const [filterParams, setFilterParam] = useState({ offset: currentPage - 1, status: filterStatus })
    
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {


        setLoading(true);

        getUsersApiCall(filterParams).then(res => {

            setUsers(res.data);
            setTotalCount(res.data.length)

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

    const toggleYesNoModal = () => {

        setShowYesNoModal(!showYesNoModal);
    }

    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, filter })

    }

    const onClickPagination = (page) => {

        const currentOffset = page - 1;
        setFilterParam({ ...filterParams, offset: currentOffset })

    }

    return (

        <React.Fragment>

            {context.stateAuth.message && <FlashMessage message={context.stateAuth.message} />}

            <Grid>

                <Grid.Row>

                    <Grid.Column width={3}>
                        <StatusFilter onChangeFilter={onChangeFilter} defaultSelectedFilter={filterStatus} />
                    </Grid.Column>
                    <Grid.Column width={13}>

                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/users/new") }}>
                            <Icon name='user' /> Add User
                        </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                    {!isLoading && (
                        <Card.Group>
                            <UsertList users={users} deleteUser={deleteUser}></UsertList>
                        </Card.Group>
                    )}

                </Grid.Row>

                <Grid.Row centered>

                    <CustomPagination recordPerPage={recordPerPage} totalCount={totalCount} current={currentPage} handleOnClick={onClickPagination} />

                </Grid.Row>

            </Grid>


            {isLoading && <Loader active />}

            <YesNoModal
                onClickYes={deleteUserConfirm}
                onClickNo={toggleYesNoModal}
                showModal={showYesNoModal}
                message={modelMessage}
                selectedItem={selectedUser}
            />

        </React.Fragment>

    )
}

export default UserListPage