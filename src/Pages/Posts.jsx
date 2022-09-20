import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../Components/UI/Button/MyButton";
import MyModal from "../Components/UI/MyModal/MyModal";
import {PostForm} from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import Loader from "../Components/UI/Loader/Loader";
import PostList from "../Components/PostList";
import Pagination from "../Components/UI/Pagination/pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../Components/UI/Select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isLoadingPosts, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    });

    useObserver(lastElement, page < totalPages, isLoadingPosts, () => {
        setPage(page + 1 );
    })

    useEffect(() => {
        fetchPosts(page, limit)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className='App'>
            <MyButton style={{marginRight: '16px'}} onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton style={{marginTop: '32px'}} onClick={() => {
                setModal(true)
            }}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Количество элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'}
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'/>
            <div ref={lastElement} style={{height: '4px', background: 'teal'}}/>

            {isLoadingPosts &&
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '80px'}}>
                    <Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Posts;
