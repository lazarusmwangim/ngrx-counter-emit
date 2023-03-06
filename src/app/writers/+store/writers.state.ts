export interface Writer {
    id?: number;
    name: string;
    phone: string;
}

export interface WritersState {
    writers: Writer[],
}

export const initialWritersState: WritersState = {
    // writers: [], 
    writers: [
        {
            id: 1,
            name: "Writer 1",
            phone: "Phone 1"
        },
        {
            id: 2,
            name: "Writer 2",
            phone: "Phone 2"
        },
        {
            id: 3,
            name: "Writer 3",
            phone: "Phone 3"
        }
    ]
}