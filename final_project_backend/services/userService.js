import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import products from "../model/productsmodel.js";
import users from "../model/userModel.js";


export const getUsersList = async (req, res) => {
    try {
        const user = await users.findAll({

            attributes : ['username','password','name','email', 'phone_number', 'address', 'image']
        })
            res.json(user)
    } catch (error) {
        res.sendStatus(400)
    }
}



export const getUser = async (req, res) => {
    try {
        const user = await users.findOne({ 
            where: {
                username: req.header.username
            }
        });
        res.json(user);
    } catch (error) {
        res.sendStatus(404)
    };
};

export const getUserbyProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}




export const register = async(req, res) => {
    const { username, password, name, email, phone_number, address, image } = req.body
    if (username === "") return res.status(400).json({error: "Username can't be empty"});
    if (password === "") return res.status(400).json({error: "Password can't be empty"});
    if (name === "" || address=== "" || phone_number === "") return res.status(400).json({error: "Please fills all required form!"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const duplicate = await users.findAll({
        where: {
            username: req.body.username
        }
    });
    if (duplicate.length !== 0) return res.status(400).json({error: "Username already used"});
    try {
        
        await users.create({
            username: username,
            password: hashPassword,
            name: name,
            email: email,
            phone_number: phone_number,
            address: address,
            image: image,
            
        })
        res.json({msg: "Register successs"});
    } catch (error) {
        res.sendStatus(400);
    };

};




export const login = async (req, res) => {
    try {
        const user = await users.findAll({
            where: {
                username : req.body.username
            }
        });
        
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({error: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const password = user[0].password;
        const name = user[0].name;
        const email = user[0].email
        const address = user[0].address;
        const phone_number = user[0].phone_number;
        const image = user[0].image
        
       
      
        const accessToken = jwt.sign({userId,username,password,name,address,phone_number, email, image}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({userId,username,password,name,address,phone_number, email, image}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await users.update({refresh_token : refreshToken}, {
            where:{
            id : userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({error: "Username doesn't exist"});
    };
};




export const update = async (req,res) => {
    const user = await users.findOne({ 
        where: {
            username: req.header.username
        }
    });
    const params = req.params.username;
    if (params !== user.username) return res.sendStatus(404) 
    try  {
        await user.update({
          
           name: req.body.name,
           address: req.body.address,
           phone_number: req.body.phone_number
       },{
        where: {
            username: req.header.username
        }
       });
        res.json({success: "Updated"})
    }catch(error) {
        res.sendStatus(400)
    };
};




export const changePassword = async (req,res) => {
    const user = await users.findOne({ 
        where: {
            username: req.header.username
        }
    });

    const validation = await users.findAll({
        where: {
            username: req.header.username
        }
    })
    
    const password = req.body.newPassword
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    if (password === "") return res.status(400).json({msg: "Password can't be empty"});
    
    const match = await bcrypt.compare(req.body.oldPassword, validation[0].password);
    if (!match) return res.status(400).json({msg: "Wrong old password"});
    try  {
        await user.update({
           password: hashPassword
       },{
        where: {
            username: req.header.username
        }
       });
        res.clearCookie('refreshToken');
        res.send("Your password has been changed")
    }catch(error) {
        console.log(error)
    };
};







export const delAccount = async(req, res) => {
    const user = await users.findOne({
        where:{
            username: req.header.username
        }
    });
    
    const validation = await products.findOne({
        where : {
            user_id: user.id
        }
    });
    const params = req.params.username;
    if (params !== user.username) return res.sendStatus(404) 
    try {
        if (validation.user_id !== user.id) return res.sendStatus(400);
        await products.destroy({
            where: {
                user_id : user.id
            }
        });
        await user.destroy()
        res.clearCookie('refreshToken');
        res.send("account deleted")
    } catch (success) {
        await user.destroy()
        res.clearCookie('refreshToken');
        res.send("account deleted")
        
        
    };
};

export const logout = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204)
        const user = await users.findAll({
            where:{
                refresh_token : refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await users.update({refresh_token: null},{
            where: {
                id : userId
            }
        });
        res.clearCookie('refreshToken');
        return res.send("Logged out")
    } catch (error) {
        res.sendStatus(400)
        
    }
}