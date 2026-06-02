declare module "@gatsbyjs/reach-router" {
    export interface HistoryLocation {
        pathname: string;
        search: string;
        hash: string;
    }
    export interface HistoryListenerParameter {
        location: HistoryLocation;
    }
    export const globalHistory: {
        listen: (listener: (update: HistoryListenerParameter) => void) => () => void;
    };
}
