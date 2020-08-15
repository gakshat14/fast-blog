import React from 'react';
import { IUser } from '../models';
import { Link } from 'react-router-dom';

interface IProps {
    user: IUser;
}

export function UserCard({user}: IProps) {
    return(
        <>
            <div>
                <h2>{user.name}</h2>
                <p>@{user.username}</p>
            </div>
            <Link to={`/users/${user.id}`}>Visit user profile <i className="fa fa-long-arrow-right"/></Link>
        </>
    );
}