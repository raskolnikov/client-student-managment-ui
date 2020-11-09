import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import CourseTableRow from './CourseTableRow'
import CustomPagination from './CustomPagination'

const CourseTable = ({ isLoading, courses, deleteExam, currentPage, onChangeFilter }) => {

    const totalCount = courses.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Credit</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        courses.map(course => {

                            return <CourseTableRow course={course} key={course.id} onClickDelete={deleteExam} />

                        })
                    )}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='8'>
                            <CustomPagination totalCount={totalCount} current={currentPage} handleOnClick={onChangeFilter} />
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
            </Table>

            {isLoading && <Loader active />}

        </Fragment>
    )

}


export default CourseTable