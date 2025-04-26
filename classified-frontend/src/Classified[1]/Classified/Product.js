import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { fetchProducts } from "./ProductSlice"
import { fetchCategories } from "./CategorySlice"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import { useNavigate } from "react-router-dom"
export default function Product(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {data}=useSelector((state)=>{
        return state.user
    })
    useEffect(()=>{
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    },[])
    return(
        <div className="flex justify-center items-center h-screen">
            <div  className="border p-6 rounded-[8px] shadow w-[80%] h-[80%]">
            <h2>Products comp</h2>
            <ProductList />
            <div className="mt-[5rem]"><ProductForm /> </div>
           {/* {(data&&data.role=='seller')&&( <button onClick={()=>{navigate('/product')}}>AddProduct</button>)} */}
        </div>
    </div>
    )
}