import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

import classes from './StoryList.module.css'

const StoryList = ({ stories }) => (
    <div className={classes.story_list}>
        {stories.map(story => (
            story.title ? (
                <div className={classes.story} key={story.objectID}>
                    <h2 className={classes.story_title}>
                        <a href={story.url}>{story.title}</a>
                    </h2>

                    <div className={classes.story_details}>
                        {story.points || 0} points |{' '}
                        {story.author} |{' '}
                        {moment(new Date(story.created_at)).fromNow()} |{' '}
                        <Link to={`/story/${story.objectID}`}>{story.num_comments || 0} comments</Link>
                    </div>
                </div>
            )
                : null
        ))}
    </div>
);

export default withRouter(StoryList)
