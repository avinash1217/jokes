import React, { Component } from 'react'
import '@rmwc/data-table/data-table.css'
import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableBody,
    DataTableHeadCell,
    DataTableRow,
    DataTableCell
} from '@rmwc/data-table'
import { ListDivider } from '@rmwc/list'
import {
    Card, CardAction,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from '@rmwc/card'

class JokesTable extends Component {
    render() {

        return (
            <div>
                <DataTable style={{ width: '99.9%' }}>
                    <DataTableContent style={{ width: '100%' }}>
                        <DataTableHead >
                            <DataTableRow>
                                <DataTableHeadCell>Joke</DataTableHeadCell>
                                <DataTableHeadCell>Categories</DataTableHeadCell>
                                <DataTableHeadCell>Created</DataTableHeadCell>
                                <DataTableHeadCell>Actions</DataTableHeadCell>
                            </DataTableRow>
                        </DataTableHead>
                        <DataTableBody>
                            {this.props.jokesView.jokes.map((joke, i) => (
                                <DataTableRow
                                    key={i}>
                                    <DataTableCell>{joke.content}</DataTableCell>
                                    <DataTableCell></DataTableCell>
                                    <DataTableCell>{new Date(joke.created_at).toDateString()}</DataTableCell>
                                    <DataTableCell></DataTableCell>
                                </DataTableRow>
                            ))}
                        </DataTableBody>
                    </DataTableContent>
                </DataTable>
                <ListDivider />

                <CardActions>
                    <CardActionIcons>
                        <CardAction onClick={() => this.props.getPage({page: parseInt(this.props.jokesView.page) - 1})} icon="arrow_back"/>
                        <CardAction onClick={() => this.props.getPage({page: parseInt(this.props.jokesView.page) + 1})} icon="arrow_forward" />
                    </CardActionIcons>
                </CardActions>
            </div>
        )
    }
}

export default JokesTable