import express from 'express'
import { z } from 'zod'
import { Post } from '../model/post'

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { name, body, email } = z.object({
            name: z.string({
                message: 'Invalid name',
                required_error: 'name is required',
                invalid_type_error: 'name must be a string'
            }).min(3, 'name must be minimum of 3 charaters'),
            body: z.string({
                message: 'Invalid message',
                required_error: 'message is required',
                invalid_type_error: 'message must be a string'
            }).min(10, 'message must be minimum of 10 charaters'),
            email: z.string({
                message: 'Invalid email',
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }).email('Invalid email')
        }).parse(req.body)

        const newPost = await Post.create({
            name,
            email,
            body,
        })

        res.json({
            result: newPost
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: error.issues[0]
            })
        }
        else if (error instanceof Error) {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: error.message
                }
            })
        }
        else {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: 'Something Went wrong'
                }
            })
        }
    }
})

router.get('/find-all', async (req, res) => {
    try {
        const { email } = z.object({
            email: z.string({
                message: 'Invalid email',
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }).email('Invalid email')
        }).parse(req.query)

        const allPosts = await Post.find({
            email
        })

        res.json({
            result: allPosts
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: error.issues[0]
            })
        }
        else if (error instanceof Error) {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: error.message
                }
            })
        }
        else {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: 'Something Went wrong'
                }
            })
        }
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, name, body } = z.object({
            id: z.string({
                message: 'Invalid id',
                required_error: 'id is required',
                invalid_type_error: 'id must be a string'
            }),
            name: z.string({
                message: 'Invalid name',
                required_error: 'name is required',
                invalid_type_error: 'name must be a string'
            }).min(3, 'name must be minimum of 3 charaters'),
            body: z.string({
                message: 'Invalid message',
                required_error: 'message is required',
                invalid_type_error: 'message must be a string'
            }).min(10, 'message must be minimum of 10 charaters'),
        }).parse(req.body)

        const updatedPost = await Post.findOneAndUpdate({
            _id: id
        },
            {
                name,
                body
            })

        if (updatedPost == null) {
            res.status(404).json({
                error: {
                    message: "No post found"
                }
            })
            return
        }

        res.json({
            result: {
                message: 'Updated Successfully'
            }
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: error.issues[0]
            })
        }
        else if (error instanceof Error) {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: error.message
                }
            })
        }
        else {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: 'Something Went wrong'
                }
            })
        }
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { id } = z.object({
            id: z.string({
                message: 'Invalid id',
                required_error: 'id is required',
                invalid_type_error: 'id must be a string'
            })
        }).parse(req.query)

        const deletedPost = await Post.deleteOne({
            _id: id
        })

        res.json({
            result: deletedPost
        })
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: error.issues[0]
            })
        }
        else if (error instanceof Error) {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: error.message
                }
            })
        }
        else {
            res.status(500).json({
                error: {
                    name: 'InternalServerError',
                    message: 'Something Went wrong'
                }
            })
        }
    }
})

export default router