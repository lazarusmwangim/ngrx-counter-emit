
export interface CounterState {
    counter: number;
    channelName: string;
}

export const initialState: CounterState = {
    counter: 5,
    channelName: "My Swan"
}
