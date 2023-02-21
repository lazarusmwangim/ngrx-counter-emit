export interface Post {
    id?: number;
    title: string;
    description: string;
}

export interface PostsState {
    posts: Post[];
}

export const initialState: PostsState = {
    posts: [
        {
            id: 1,
            title: "Title 1",
            description: "Description of title 1"
        },
        {
            id: 2,
            title: "Title 2",
            description: "Description of title 2"
        },
        {
            id: 3,
            title: "Title 3",
            description: "Description of title 3"
        }
    ]
}