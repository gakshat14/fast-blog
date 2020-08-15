import React, { useEffect, useContext } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { GlobalStateContext, GlobalDispatchContext } from '../../context/GlobalContext';
import { getPosts } from '../../context/GlobalReducer';
import { Error } from '../shared/Error';
import { Spinner } from '../shared/Spinner';
import { Post } from './Post';

interface IProps {
    routerProps: RouteComponentProps;
}

export default function Posts(props: IProps) {
    const {id} = useParams();
    const {posts} = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);
    useEffect(() => {
        if(!posts.data[id] && !posts.isLoading && !posts.hasError) {
            getPosts(dispatch, id, posts.data);
        }
    });

    function renderContent() {
        if(posts.isLoading) {
            return(
                <Spinner />
            )
        } 

        if(posts.data[id]?.length > 0) {
            return(
                posts.data[id].map((post) => (
                    <Post key={`${post.id}_${post.userId}`} postBody={post}/>
                ))
            );
        }

        return(
            <Error errorMessage="There was an error on loading your request."/>
        );   
    }

    return(
        <>
            <h1 className="subheading">Posts</h1>
            {renderContent()}
        </>
    );
}