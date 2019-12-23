/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Typography, Container, Dialog, DialogContent, CircularProgress } from '@material-ui/core'

import { AdminApi } from 'config/Api'

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
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(8)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const SignIn = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [isLogged, setLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formState, setFormState] = useState({
        errors: {},
        values: {
            email: '',
            password: ''
        },
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

        setIsLoading(true)
        const signInResult = await adminApi.login({
            email: formState.values.email,
            password: formState.values.password
        })

        if (signInResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(signInResult.message, { variant: 'error' })
        }

        enqueueSnackbar(signInResult.message, { variant: 'success' })
        localStorage.setItem('adminId', signInResult.data._id)
        setLogged(true)
        setIsLoading(false)
    }

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false

    if (isLogged || adminId)
        return <Redirect to='/admin' />

    if (isLoading)
        return (
            <Dialog open={isLoading}>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        )

    return (
        <Container
            maxWidth='xs'
            component='main'>
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography
                    variant='h5'
                    component='h1'>
                    Admin Login
                </Typography>

                <form className={classes.form}>
                    <TextField
                        fullWidth
                        type='text'
                        name='email'
                        margin='normal'
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
                        margin='normal'
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

                    <FormControlLabel
                        label='Remember me'
                        control={<Checkbox
                            color='primary'
                            value='remember' />} />

                    <Button
                        fullWidth
                        size='large'
                        type='submit'
                        color='primary'
                        onClick={onSignIn}
                        variant='contained'
                        className={classes.submit}
                        disabled={!formState.isValid}>
                        Log In
					</Button>
                </form>
            </div>
        </Container>
    )
}

SignIn.propTypes = {
    history: PropTypes.object
}

export default SignIn