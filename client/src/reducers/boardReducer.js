const boardReducer = (state = { boards: [], loading: false, boardDetails:null, error: false,updating:false, uploading:false,deleting:false,addingPost:false,removingPost:false }, action) => {
    switch (action.type) {
        // Board upload actions
        case "BOARD_UPLOAD_START":
            return { ...state, error: false, uploading: true };
        case "BOARD_UPLOAD_SUCCESS":
            return {
                ...state,
                boards: [action.payload, ...state.boards],
                uploading: false,
                error: false
            };
        case "BOARD_UPLOAD_FAIL":
            return { ...state, uploading: false, error: true };

        case "UPDATE_BOARD_START":
            return {...state, updating:true, error:false};
            case "UPDATE_BOARD_SUCCESS":
                const modifiedBoards = state.boards.map(board =>
                    board._id === action.payload._id ? action.payload : board
                );
                console.log(action.payload);
                return {
                    ...state,
                    boards: modifiedBoards,
                    loading: false,
                    error: false,
                    
                    currentBoard: state.currentBoard?._id === action.payload._id ? action.payload : state.currentBoard
                };
        case "UPDATE_BOARD_FAIL":
            return {...state, updating: false, error: true}
        
        // Board deletion actions
        case "BOARD_DELETE_START":
            return {
                ...state,
                deleting: true,
                error: null,
            };
        case "BOARD_DELETE_SUCCESS":
            const updatedBoards = state.boards.filter(board => board._id !== action.payload);
            return {
                ...state,
                boards: updatedBoards,
                deleting: false,
            };
        case "BOARD_DELETE_FAIL":
            return {
                ...state,
                deleting: false,
                error: action.payload,
            }; 
        // Board retrieval actions
        case "BOARD_RETRIEVING_START":
            return { ...state, loading: true, error: false };
        case "BOARD_RETRIEVING_SUCCESS":
            console.log("Board payload: ", action.payload);
            return { ...state, boards: action.payload, loading: false, error: false }; 
        case "BOARD_RETRIEVING_FAIL":
            return { ...state, loading: false, error: true };

        //Retrieve single Board
        case "SINGLE_BOARD_RETRIEVING_START":
            return {...state, loading:true, error:false};
            case "SINGLE_BOARD_RETRIEVING_SUCCESS":
                console.log("Payload received: ", action.payload); 
                return {
                    ...state,
                    boardDetails: action.payload, 
                    loading: false,
                    error: false
                };
        case "SINGLE_BOARD_RETRIEVING_FAIL":
            return {...state, loading:false, error:true};

        // Add post to board actions
        case "ADD_POST_TO_BOARD_REQUEST":
            return { ...state, addingPost: true, error: false };
        case "ADD_POST_TO_BOARD_SUCCESS":
            const {boardIdAdd, postIdAdd} = action.payload;
            //Find the board andd add post
            const addPost = state.boards.map(board => {
             if (board._id == boardIdAdd){
                const newPost = {_id: postIdAdd
                
                }
                return{
                    ...board,
                    posts: [...board.posts, newPost],
                }
             }
             return board
            })
            return { ...state, addingPost: false, error: false };
        case "ADD_POST_TO_BOARD_FAILURE":
            return { ...state, addingPost: false, error: true };

        // Remove post from board actions
        case "REMOVE_POST_FROM_BOARD_REQUEST":
            return { ...state, removingPost: true, error: false };
        case "REMOVE_POST_FROM_BOARD_SUCCESS":
            const { boardId, postId } = action.payload;
            // Find the board and remove the post from it
            const removedPost = state.boards.map(board => {
                if (board._id === boardId) {
                    // Remove the post from this board
                    return {
                        ...board,
                        posts: board.posts.filter(post => post._id !== postId),
                    };
                }
                return board;
            });
            return {
                ...state,
                removingPost: false,
                boards: removedPost,
            };
        case "REMOVE_POST_FROM_BOARD_FAILURE":
            return { ...state, removingPost: false, error: true };
        default:
            return state;
    }
}

export default boardReducer;
