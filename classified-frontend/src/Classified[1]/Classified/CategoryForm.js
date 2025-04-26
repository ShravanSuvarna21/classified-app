import { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { addCategory,updateCategory } from "./CategorySlice"; 

export default function CategoryForm(){
   const [name,setName ]= useState("");
   const {editId,categoryData} = useSelector((state)=>{
       return state.categories;
   })
   const dispatch = useDispatch()
   useEffect(()=>{
    if(editId){
        const category = categoryData.find(ele=>ele._id === editId);
        setName(category.name)

    }
   },[categoryData,editId])
   const handleSubmit= (e)=>{
       e.preventDefault();
    //    const formData ={
    //        name:name
    //    }
       const resetForm= 
           ()=>{
            setName("")

           }
           if(editId){
            const category = categoryData.find(ele=>ele._id===editId);
            const categoryObj = {...category,name:name};
            dispatch(updateCategory({categoryObj,resetForm}))

           }else{
            const formData={
                name:name

            }
            dispatch(addCategory({formData,resetForm}))
       setName("")
           }
       
       
   }

   return(
       <div>
           <h2>Add Category</h2>
           {/* {Object.keys(serverErr) && <>
           <ul>
               {serverErr.errors.map((err,i)=>{
                   <li key={i}>
                       {err.msg}
                   </li>
               } )}
           </ul>
           </>
           } */}

           <form onSubmit={handleSubmit}>
               Name: <br/>
               <input type="text" value={name} onChange={(e)=>setName(e.target.value) }/>
               <div>
                   <input type="submit" />
               </div>

           </form>
       </div>
   )


}  