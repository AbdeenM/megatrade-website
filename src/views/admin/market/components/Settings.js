/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

const theme = localStorage.getItem('theme') || 'light'

export const dataCalender = {
    'locale': 'en',
    'width': '100%',
    'height': '900',
    'colorTheme': theme,
    'isTransparent': false,
    'importanceFilter': '-1,0,1',
    'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
}

export const dataScreener = {
    'locale': 'en',
    'width': '100%',
    'height': '900',
    'market': 'forex',
    'showToolbar': true,
    'colorTheme': theme,
    'defaultScreen': 'general',
    'defaultColumn': 'overview'
}

export const dataAnalysis = {
    'locale': 'en',
    'width': '100%',
    'height': '600',
    'interval': '1D',
    'colorTheme': theme,
    'isTransparent': true,
    'symbol': 'OANDA:EURUSD',
    'showIntervalTabs': true
}