import { removeProduct,assigneditId } from "./ProductSlice"
import { useSelector,useDispatch } from "react-redux"
export default function ProductList(){
    const {productData}=useSelector((state)=>{
        return state.products
    })
    
    const {categoryData}=useSelector((state)=>{
        return state.categories
    })
    const dispatch=useDispatch()
    console.log(categoryData)
    const getCategoryName=(catId)=>{
        // console.log(catId)
        const catName=categoryData.find((ele)=>ele._id==catId)
        return catName?catName.name:'N/A'
        // console.log(catName.name)
    }
    return(
        <div className="flex justify-center">
            <div>
           {productData&& <h2>ProductList -{productData.length}</h2>}
           {(productData.length>0&&categoryData)&&
           <table>
            <tr>
                <th>name</th>
                <th>images</th>
                <th>price</th>
                <th>description</th>
                <th>seller</th>
                <th>category</th>
                
                {/* <th>isApproved</th> */}
                {/* <th>enquiries</th> */}
                {/* <th>interestedBuyers</th> */}
                <th>views</th>
                <th>Actions</th>
            </tr>
            {productData.map((ele)=><tr>
                <td>{ele.name}</td>
                <td>{ele.images}</td>
                <td>{ele.price}</td>
                <td>{ele.description}</td>
                <td>{ele.seller}</td>
                <td>{getCategoryName(ele.category)}</td>
                
                {/* <td>{ele.isApproved}</td> */}
                {/* <td>{ele.enquires}</td> */}
                {/* <td>{ele.interestedBuyers}</td> */}
                <td>{ele.views}</td>
                <td><button onClick={()=>{dispatch(assigneditId(ele._id))}}>Edit</button> 
                <button onClick={()=>{dispatch(removeProduct(ele._id))}}>Remove</button></td>
            </tr>)}
           </table>
}

        </div>
        </div>
    )
}