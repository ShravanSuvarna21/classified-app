import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios"
export const fetchProducts=createAsyncThunk('products/fetchProducts',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('products')
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        rejectWithValue({
            message:err.message,
            errors:err.response.data.error
        })
    }
})

 export const createProduct=createAsyncThunk('product/createProduct',async({formData,resetForm},{rejectWithValue})=>{
      try{
        const response=await axios.post('product',formData,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        resetForm()
        return response.data
      }catch(err){
        console.log(err)
        return rejectWithValue({
          message:err.message,                      
        })
      }
    })
     export const updateProduct=createAsyncThunk('product/updateProduct',async({productObj,resetForm},{rejectWithValue})=>{
          try{
            console.log()
            const response=await axios.put(`product/${productObj._id}`,productObj,{headers:{Authorization:localStorage.getItem('token')}})
            resetForm()
            console.log(response.data)
            return response.data
          }catch(err){
            console.log(err)
            return  rejectWithValue({
              message:err.message,
              errors:err.response.data.errors
            })
          }
        })

         export const removeProduct=createAsyncThunk('product/removeProduct',async(id,{rejectWithValue})=>{
              console.log(id)
              try{
                const response=await axios.delete(`product/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return rejectWithValue({
                  message:err.message,
                  errors:err.code
                })
              }
            })
const ProductSlice=createSlice({
    name:'products',
    initialState:{productData:[],loading:false,serverErr:null,editId:null},
    reducers:{
        assigneditId:(state,action)=>{
            console.log(action.payload)
              state.editId=action.payload
            }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.productData=action.payload
            state.loading=false
            state.serverErr=null
        })

        builder.addCase(fetchProducts.pending,(state,action)=>{
            // state.serverErr=action.payload
            state.loading=true
            state.serverErr=null
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.serverErr=action.payload
            state.loading=false
        })

        builder.addCase(createProduct.fulfilled,(state,action)=>{
            // state.productData=state.productData.push(action.payload)
            state.productData.push(action.payload);
            state.loading=false
        })

        builder.addCase(createProduct.rejected,(state,action)=>{
            state.serverErr=action.payload
            state.loading=false
        })
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            const index=state.productData.findIndex((ele)=>ele._id===action.payload._id)
            state.productData[index]=action.payload
            state.serverErr=null
            state.editId=null
            state.loading=false
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
              state.serverErr=action.payload
        })

        builder.addCase(removeProduct.fulfilled,(state,action)=>{
            const index=state.productData.findIndex((ele)=>ele._id===action.payload)
            state.productData.splice(index,1)
        })

        builder.addCase(removeProduct.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(removeProduct.rejected,(state,action)=>{
            state.serverErr=action.payload
        })                
    }
})
export const {assigneditId}=ProductSlice.actions
export default ProductSlice.reducer