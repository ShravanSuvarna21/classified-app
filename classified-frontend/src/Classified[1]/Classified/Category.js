
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./CategorySlice"
import { useEffect } from "react";
import CategoryForm from "./CategoryForm";
import { removeCategory,assignEditId } from "./CategorySlice";

export default function Category() {
  const dispatch = useDispatch();
  const { categoryData, loading, serverError } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
// console.log(data)
  if (loading) return <p>Loading...</p>;


  return (
    <div>
      <h2>Total Categories - {categoryData.length}</h2>
     {categoryData.length > 0 && <ul>
        {categoryData.map((ele) => (
          <li key={ele.id}>{ele.name}<button onClick={()=>dispatch(assignEditId(ele._id))}>edit</button><button onClick={()=>{
            const userConfirm = window.confirm("Are You Sure")
            if(userConfirm){
              dispatch(removeCategory(ele._id))
            }
          }}>Remove</button></li> 

        ))}
      </ul> }
      <CategoryForm/>
    </div>
  );
}
