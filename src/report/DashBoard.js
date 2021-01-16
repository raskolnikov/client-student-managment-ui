import React, { useState } from 'react'
import SockJsClient from 'react-stomp';
import { Table } from 'semantic-ui-react'


const DashBoard = () => {

    const SOCKET_URL = 'http://localhost:8040/ws';

    const [userFirstNameCounts, setUserFirstNameCounts] = useState(new Map())

    const onConnected = () => {
        console.log("Connected!!")
    }

    const onMessageReceived = (msg) => {

        console.log('New Message Received!!', msg);
        userFirstNameCounts.set(msg.firstName, msg.firstNameCount)

        setUserFirstNameCounts(new Map(userFirstNameCounts));
    }

    const customHeaders = {

        Authorization: "Bearer " + localStorage.jwtToken
    };


    return (
        <>
            <SockJsClient
                url={SOCKET_URL}
                headers={customHeaders}
                topics={['/topic/user-first-name-count']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={true}
            />

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(

                        userFirstNameCounts.keys() && [...userFirstNameCounts.keys()].map((firstName) => {
                           
                            return (
                                <Table.Row key={firstName}>
                                    <Table.Cell>{firstName}</Table.Cell>
                                    <Table.Cell>{userFirstNameCounts.get(firstName)}</Table.Cell>
                                </Table.Row>
                            )

                        })
                    )}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>


                    </Table.Row>
                </Table.Footer>
            </Table>

        </>

    )

}

export { DashBoard }