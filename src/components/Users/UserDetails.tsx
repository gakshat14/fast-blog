import React, { useState, useEffect, useContext } from 'react';
import { useParams, RouteComponentProps, Link } from 'react-router-dom';
import {IUser} from '../models';
import find from 'lodash/find';
import { GlobalStateContext } from '../../context/GlobalContext';
import { getApiResourceObject } from '../../utils/utils';
import { getURI } from '../../utils/fetch';
import { Error } from '../shared/Error';
import { Spinner } from '../shared/Spinner';

interface IProps {
    routerProps: RouteComponentProps;
}

const initialUserState: IUser = {
    id: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {street: '', suite: '', city: '', zipcode: '', geo: {lat: '', lng: ''}},
    company: {name: '', catchphrase: '', bs: ''},

}

export default function UserDetail(props: IProps) {
    const {id} = useParams();
    const {users} = useContext(GlobalStateContext);

    const [user, setUser] = useState(getApiResourceObject<IUser>(initialUserState));

    useEffect(() => {
        const alreadyExists = find(users.data, (o) => o.id == id);
        if(alreadyExists && !user.data.id) {
            setUser(getApiResourceObject(alreadyExists));
            return;
        }
        async function getUserDetails() {
            setUser(getApiResourceObject(initialUserState, true));
            try {
                const response: IUser = await getURI(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(getApiResourceObject(response, false));
            } catch (error) {
                setUser(getApiResourceObject(initialUserState, false, false));
            }
        }

        if(!alreadyExists && !user.data.id && !user.isLoading && !user.isLoading) {
            getUserDetails();
        }
    });

    function renderContent() {
        if(user.hasError) {
            return <Error errorMessage="We enquired an error while performing your request."/>
        }
        if(user.isLoading || users.isLoading) {
            <Spinner />;
        }
        return(
            <section className="user-section">
                <div>
                    <h2>{user.data.name}</h2>
                    <p>@{user.data.username}</p>
                    <a href={`mailto:${user.data.email}`}><i className="fa fa-envelope-o"/>&nbsp;{user.data.email}</a>
                    <a href={`tel:${user.data.phone}`}><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;{user.data.phone}</a>
                    <a href={`https://${user.data.website}`}><i className="fa fa-link"/>&nbsp;{user.data.website}</a>
                </div>
                <section className="detail-section">
                    <h2>Address</h2>
                    <address className="flex-container">
                        <div>
                            <p className="user-subheading">Suite</p>
                            <p>{user.data.address.suite}</p>
                        </div> 
                        <div>
                            <p className="user-subheading">Street</p>
                            <p>{user.data.address.street}</p>
                        </div>
                        <div>
                            <p className="user-subheading">City</p>
                            <p>{user.data.address.city}</p>
                        </div>
                    </address>
                </section>
                <section className="detail-section margin-bottom">
                    <h2>Workplace</h2>
                    <div className="flex-container">
                        <div>
                            <p className="user-subheading">Name</p>
                            <p>{user.data.company.name}</p>
                        </div>
                        <div>
                            <p className="user-subheading">Bs</p>
                            <p>{user.data.company.bs}</p>
                        </div>
                        <div>
                            <p className="user-subheading">Catch Phrase</p>
                            <p>{user.data.company.catchphrase}</p>
                        </div>
                    </div>
                </section>
                <Link className="btn" to={(location) => `${location.pathname}/posts`}>View posts</Link>
            </section>
        );
    }

    return(
        <>
            <h1 className="subheading">User</h1>
            {renderContent()}
        </>
    );
}
