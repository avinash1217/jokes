
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getJokes } from '../../actions/jokes'
import JokesTable from './table'

import {
    Card, CardAction,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from '@rmwc/card'
import { Button, ButtonIcon } from '@rmwc/button'
import { ListDivider } from '@rmwc/list'
import { Typography } from '@rmwc/typography'

class Jokes extends Component {
    componentDidMount() {
        this.props.getJokes()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps
    }

    render() {
        return (
            <div className='jokes-card'>
                <Card outlined style={{ marginTop: '10px' }}>
                    <CardActions>
                        <Typography
                            use="subtitle1"
                            tag="div"
                            style={{ padding: '0.5rem 1rem' }}
                            theme="text-secondary-on-background"
                        >
                            Jokes
                        </Typography>
                        <Button><ButtonIcon icon="add" /> Create</Button>
                    </CardActions>

                    <ListDivider />
                    {
                        this.props.jokesReducer && this.props.jokesReducer.jokesView ? <JokesTable getPage={this.props.getJokes} jokesView={this.props.jokesReducer.jokesView} /> : null
                    }
                </Card >
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getJokes: (params) => dispatch(getJokes(params))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Jokes)