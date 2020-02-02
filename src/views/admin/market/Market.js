/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect, useState } from 'react'
import { Grid, useTheme, Button, ButtonGroup } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))

const Market = () => {
    const classes = useStyles()
    const theme = useTheme()

    const analysis = useRef(null)
    const calender = useRef(null)
    const screener = useRef(null)
    const [selectedState, setSelectedState] = useState('Calender')

    useEffect(() => {
        if (selectedState === 'Calender') {
            const script = document.createElement('script')
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
            script.async = true
            script.innerHTML = JSON.stringify({
                'locale': 'en',
                'width': '100%',
                'height': '700',
                'isTransparent': false,
                'importanceFilter': '-1,0,1',
                'colorTheme': theme.palette.type,
                'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
            })

            calender.current.appendChild(script)
        } else if (selectedState === 'Screener') {
            const script = document.createElement('script')
            script.async = true
            script.innerHTML = JSON.stringify({
                'locale': 'en',
                'width': '100%',
                'height': '700',
                'market': 'forex',
                'showToolbar': true,
                'defaultScreen': 'general',
                'defaultColumn': 'overview',
                'colorTheme': theme.palette.type
            })
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

            screener.current.appendChild(script)
        } else if (selectedState === 'Analysis') {
            const script = document.createElement('script')
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
            script.async = true
            script.innerHTML = JSON.stringify({
                'locale': 'en',
                'width': '100%',
                'height': '700',
                'interval': '1D',
                'isTransparent': true,
                'symbol': 'OANDA:EURUSD',
                'showIntervalTabs': true,
                'colorTheme': theme.palette.type
            })

            analysis.current.appendChild(script)
        }
    }, [selectedState])

    return (
        <div className={classes.root}>
            <ButtonGroup
                fullWidth
                size='large'
                color='primary'
                className={classes.root}>
                <Button
                    onClick={() => setSelectedState('Calender')}
                    variant={selectedState === 'Calender' ? 'contained' : 'outlined'}>Calender</Button>

                <Button
                    onClick={() => setSelectedState('Screener')}
                    variant={selectedState === 'Screener' ? 'contained' : 'outlined'}>Screener</Button>

                <Button
                    onClick={() => setSelectedState('Analysis')}
                    variant={selectedState === 'Analysis' ? 'contained' : 'outlined'}>Analysis</Button>
            </ButtonGroup>

            <Grid
                container
                spacing={7}>
                {selectedState === 'Calender'
                    ? <Grid
                        item
                        xs={12}
                        lg={12}
                        xl={12}
                        md={12}>
                        <div ref={calender} />
                    </Grid>
                    : <React.Fragment />}


                {selectedState === 'Screener'
                    ? <Grid
                        item
                        xs={12}
                        lg={12}
                        xl={12}
                        md={12}>
                        <div ref={screener} />
                    </Grid>
                    : <React.Fragment />}

                {selectedState === 'Analysis'
                    ? <Grid
                        item
                        xs={12}
                        lg={12}
                        xl={12}
                        md={12}>
                        <div ref={analysis} />
                    </Grid>
                    : <React.Fragment />}
            </Grid>
        </div>
    )
}

export default Market