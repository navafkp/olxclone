import { createContext, useState } from "react";

export const PostDetails = createContext(null)


 function Post({children}) {
    const [postData, setPostDate] = useState()

    return (
    <PostDetails.Provider value={{postData, setPostDate}}>
        {children}
    </PostDetails.Provider>

    )

}

export default Post;