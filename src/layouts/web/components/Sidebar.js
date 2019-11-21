/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SignInIcon from '@material-ui/icons/Input'
import SignUpIcon from '@material-ui/icons/Assignment'

import SidebarNav from './SidebarNav'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.white
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}))

const Sidebar = props => {
    const { open, variant, onClose, className, ...rest } = props

    const classes = useStyles()

    const pages = [
        {
            title: 'Sign In',
            href: '/sign-in',
            icon: <SignInIcon />
        },
        {
            title: 'Sign Up',
            href: '/sign-up',
            icon: <SignUpIcon />
        }
    ]

    return (
        <Drawer
            open={open}
            anchor='right'
            onClose={onClose}
            variant={variant}
            classes={{ paper: classes.drawer }}>
            <div
                {...rest}
                className={clsx(classes.root, className)}>
                <SidebarNav
                    pages={pages}
                    className={classes.nav} />
            </div>
        </Drawer>
    )
}

Sidebar.propTypes = {
    onClose: PropTypes.func,
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default Sidebar