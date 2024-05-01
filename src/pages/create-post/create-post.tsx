 import { CreateForm } from "./createForm"
 import "../css/form.css"

 export const CreatePost = ()=>{
    return<div className="form_container">
        <p className="createposttitle">Create new Post</p>
        <CreateForm/>
    </div>
}
