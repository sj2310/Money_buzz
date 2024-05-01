import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { PostBox } from "./post";
import { auth} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/main.css"

export interface Post {
  id: string;
  userId: string;
  description: string;
  title: string;
  userName: string;
}

const Main = () => {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");
  const [user]= useAuthState(auth)

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-box">
     <span className="welcome">Welcome to Money Market</span> 
      <div className="post-container">
        {user ? postList && postList.map(post => (
          <PostBox key={post.id} post={post} />
        )):<p>LogIn To Continue</p>}
      </div>
    </div>
  );
  // return<>ed</>
};

export default Main;
