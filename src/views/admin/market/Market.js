/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect } from 'react'

import { dataScreener, dataCalender, dataAnalysis } from './components/Settings'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const Market = () => {
    const classes = useStyles()

    const analysis = useRef(null)
    const calender = useRef(null)
    const screener = useRef(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
        script.async = true
        script.innerHTML = JSON.stringify(dataCalender)

        calender.current.appendChild(script)
    }, [])

    useEffect(() => {
        const script = document.createElement('script')
        script.async = true
        script.innerHTML = JSON.stringify(dataScreener)
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

        screener.current.appendChild(script)
    }, [])

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
        script.async = true
        script.innerHTML = JSON.stringify(dataAnalysis)

        analysis.current.appendChild(script)
    }, [])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={7}>
                <Grid
                    item
                    xs={12}
                    lg={12}
                    xl={12}
                    md={12}>
                    <div ref={calender} />
                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={12}
                    xl={12}
                    md={12}>
                    <div ref={screener} />
                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={12}
                    xl={12}
                    md={12}>
                    <div ref={analysis} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Market