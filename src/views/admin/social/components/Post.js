import clsx from 'clsx'
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Card, Button, Divider, TextField, CardHeader, CardContent, CardActions, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { MiscellaneousApi } from 'config/Api'

const miscellaneousApi = new MiscellaneousApi()

const schema = {
    post: {
        presence: { allowEmpty: false, message: 'is required' }
    }
}

const useStyles = makeStyles(theme => ({
    root: {},
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}))

const Post = props => {
    const { className, ...rest } = props

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [isLoading, setIsLoading] = useState(false)
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

        setPostState(postState => ({
            ...postState,
            values: {
                ...postState.values,
                image: imageBase64
            },
            isChanged: true
        }))
    }

    const onPostToSocialMedia = async () => {
        setIsLoading(true)
        const twitterPostResult = await miscellaneousApi.twitterPost({
            adminId,
            post: postState.values.post,
            image: postState.values.image
        })

        if (twitterPostResult.error) {
            setIsLoading(false)
            enqueueSnackbar(twitterPostResult.message, { variant: 'error' })
        }
        else {
            setIsLoading(false)
            enqueueSnackbar(twitterPostResult.message, { variant: 'success' })
        }
    }

    const hasError = field =>
        postState.touched[field] && postState.errors[field] ? true : false

    if (isLoading)
        return (
            <Dialog open={isLoading}>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        )

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <form>
                <CardHeader
                    title='Post'
                    subheader='Post to our facebook, twitter and instagram social accounts' />

                <Divider />

                {
                    postState.values.image.length > 1
                        ? <div className={classes.imageContainer}>
                            <img
                                alt='post'
                                src={postState.values.image} />
                        </div> :
                        <div />
                }

                <CardContent>
                    <TextField
                        required
                        fullWidth
                        multiline
                        name='post'
                        label='Post'
                        margin='normal'
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
                            component='span'>
                            UPLOAD POST PICUTRE
						</Button>
                    </label>

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