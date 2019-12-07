/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, Divider, TextField, CardHeader, CardActions, CardContent } from '@material-ui/core'

import { AdminApi } from '../../../../config/Api'

const adminApi = new AdminApi()

const schema = {
    image: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    price: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    title: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    validity: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 526
        }
    }
}

const useStyles = makeStyles(theme => ({
    root: {},
    image: {
        width: 150,
        height: 150
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
}))

const NewSubscription = props => {
    const { className, ...rest } = props

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [subscriptionState, setSubscriptionState] = useState({
        errors: {},
        values: {
            image: '',
            price: '',
            title: '',
            validity: '',
            description: ''
        },
        touched: {},
        isValid: false,
        isChanged: false
    })

    useEffect(() => {
        const errors = Validate(subscriptionState.values, schema)

        setSubscriptionState(subscriptionState => ({
            ...subscriptionState,
            isValid: errors ? false : true,
            errors: errors || {}
        }))
    }, [subscriptionState.values])

    const onChange = event => {
        event.persist()

        setSubscriptionState(subscriptionState => ({
            ...subscriptionState,
            values: {
                ...subscriptionState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...subscriptionState.touched,
                [event.target.name]: true
            },
            isChanged: true
        }))
    }

    const toBase64 = file => {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => { resolve(reader.result) }
            reader.onerror = () => { return enqueueSnackbar('Error while uploading your picture, please try again', { variant: 'error' }) }
        })
    }

    const onUploadPicture = async event => {
        event.persist()

        const imageBase64 = await toBase64(event.target.files[0])

        setSubscriptionState(subscriptionState => ({
            ...subscriptionState,
            values: {
                ...subscriptionState.values,
                image: imageBase64
            }
        }))
    }

    const onSaveDetails = async () => {
        const createResult = await adminApi.createSubscriptions({
            adminId,
            image: subscriptionState.values.image,
            price: subscriptionState.values.price,
            title: subscriptionState.values.title,
            validity: subscriptionState.values.validity,
            description: subscriptionState.values.description
        })

        if (createResult.error)
            return enqueueSnackbar(createResult.message, { variant: 'error' })

        enqueueSnackbar(createResult.message, { variant: 'success' })
        window.location.reload()
    }

    const hasError = field =>
        subscriptionState.touched[field] && subscriptionState.errors[field] ? true : false

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <form
                noValidate
                autoComplete='off'>
                <CardHeader
                    title='New Subscription'
                    subheader='You can create a new subscription here' />

                <Divider />

                <CardContent>
                    <div className={classes.imageContainer}>
                        <img
                            alt='subscription'
                            className={classes.image}
                            src={subscriptionState.values.image} />
                    </div>

                    <Grid
                        container
                        spacing={3}>
                        <Grid
                            item
                            md={6}
                            xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='title'
                                label='Title'
                                margin='dense'
                                variant='outlined'
                                onChange={onChange}
                                error={hasError('title')}
                                value={subscriptionState.values.title}
                                helperText={
                                    hasError('title') ? subscriptionState.errors.title[0] : null
                                } />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                margin='dense'
                                name='description'
                                variant='outlined'
                                label='Description'
                                onChange={onChange}
                                error={hasError('description')}
                                value={subscriptionState.values.description}
                                helperText={
                                    hasError('description') ? subscriptionState.errors.description[0] : null
                                } />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='price'
                                label='Price'
                                margin='dense'
                                variant='outlined'
                                onChange={onChange}
                                error={hasError('price')}
                                InputProps={{ startAdornment: '$' }}
                                value={subscriptionState.values.price}
                                helperText={
                                    hasError('price') ? subscriptionState.errors.price[0] : null
                                } />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}>
                            <TextField
                                required
                                fullWidth
                                margin='dense'
                                name='validity'
                                label='Validity'
                                variant='outlined'
                                onChange={onChange}
                                error={hasError('validity')}
                                value={subscriptionState.values.validity}
                                helperText={
                                    hasError('validity') ? subscriptionState.errors.validity[0] : null
                                } />
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />

                <CardActions>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={onSaveDetails}
                        disabled={!subscriptionState.isChanged || hasError('image') || subscriptionState.values.image.length <= 0 || hasError('title') || subscriptionState.values.title.length <= 0 || hasError('description') || subscriptionState.values.description.length <= 0 || hasError('price') || subscriptionState.values.price.length <= 0 || hasError('validity') || subscriptionState.values.validity.length <= 0}>
                        Create Subscription
          			</Button>

                    <input
                        type='file'
                        accept='image/*'
                        id='upload-image'
                        onChange={onUploadPicture}
                        style={{ display: 'none' }} />

                    <label htmlFor='upload-image'>
                        <Button
                            variant='text'
                            color='primary'
                            component='span'
                            className={classes.uploadButton}>
                            Upload picture
					    </Button>
                    </label>
                </CardActions>
            </form>
        </Card>
    )
}

NewSubscription.propTypes = {
    className: PropTypes.string
}

export default NewSubscription