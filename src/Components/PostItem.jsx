import React from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "./UI/Button/MyButton";

export default function (props) {
    const router = useNavigate()
    return (
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <div>{props.post.body}</div>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
                        Посмотреть
                    </MyButton>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => props.remove(props.post)}>
                        Удалить
                    </MyButton>
                </div>
            </div>
    )
}
