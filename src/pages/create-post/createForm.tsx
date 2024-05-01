import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/form.css";

interface createFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("Title please"),
    description: yup.string().required("Can't be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: createFormData) => {
    try {
      await addDoc(postsRef, {
        ...data,
        // title:data.title,
        // description:data.description,
        userName: user?.displayName,
        userId: user?.uid,
      });
    } catch {
      console.log("Error");
    } finally {
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input className="titleinput" placeholder="Title...." {...register("title")} />
      <p className="errortitle">{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p className="errordesc">{errors.description?.message}</p>
      <input className="submit_button" type="submit" />
    </form>
  );
};
