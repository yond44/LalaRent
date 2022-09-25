import users from "../model/userModel.js";
import products from "../model/productsmodel.js";


export const productsList = async (req, res) => {
    try {
        const product = await products.findAll({
            attribute: ['tipe_property', 'city', 'address', 'building_area', 'bedrooms', 'bathrooms', 'price', 'image']
        });

        res.json(product)
    } catch (error) {
        res.sendStatus(400);
        
    };
};
 
export const getProductById = async (req, res) => {
    try {
        const params = req.params.id
        const product = await products.findOne({ 
            where: {
                id: params
            }
        });
        res.json(product);
    } catch (error) {
        res.sendStatus(404)
    };
}


export const inputProduct = async (req,res) => {
    const user = await users.findOne({
        where: {
            username: req.header.username
        }
    });
    try  {
        await  products.create({
                user_id : user.id,
                tipe_property: req.body.tipe_property,
                city: req.body.city,
                address: req.body.address,
                building_area: req.body.building_area,
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description

            });
          
        res.send("Input success");
    }catch (error) {
        res.sendStatus(400);
    };
};




export const getProducts = async (req,res) => {

    try  {
        const user = await users.findOne({
            where: {
                username: req.header.username
            }
        });
        const product = await products.findAll({
            where: {
                user_id : user.id
            }
        });
        res.send(product);
    }catch(error) {
        res.sendStatus (400)
    };
};









export const updateProduct = async (req,res) => {
    const user = await users.findOne({
       where: {
           username: req.header.username
       }
   });
   
   const validation = await products.findOne({
       where: {
           id: req.body.id
       }
   });


   try {
    
        if (validation.user_id !== user.id) return res.status(404).send("Product not found");
        await products.update({  
            tipe_property: req.body.tipe_property,
            city: req.body.city,
            address: req.body.address,
            building_area: req.body.building_area,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        },{
             where: {
                 id: req.body.id
             }
            });
    
        res.json({ success: "Updated" });
        
   } catch (error) {
    return res.status(404).send("Product not found")
   };
  
}
;

export const deleteAllProducts = async(req, res) => {
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
    

    try {
        if (validation.user_id !== user.id) return res.status(404).send("Product not found");
        await products.destroy({
            where: {
                user_id : user.id
            }
        });
        
        res.send("deleted")
    } catch (error) {
        res.sendStatus(400)
        
    };
};


export const deleteProduct = async(req, res) => {
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
    const params= req.params.id

    try {
        if (validation.user_id !== user.id) return res.status(404).send("Product not found");
        await products.destroy({
            where: {
                id: params
            }
        });
        
        res.send("deleted")
    } catch (error) {
        res.sendStatus(400)
        
    };
};

