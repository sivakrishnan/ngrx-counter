import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { CounterState } from "../counter/state/counter.state";
import { PostsState } from "../posts/state/posts.state";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";
import { SharedState } from "./Shared/shared.state";

export interface AppState {
    // counter: CounterState;
    // posts: PostsState;
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
}