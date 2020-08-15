import { IApiObject, IUser, IPosts, IPostContent, IComments, ICommentBody } from "../components/models";
import { getApiResourceObject } from "../utils/utils";
import { getURI } from "../utils/fetch";

export interface IGlobalState {
    users?: IApiObject<IUser[]>;
    posts?: IApiObject<IPosts>;
    comments?: IApiObject<IComments>;
}

export enum GlobalReducerConstant {
    updateUsers = "updateUsers",
    getPosts = "getPosts",
    getComments = "getComments"
}

interface IAction {
    type: GlobalReducerConstant;
    payload: Partial<IGlobalState>;
}

export const initialGlobalState: IGlobalState = {
    users: getApiResourceObject([]),
    posts: getApiResourceObject({}),
    comments: getApiResourceObject({})
}

export function GlobalReducer(prevState: IGlobalState, action: IAction): IGlobalState {
    switch (action.type) {
        case GlobalReducerConstant.updateUsers:
            return {...prevState, users: action.payload.users};
        case GlobalReducerConstant.getPosts:
            return {...prevState, posts: action.payload.posts};
        case GlobalReducerConstant.getComments:
            return {...prevState, comments: action.payload.comments};
        default:
            return prevState;
    }
}

export async function getUsers(dispatch: React.Dispatch<IAction>) {
    dispatch({type: GlobalReducerConstant.updateUsers, payload: {users: getApiResourceObject([], true)}});
    try {
        const response: IUser[] = await getURI('https://jsonplaceholder.typicode.com/users');
        dispatch({type: GlobalReducerConstant.updateUsers, payload: {users: getApiResourceObject(response, false)}});
    } catch (error) {
        dispatch({type: GlobalReducerConstant.updateUsers, payload: {users: getApiResourceObject([], false, true)}});
    }
}

export async function getPosts(dispatch: React.Dispatch<IAction>, userId: string, existingPosts: IPosts = {}) {
    dispatch({type: GlobalReducerConstant.getPosts, payload: {posts: getApiResourceObject(existingPosts, true)}});
    try {
        const response: IPostContent[] = await getURI(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        dispatch({type: GlobalReducerConstant.getPosts, payload: {posts: getApiResourceObject({...existingPosts, [userId]: response}, false)}});
    } catch (error) {
        dispatch({type: GlobalReducerConstant.getPosts, payload: {posts: getApiResourceObject(existingPosts, false, true)}});
    }
}

export async function getComments(dispatch: React.Dispatch<IAction>, postId: number, existingComments: IComments = {}){
    dispatch({type: GlobalReducerConstant.getComments, payload: {comments: getApiResourceObject(existingComments, true)}});
    try {
        const response: ICommentBody[] = await getURI(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        dispatch({
            type: GlobalReducerConstant.getComments, 
            payload: {comments: getApiResourceObject({...existingComments, [postId]: response}, false)}
        });
    } catch (error) {
        dispatch({
            type: GlobalReducerConstant.getComments,
            payload: {comments: getApiResourceObject(existingComments, false, true)}
        });
    }
}
