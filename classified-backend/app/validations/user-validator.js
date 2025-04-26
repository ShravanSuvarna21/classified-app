import User from '../models/user-model.js'
const userRegisterValidation = {
    name:{
        in: ['body'],
        exists: {
            errorMessage: 'Name field is required'
        },
        notEmpty:{
            errorMessage:'Name cannot be empty'
        }
    },
    email:{
        in:['body'],
        exists: {
            errorMessage:'Email filed is required'
        },
        notEmpty:{
            errorMessage:'Email cannot be empty'
        },
        isEmail:{
            errorMessage:'Email format not valid'
        },
        normalizeEmail: true,
        trim:true,
        custom:{
            options: async function(value){
                    try{
                    const user = await User.findOne({email:value});
                    console.log(user);
                    if(user){
                      throw new Error('User already exists')
                    }
                      }catch(error){
                        throw new Error(error)
                    }
                    return true;
            }
        }
    },
    password:{
        in:['body'],
        exists:{
            errorMessage:'password filed is required'
        },
        notEmpty:{
            errorMessage: 'Password cannot be empty'
        },
        trim:true,
        // isStrongPassword:{
        //     options:{
        //         minLowercase:1,
        //         minUppercase:1,
        //         minNumbers:1,
        //         minSymbols:1,
        //         minLength:8,
        //         maxLength:12
        //     },
        //     errorMessage: 'The password should match the criteria minmum one lower case,minimum one uppercase,minimum one symbol, minimum length 8, maximum length 12 and atleas one number'
        // }
    },
    role: {
        in: ['body'],
        isIn: {
          options: [['admin', 'seller', 'buyer']],
          errorMessage: 'Invalid role'
        },
        trim: true
      }
      
}

const userLoginValidation = {
    email:{
        in:['body'],
        exists:{
            errorMessage:'Email is filed is required'
        },
        notEmpty:{
            errorMessage:'Email filed cannot be empty'
        },
        isEmail:{
            errorMessage:'Enter valid email format'
        },
        normalizeEmail: true,
        trim:true
    },
    password:{
        in:['body'],
        exists:{
            errorMessage:'Password field is required'
        },
        notEmpty:{
            errorMessage:'Password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minUppercase:1,
                minLowercase:1,
                minSymbols:1,
                minNumbers:1,
                minLength:8,
                maxLength:12
            },
            errorMessage: 'The password should match the criteria minmum one lower case,minimum one uppercase,minimum one symbol, minimum length 8, maximum length 12 and atleas one number'
        }
    }
}

export  {userRegisterValidation,userLoginValidation};