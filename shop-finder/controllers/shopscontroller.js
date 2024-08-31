const Shop = require('../models/shops');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'tomato';

exports.getAllShops = (req, res) => {
    Shop.getAll((err, results) => {
        if (err) return res.status(500).send("Error getting Shops");
        res.status(200).json(results);
    });
};
exports.createShop = (req, res) => {
    const newShop = req.body;
    Shop.createShop(newShop, (err, result) => {
        if (err) return res.status(500).send('Error creating Shop');
        res.status(201).json({ message: 'Shop added successfully', shop: { id: result.insertId, ...newShop } });
    });
};
exports.getShopById = (req, res) => {
    const Shop_id = req.params.id;  
    Shop.getShopById(Shop_id, (err, result) => {
        if (err) return res.status(500).send(  err.message );
        if (result.length === 0) return res.status(404).send('Shop not found!');
        res.status(200).json(result[0]);
    });
};


exports.updateShop = (req, res) => {
    const Shop_id = req.params.id;
    const updatedShop = req.body;

    Shop.updateShop(Shop_id, updatedShop, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json( { message :'Shop not found'} );
        }

        res.status(200).json({ message:'Shop updated successfully' });
    });
};

exports.deleteShop = (req, res) => {
    const Shop_id = req.params.id;  
    Shop.deleteShop(Shop_id, (err,result) => {
        if (err) return res.status(500).send( {message:"error in finding shop"} );

        if(result.affectedRows===0){
            return res.status(404).send({messag:'Shop not found'});
        }
        res.status(200).json({message:'Shop deleted successfully'} );
    });
};


exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    Shop.findByUsername(username, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
            }

            Shop.create(username, hash, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error inserting user' });
                }
                res.json({ message: 'User registered successfully' });
            });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    Shop.findByUsername(username, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (match) {

               const token= jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: '1h' });
                res.json({message:'Login successful',token});

            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    });
}

//  exports.getshopbylocation = (req, res) => {
//     const location = req.query.location;

//     if (location) {
//         Shop.searchShopsByLocation(location, (err, shops) => {
//             if (err) {
//                 console.error('Error fetching shops:', err);
//                 res.status(500).json({ message: 'Error fetching shops' });
//             } else {
//                 res.json(shops);
//             }
//         });
//     } else {
//         res.status(400).json({ message: 'Location query parameter is required' });
//     }
// };

exports.searchShops = (req, res) => {
    const searchTerm = req.query.term ;
    const searchBy = req.query.searchBy || 'location'; // Default to location

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    Shop.searchShops(searchTerm, searchBy, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
};

