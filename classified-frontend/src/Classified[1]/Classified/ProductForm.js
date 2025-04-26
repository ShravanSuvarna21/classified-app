import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { createProduct,updateProduct } from "./ProductSlice"
export default function ProductForm(){
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [image,setImage]=useState('')
    const [description,setDescription]=useState('')
    // const [seller,setSeller]=useState('')
    const [category,setCategory]=useState('')
    const [clientErrors,setClientErrors]=useState({})
    // const [views,setViews]=useState(0)
    // const [interestedBuyers,setInterestedBuyers]=useState([])
    const {categoryData}=useSelector((state)=>{
        return state.categories
    })
    const {editId,productData}=useSelector((state)=>{
        return state.products
    })
    useEffect(()=>{
        if(editId){
            const existProduct=productData.find((ele)=>ele._id==editId)
            setName(existProduct.name)
            setPrice(existProduct.price)
            setImage(existProduct.images)
            setDescription(existProduct.description)
            setCategory(existProduct.category)
        }
    },[editId])
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const errors={}
        const resetForm=()=>{
            setName('')
            setPrice('')
            setImage('')
            setDescription('')
            setCategory('')
        }
        if(name.trim().length==0&&name.trim().length<3){
            errors.name='Name is required and length should be > 3'
        }
        if(toString(price).trim().length==0){
            errors.price='Price is required'
        }
        if(description.trim().length==0&&description.trim().length<3){
            errors.description='description is required and length should be > 3'
        }
        if(category.trim().length==0){
            errors.category='category is required'
        }
        if(Object.keys(errors).length>0){
            setClientErrors(errors)
        }else{
            if(editId){
                const existProduct=productData.find((ele)=>ele._id==editId)
                const productObj={...existProduct,name:name,description:description,images:image,price:price,category:category}
                dispatch(updateProduct({productObj,resetForm}))
            }else{
                const formData={
                    name,price,description,images:image,category
                }
                console.log(formData)
                dispatch(createProduct({formData,resetForm}))
            }
           
        }
       
    }
    return(
        <div className="flex justify-center items-center">
            <div>
            <h3>{editId?'Edit':'Add'} Product</h3>
           {categoryData&& <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter ProductName:</label> <br />
                <input type="text" value={name} onChange={e=>setName(e.target.value) } placeholder="Enter Name" id="name"/> <br />
                <label htmlFor="price">Enter Price:</label> <br />
                <input type="text" value={price} onChange={e=>setPrice(e.target.value) } placeholder="Enter Price" id="price"/> <br />
                <label htmlFor="image">Provide image:</label> <br />
                <input type="text" value={image} onChange={e=>setImage(e.target.value) } placeholder="Enter " id="image"/> <br />
                <label htmlFor="description">Enter description:</label> <br />
                <textarea value={description} onChange={e=>setDescription(e.target.value) } placeholder="Enter description" id="description"/> <br />
                <label htmlFor="category">Select Category:</label> <br />
                <select value={category} onChange={e=>setCategory(e.target.value)} id='category'>
                    <option value=''>selectCategory</option>
                    {categoryData.map((ele)=><option value={ele._id}>{ele.name}</option>)}
                </select><br />
                <button>Submit</button>
                {/* <label>selectSeller:</label><br/> */}
                {/* <select value={seller} onChange={e=>setSeller(e.target.value)} id='category'>
                    <option value=''>selectSeller</option>
                    {categoryData.map((ele)=><option value={ele._id}>{ele.name}</option>)}
                </select> */}
                
            </form>
}
        </div>
        </div>
    )
}