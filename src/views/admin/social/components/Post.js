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
import { Card, Button, Divider, TextField, CardHeader, CardContent, CardActions } from '@material-ui/core'

import { MiscellaneousApi } from '../../../../config/Api'

const miscellaneousApi = new MiscellaneousApi()

const schema = {
    post: {
        presence: { allowEmpty: false, message: 'is required' }
    }
}

const useStyles = makeStyles(() => ({
    root: {}
}))

const Post = props => {
    const { className, ...rest } = props

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const [postState, setPostState] = useState({
        errors: {},
        values: {
            image: '',
            post: ''
        },
        touched: {},
        isValid: false,
        isChanged: false
    })

    useEffect(() => {
        const errors = Validate(postState.values, schema)

        setPostState(postState => ({
            ...postState,
            isValid: errors ? false : true,
            errors: errors || {}
        }))
    }, [postState.values])

    const onChange = event => {
        event.persist()

        setPostState(postState => ({
            ...postState,
            values: {
                ...postState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...postState.touched,
                [event.target.name]: true
            },
            isChanged: true
        }))
    }

    const onPostToSocialMedia = async () => {

        window.location.reload()
    }

    const hasError = field =>
        postState.touched[field] && postState.errors[field] ? true : false

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <form>
                <CardHeader
                    title='Post'
                    subheader='Post to our facebook, twitter and instagram social accounts' />

                <Divider />

                <CardContent>
                    <TextField
                        required
                        fullWidth
                        multiline
                        name='post'
                        label='Post'
                        margin='dense'
                        variant='outlined'
                        onChange={onChange}
                        error={hasError('post')}
                        value={postState.values.post}
                        helperText={
                            hasError('post') ? postState.errors.post[0] : null
                        } />
                </CardContent>

                <Divider />

                <CardActions>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={onPostToSocialMedia}
                        disabled={postState.values.post.length <= 3}>
                        POST TO SOCIAL MEDIA
          			</Button>
                </CardActions>
            </form>
        </Card>
    )
}

Post.propTypes = {
    className: PropTypes.string
}

export default Post