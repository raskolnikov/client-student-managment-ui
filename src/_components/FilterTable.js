import React from 'react'
import { Grid } from 'semantic-ui-react'
import StatusFilter from './StatusFilter'
import SearchBox from './SearchBox'

const FilterTable = ({ onChangeFilter, filterStatus, defaultSearchValue }) => {

    return (

        <Grid>

            <Grid.Row columns={2} divided>

                <Grid.Column>
                    <StatusFilter onChangeFilter={onChangeFilter} defaultSelectedFilter={filterStatus} />
                </Grid.Column>

                <Grid.Column>
                    <SearchBox handleSearch={onChangeFilter} defaultValue={defaultSearchValue} />
                </Grid.Column>

            </Grid.Row>

        </Grid>

    )

}


export default FilterTable