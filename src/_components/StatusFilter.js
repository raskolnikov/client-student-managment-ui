import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {setUrlParam} from '../_helpers/setUrlParams'


const filterOptions = [{ key: "ACTIVE", value: "ACTIVE", text: "Active" }, { key: "INACTIVE", value: "INACTIVE", text: "Inactive" },]

const StatusFilter = (props) => {

    const { onChangeFilter, defaultSelectedFilter } = props

    const [selectedFilter, setSelectedFilter] = useState(defaultSelectedFilter)

    const onChange = (e, { value }) => {

        setSelectedFilter(value)

        const filter = { status: value }
        onChangeFilter(filter)

        setUrlParam('status', value)

    }

    return (
        <Dropdown
            placeholder='Select Status'
            selection
            options={filterOptions}
            value={selectedFilter}
            onChange={onChange}
        />

    )
}

StatusFilter.propTypes = {
    onChangeFilter: PropTypes.func.isRequired,
    defaultSelectedFilter: PropTypes.string.isRequired
}

export default StatusFilter


