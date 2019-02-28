import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import CommentList from '../../components/CommentList'
import classes from './Story.module.css';

const Story = props => {
    const [story, setStory] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        setLoading(true)
        try {
            const storyId = props.match.params.id
            const response = await axios.get(`http://hn.algolia.com/api/v1/items/${storyId}`)

            setStory(response.data)
            setLoading(false)
        } catch (err) {
            console.error(error);
            setError(err)
            setLoading(false)
        }
    }

    return (
        <main>
            {loading && <div className='font-bold text-orange-dark'>Loading comments...</div>}

            {error && <div className={classes.error}>{error.message}</div>}

            {story ? (
                <>
                    <h1 className={classes.story_title}>
                        <a href={story.url}>{story.title}</a>
                    </h1>
                    <div className={classes.story_details}>
                        {story.points || 0} points |{' '}
                        {story.author} |{' '}
                        {moment(new Date(story.created_at)).fromNow()} |{' '}
                        {story.children.length || 0} comments
                    </div>
                    {story.children && story.children.length > 0 ? (
                        <CommentList comments={story.children} />
                    ) : (
                            <div>No comments for this story.</div>
                        )}
                </>
            )
                : null
            }
        </main>
    )
}
export default Story