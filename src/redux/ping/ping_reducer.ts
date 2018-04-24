import { createReducer }  from '../../lib/redux_utils/reducers';
import { PingResult, PING_RESULT } from './ping_actions';

export type IPingModelState = {
    pingResult: any,
    pingError: any
};

const initialState: IPingModelState = {
    pingResult: null,
    pingError     : null
};

export let pingReducer = createReducer<IPingModelState>(initialState, [
    {
        action : PING_RESULT,
        handler: (state: IPingModelState, action: PingResult) => {
            state.pingResult = action.pingResult,
            state.pingError = action.pingError;
            return {
                ...state
            };
        }
    }
]);
