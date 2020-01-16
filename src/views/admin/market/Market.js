/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect } from 'react'
import { Grid, useTheme } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const Market = () => {
    const classes = useStyles()
    const theme = useTheme()

    const analysis = useRef(null)
    const calender = useRef(null)
    const screener = useRef(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
        script.async = true
        script.innerHTML = JSON.stringify({
            'locale': 'en',
            'width': '100%',
            'height': '900',
            'colorTheme': theme.palette.type,
            'isTransparent': false,
            'importanceFilter': '-1,0,1',
            'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
        })

        calender.current.appendChild(script)
    })

    useEffect(() => {
        const script = document.createElement('script')
        script.async = true
        script.innerHTML = JSON.stringify({
            'locale': 'en',
            'width': '100%',
            'height': '900',
            'market': 'forex',
            'showToolbar': true,
            'colorTheme': theme.palette.type,
            'defaultScreen': 'general',
            'defaultColumn': 'overview'
        })
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

        screener.current.appendChild(script)
    })

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
        script.async = true
        script.innerHTML = JSON.stringify({
            'locale': 'en',
            'width': '100%',
            'height': '600',
            'interval': '1D',
            'colorTheme': theme.palette.type,
            'isTransparent': true,
            'symbol': 'OANDA:EURUSD',
            'showIntervalTabs': true
        })

        analysis.current.appendChild(script)
    })

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