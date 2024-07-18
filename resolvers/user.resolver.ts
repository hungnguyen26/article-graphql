import User from "../model/users.model";
import md5 from "md5";
import {generateRandomString} from "../helpers/generate"

export const resolversUser = {
    
    Mutation: {
        registerUser: async (_, args)=>{
            const  { user } = args;

            const emailExist = await User.findOne({
                email: user.email,
                deleted:false
            })  

            if(emailExist){
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }else{
                user.password = md5(user.password);
                user.token = generateRandomString(30);

                const newUser = new User(user);
                const data = await newUser.save();

                return {
                    code: 200,
                    message: "Thành công!",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }

        },

        loginUser: async (_, args)=>{
            const  { email, password } = args.user;

            const infoUser = await User.findOne({
                email: email,
                deleted:false
            })  

            if(infoUser){
                return {
                    code: 400,
                    message: "Email không tồn tại!"
                };
            }
            if(md5(password) !== infoUser.password){
                return {
                    code: 400,
                    message: "Sai mật khẩu!",  
                }
            }
            return {
                code: 200,
                message: "Thành công!",
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            };
        },
    }
  };
