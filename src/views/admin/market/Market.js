/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import AnalogClock from 'react-clock'
import DigitalClock from 'react-live-clock'
import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect, useState } from 'react'
import { Grid, useTheme, Button, ButtonGroup, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    analogClock: {
        margin: 10
    }
}))

const Market = () => {
    const classes = useStyles()
    const theme = useTheme()

    const analysis = useRef(null)
    const calender = useRef(null)
    const screener = useRef(null)
    const [selectedState, setSelectedState] = useState('Clocks')
    const [clockState, setClockState] = useState({
        'New York': '',
        'London': '',
        'Tokyo': '',
        'Sydney': ''
    })

    const countryState = [
        {
            country: 'New York',
            timezone: 'America/New_York'
        },
        {
            country: 'London',
            timezone: 'Europe/London'
        },
        {
            country: 'Tokyo',
            timezone: 'Asia/Tokyo'
        },
        {
            country: 'Sydney',
            timezone: 'Australia/Sydney'
        }]

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
                    onClick={() => setSelectedState('Clocks')}
                    variant={selectedState === 'Clocks' ? 'contained' : 'outlined'}>Clocks</Button>

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

            {selectedState === 'Clocks'
                ?
                <Grid
                    container
                    spacing={7}>
                    {countryState.map((clock, i) => (
                        <Grid
                            item
                            xl={6}
                            xs={12}
                            lg={12}
                            md={12}
                            key={i}>
                            <Typography
                                variant='h6'
                                align='center'
                                display='block'>{clock.country}</Typography>

                            <div className={classes.item}>
                                <AnalogClock
                                    size={200}
                                    renderNumbers={true}
                                    className={classes.analogClock}
                                    value={clockState[clock.country]} />

                                <DigitalClock
                                    ticking={true}
                                    timezone={clock.timezone}
                                    format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
                                    onChange={({ moment }) => setClockState(clockState => ({
                                        ...clockState,
                                        [clock.country]: moment._d
                                    }))} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
                : <React.Fragment />}

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