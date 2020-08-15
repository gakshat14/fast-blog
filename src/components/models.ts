interface IGeo {
    lat: string;
    lng: string;
}
export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {street: string; suite: string; city: string; zipcode: string; geo: IGeo};
    company: {name: string; catchphrase: string; bs: string};
}

export interface IApiObject<T> {
    data: T;
    isLoading: boolean;
    hasError: boolean;
}

export interface IPostContent {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPosts {
    [userId: string]:  IPostContent[];
}

export interface ICommentBody {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IComments {
    [postID: number]: ICommentBody[];
}