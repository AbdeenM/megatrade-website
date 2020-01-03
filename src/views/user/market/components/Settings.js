/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

const theme = localStorage.getItem('theme') || 'light'

export const dataTickers = {
    'locale': 'en',
    'colorTheme': theme,
    'isTransparent': false,
    'symbols': [
        {
            'proName': 'OANDA:SPX500USD',
            'title': 'S&P 500'
        },
        {
            'proName': 'FX_IDC:EURUSD',
            'title': 'EUR/USD'
        },
        {
            'proName': 'BITSTAMP:BTCUSD',
            'title': 'BTC/USD'
        },
        {
            'description': 'Germany 30',
            'proName': 'OANDA:DE30EUR'
        },
        {
            'description': 'Wall Street',
            'proName': 'OANDA:US30USD'
        },
        {
            'description': 'GBP/USD',
            'proName': 'OANDA:GBPUSD'
        },
        {
            'description': 'XAU/USD',
            'proName': 'OANDA:XAUUSD'
        }
    ]
}

export const dataCalender = {
    'height': 600,
    'locale': 'en',
    'width': '100%',
    'colorTheme': theme,
    'isTransparent': false,
    'importanceFilter': '-1,0,1',
    'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
}

export const dataAnalysis = {
    'style': '1',
    'height': 600,
    'locale': 'en',
    'width': '980',
    'interval': 'D',
    'colorTheme': theme,
    'timezone': 'Etc/UTC',
    'toolbar_bg': '#f1f3f6',
    'symbol': 'FX_IDC:USDEUR',
    'enable_publishing': false,
    'allow_symbol_change': true,
    'container_id': 'tradingview_97fe0'
}

export const dataOverview = {
    'height': 600,
    'locale': 'en',
    'width': '100%',
    'showChart': true,
    'dateRange': '12m',
    'largeChartUrl': '',
    'colorTheme': theme,
    'isTransparent': false,
    'gridLineColor': 'rgba(233, 233, 234, 1)',
    'scaleFontColor': 'rgba(120, 123, 134, 1)',
    'symbolActiveColor': 'rgba(33, 150, 243, 0.12)',
    'plotLineColorGrowing': 'rgba(33, 150, 243, 1)',
    'plotLineColorFalling': 'rgba(33, 150, 243, 1)',
    'belowLineFillColorGrowing': 'rgba(33, 150, 243, 0.12)',
    'belowLineFillColorFalling': 'rgba(33, 150, 243, 0.12)',
    'tabs': [
        {
            'title': 'Indices',
            'originalTitle': 'Indices',
            'symbols': [
                {
                    's': 'OANDA:SPX500USD',
                    'd': 'S&P 500'
                },
                {
                    's': 'OANDA:NAS100USD',
                    'd': 'Nasdaq 100'
                },
                {
                    's': 'FOREXCOM:DJI',
                    'd': 'Dow 30'
                },
                {
                    's': 'INDEX:NKY',
                    'd': 'Nikkei 225'
                },
                {
                    's': 'INDEX:DEU30',
                    'd': 'DAX Index'
                },
                {
                    's': 'OANDA:UK100GBP',
                    'd': 'FTSE 100'
                },
                {
                    's': 'XETR:DAX',
                    'd': 'Germany 30'
                },
                {
                    's': 'OANDA:FR40EUR',
                    'd': 'France 40'
                },
                {
                    's': 'FOREXCOM:EU50',
                    'd': 'EU STOCKS 50'
                }
            ]
        },
        {
            'title': 'Commodities',
            'originalTitle': 'Commodities',
            'symbols': [
                {
                    's': 'CME_MINI:ES1!',
                    'd': 'E-Mini S&P'
                },
                {
                    's': 'COMEX:GC1!',
                    'd': 'Gold'
                },
                {
                    's': 'NYMEX:CL1!',
                    'd': 'Crude Oil'
                },
                {
                    's': 'NYMEX:NG1!',
                    'd': 'Natural Gas'
                },
                {
                    's': 'CBOT:ZC1!',
                    'd': 'Corn'
                },
                {
                    's': 'OANDA:XAGUSD',
                    'd': 'Silver'
                },
                {
                    's': 'TVC:PLATINUM',
                    'd': 'Platinum'
                },
                {
                    's': 'TVC:PALLADIUM',
                    'd': 'Palladium'
                }
            ]
        },
        {
            'title': 'Bonds',
            'originalTitle': 'Bonds',
            'symbols': [
                {
                    's': 'CME:GE1!',
                    'd': 'Euro Dollar'
                },
                {
                    's': 'CBOT:ZB1!',
                    'd': 'T-Bond'
                },
                {
                    's': 'CBOT:UB1!',
                    'd': 'Ultra T-Bond'
                },
                {
                    's': 'EUREX:FGBL1!',
                    'd': 'Euro Bund'
                },
                {
                    's': 'EUREX:FBTP1!',
                    'd': 'Euro BTP'
                },
                {
                    's': 'EUREX:FGBM1!',
                    'd': 'Euro BOBL'
                }
            ]
        },
        {
            'title': 'Forex',
            'originalTitle': 'Forex',
            'symbols': [
                {
                    's': 'FX:EURUSD'
                },
                {
                    's': 'FX:GBPUSD'
                },
                {
                    's': 'FX:USDJPY'
                },
                {
                    's': 'FX:USDCHF'
                },
                {
                    's': 'FX:AUDUSD'
                },
                {
                    's': 'FX:USDCAD'
                },
                {
                    's': 'OANDA:GBPJPY',
                    'd': 'GBP/JPY'
                },
                {
                    's': 'OANDA:EURGBP',
                    'd': 'EUR/GBP'
                },
                {
                    's': 'OANDA:GBPAUD',
                    'd': 'GBP/AUD'
                },
                {
                    's': 'OANDA:EURJPY',
                    'd': 'EUR/JPY'
                },
                {
                    's': 'TVC:DXY',
                    'd': 'DXY'
                }
            ]
        },
        {
            'title': 'Crypto',
            'symbols': [
                {
                    's': 'BITSTAMP:BTCUSD',
                    'd': 'BTC/USD'
                },
                {
                    's': 'BITSTAMP:XRPUSD',
                    'd': 'XRP/USD'
                },
                {
                    's': 'BITSTAMP:ETHUSD',
                    'd': 'ETH/USD'
                },
                {
                    's': 'BITSTAMP:LTCUSD',
                    'd': 'LTC/USD'
                }
            ]
        }
    ]
}

export const dataHeatMap = {
    'height': 600,
    'locale': 'en',
    'width': '100%',
    'colorTheme': theme,
    'currencies': [
        'EUR',
        'USD',
        'JPY',
        'GBP',
        'CHF',
        'AUD',
        'CAD',
        'NZD',
        'CNY'
    ]
}

export const dataForexRates = {
    'height': 600,
    'locale': 'en',
    'width': '100%',
    'colorTheme': theme,
    'currencies': [
        'EUR',
        'USD',
        'JPY',
        'GBP',
        'CHF',
        'AUD',
        'CAD',
        'NZD',
        'CNY'
    ]
}

export const dataScreener = {
    'height': 600,
    'locale': 'en',
    'width': '100%',
    'colorTheme': theme,
    'displayCurrency': 'USD',
    'defaultColumn': 'overview',
    'screener_type': 'crypto_mkt'
}
