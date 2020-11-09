import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import CustomPagination from './CustomPagination'
import StudentCourseTableRow from './StudentCourseTableRow'

const StudentCoursesTable = ({ isLoading, studentCourses, deleteStudentCourse, currentPage, onChangeFilter }) => {

    const totalCount = studentCourses.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Course Name</Table.HeaderCell>
                        <Table.HeaderCell>Education Term</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        studentCourses.map(studentCourse => {

                            return <StudentCourseTableRow studentCourse={studentCourse} key={studentCourse.id} onClickDelete={deleteStudentCourse} />

                        })
                    )}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='6'>
                            <CustomPagination totalCount={totalCount} current={currentPage} handleOnClick={onChangeFilter} />
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
            </Table>

            {isLoading && <Loader active />}

        </Fragment>
    )

}


export { StudentCoursesTable }