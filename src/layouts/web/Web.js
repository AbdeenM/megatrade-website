/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'

import Footer from './components/Footer'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        paddingTop: 56,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    content: {
        height: '100%'
    }
}))

const Main = props => {
    const { children } = props

    const classes = useStyles()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    })

    const [openSidebar, setOpenSidebar] = useState(false)

    const onSidebarOpen = () => {
        setOpenSidebar(true)
    }

    const onSidebarClose = () => {
        setOpenSidebar(false)
    }

    const shouldOpenSidebar = isDesktop ? false : openSidebar

    return (
        <div
            className={clsx({
                [classes.root]: true
            })}>
            <Topbar onSidebarOpen={onSidebarOpen} />

            <Sidebar
                open={shouldOpenSidebar}
                onClose={onSidebarClose}
                variant={isDesktop ? 'persistent' : 'temporary'} />

            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main