
const productValidation = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'Name field is required'
        },
        notEmpty:{
            errorMessage:'Name cannot be empty'
        },
    },
    price:{
        in:['body'],
        exists:{
            errorMessage:'Name field is required'
        },
        notEmpty:{
            errorMessage:'Name cannot be empty' 
        }
    },
    description:{
        in:['body'],
        exists:{
            errorMessage:'Name field is required'
        },
        notEmpty:{
            errorMessage:'Name cannot be empty' 
        }
    },
     category:{
        in:['body'],
        exists:{
            errorMessage:'Name field is required'
        },
        notEmpty:{
            errorMessage:'Name cannot be empty' 
        }
     }
    // seller:{
    //     in:['body'],
    //     exists:{
    //         errorMessage:'Name field is required'
    //     },
    //     notEmpty:{
    //         errorMessage:'Name cannot be empty' 
    //     }
   // }
    // },
    // isApproved:{
    //     in:['body'],
    //     exists:{
    //         errorMessage:'Name field is required'
    //     },
    //     notEmpty:{
    //         errorMessage:'Name cannot be empty' 
    //     }
    // }

}

export default productValidation;