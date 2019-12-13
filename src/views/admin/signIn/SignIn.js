/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import Validate from 'validate.js'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { withRouter, Redirect } from 'react-router-dom'
import {
    Grid,
    Button,
    TextField,
    Typography
} from '@material-ui/core'

import { AdminApi } from '../../../config/Api'

const adminApi = new AdminApi()

const schema = {
    email: {
        email: true,
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        backgroundColor: theme.palette.background.default
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBototm: theme.spacing(2)
    },
    imageContainer: {
        width: 150,
        height: 150,
        display: 'flex',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        border: `1px solid ${theme.palette.divider}`
    },
    image: {
        width: 150,
        height: 150
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        flexBasis: 700,
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}))

const SignIn = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [isLogged, setLogged] = useState(false)

    const [formState, setFormState] = useState({
        errors: {},
        values: {},
        touched: {},
        isValid: false,
        showPassword: false
    })

    useEffect(() => {
        const errors = Validate(formState.values, schema)

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }))
    }, [formState.values])

    const onShowPassword = () => {
        setFormState({
            ...formState,
            showPassword: !formState.showPassword
        })
    }

    const onChange = event => {
        event.persist()

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }))
    }

    const onSignIn = async event => {
        event.preventDefault()

        const signInResult = await adminApi.login({
            email: formState.values.email,
            password: formState.values.password
        })

        if (signInResult.error)
            return enqueueSnackbar(signInResult.message, { variant: 'error' })

        enqueueSnackbar(signInResult.message, { variant: 'success' })
        localStorage.setItem('adminId', signInResult.data._id)
        setLogged(true)
    }

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false

    if (isLogged || adminId)
        return <Redirect to='/admin/dashboard' />

    return (
        <div className={classes.root}>
            <Grid
                container
                className={classes.content}>
                <div className={classes.contentHeader}>
                    <Typography
                        variant='h1'
                        className={classes.title}>
                        ADMIN LOG IN
                    </Typography>
                </div>

                <div className={classes.imageContainer}>
                    <img
                        alt='logo'
                        className={classes.image}
                        src='/images/logo-512.png' />
                </div>

                <div className={classes.contentBody}>
                    <form
                        onSubmit={onSignIn}
                        className={classes.form}>
                        <TextField
                            fullWidth
                            type='text'
                            name='email'
                            variant='outlined'
                            onChange={onChange}
                            label='Email address'
                            error={hasError('email')}
                            className={classes.textField}
                            value={formState.values.email || ''}
                            helperText={
                                hasError('email') ? formState.errors.email[0] : null
                            } />

                        <TextField
                            fullWidth
                            name='password'
                            label='Password'
                            variant='outlined'
                            onChange={onChange}
                            error={hasError('password')}
                            className={classes.textField}
                            value={formState.values.password || ''}
                            type={formState.showPassword ? 'text' : 'password'}
                            helperText={
                                hasError('password') ? formState.errors.password[0] : null
                            }
                            InputProps={{
                                endAdornment: formState.showPassword
                                    ? <VisibilityOff
                                        onClick={onShowPassword} />
                                    : <Visibility
                                        onClick={onShowPassword} />
                            }} />

                        <Button
                            fullWidth
                            size='large'
                            type='submit'
                            color='primary'
                            variant='contained'
                            disabled={!formState.isValid}
                            className={classes.signInButton}>
                            Log In
                        </Button>
                    </form>
                </div>
            </Grid>
        </div>
    )
}

SignIn.propTypes = {
    history: PropTypes.object
}

export default withRouter(SignIn)