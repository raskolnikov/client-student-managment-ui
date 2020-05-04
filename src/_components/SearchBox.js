import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import { appendUrlParam, removeUrlParam } from '../_helpers/setUrlParams'

const SearchBox = ({ handleSearch, defaultValue = '' }) => {

    const [searchValue, setSearchValue] = useState(defaultValue)

    const onChange = (e) => {

        let boxVal = e.target.value

        setSearchValue(boxVal)

        handleSearch({ search: boxVal })

        if (boxVal.length > 0) {

            appendUrlParam('search', boxVal)

        } else {

            removeUrlParam('search')
        }
    }

    return (

        <Input
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search...' onChange={onChange} value={searchValue}
        />
    )
}

SearchBox.propTypes = {
    handleSearch: PropTypes.func.isRequired
}

export default SearchBox