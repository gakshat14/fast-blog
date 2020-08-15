import React, { useEffect, useContext } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from '../../context/GlobalContext';
import { getUsers } from '../../context/GlobalReducer';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Spinner } from '../shared/Spinner';
import { Error } from '../shared/Error';

interface IProps {
    routerProps: RouteComponentProps;
}

export default function User(props: IProps) {
    const {users} = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);
    useEffect(() => {
        if(users.data.length === 0 && !users.isLoading && !users.hasError) {
            getUsers(dispatch);
        }
    });

    function renderContent() {
        if(users.isLoading) {
            return(
                <Spinner />
            )
        } 

        if(users.data.length > 0) {
            return(
                <ul className="users-container">
                    {users.data.map((user) => <li key={`${user.id}`}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>)}
                </ul>
            );
        }

        return(
            <Error errorMessage="There was an error on loading your request."/>
        );
    }

    return(
        <>
            <h1 className="subheading">Users</h1>
            {renderContent()}
        </>
    )
}