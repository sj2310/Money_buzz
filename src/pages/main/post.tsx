import { addDoc, collection, doc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { Post as PostInterface } from "./main";
import "../css/post.css";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";



interface Props {
  post: PostInterface;
}
interface Like{
  userId:string
  likeId:string
}

export const PostBox = (props: Props) => {
  const { post } = props;
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId ,likeId:doc.id})))
  };

  const addLike = async () => {
    try{
    const data = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
    if(user){
      setLikes((prev)=> prev?[...prev, {userId:user.uid,likeId:data.id} ] :[{userId:user.uid,likeId:data.id}])
    }
    }catch(err){
      console.log(err);
    }
  };

  const removeLike = async () => {
    try{
    const deleteQuery = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid)) ;
    const deletedetails = await getDocs(deleteQuery);
    const likeId = deletedetails.docs[0].id
    const finalLikeData = doc(db,"likes",likeId);
    await deleteDoc(finalLikeData)

    if(user){
      setLikes((prev)=> prev && prev.filter((like)=>(like.likeId!== likeId)))
    }

    }catch(err){
      console.log(err);
    }
  };

  const userLikeCheck = likes?.find((like)=>like.userId === user?.uid)

  useEffect(() => {
    getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post-box">
      <p className="username">@{post.userName}</p>
        <h4 className="title">💢 {post.title}</h4>
      <p className="description">{post.description}</p>
      <div className="button-container">
        <button
          className="like-button"
          onClick={!userLikeCheck?addLike:removeLike}
        >{userLikeCheck?"👎":"👍"}
        </button>
        <p className="like-count">❤️{likes ? likes.length : "0"}</p>
      </div>
    </div>
  );
};
