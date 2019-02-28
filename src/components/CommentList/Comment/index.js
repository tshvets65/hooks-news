import React from 'react'
import moment from 'moment'

import classes from './Comment.module.css'

const Comment = ({ comment }) => (
    <div className={classes.comment}>
        <div className={classes.comment_user}>{comment.author} {moment(new Date(comment.created_at)).fromNow()}</div>
        <div className={classes.comment_content} dangerouslySetInnerHTML={{ __html: comment.text }}></div>

        {comment.children && comment.children.length > 0 && (
            <div className={classes.nested_comments}>
                {comment.children.map(nestedComment => (
                    <Comment key={nestedComment.id} comment={nestedComment} />
                ))}
            </div>
        )}
    </div>
)

export default Comment;