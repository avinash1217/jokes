import React, { Component } from 'react'
import { connect } from 'react-redux'
import '@material/typography/dist/mdc.typography.css'
import './main.css'
import Bar from '../bar/bar'

class Main extends Component {
    render() {
        return (
            <div>
                <Bar />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps
)(Main)