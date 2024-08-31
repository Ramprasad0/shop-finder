const mysql = require('mysql2');
const Config = require('../config/config');


const db = mysql.createConnection({
    host: Config.host,
    user: Config.user,
    password: Config.password,
    database: Config.database
});



db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


exports.findByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

exports.create = (username, hash, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], callback);
};

exports.getAll = (callback) => {
    db.query('SELECT * FROM shops', callback);
};

exports.createShop=(shopdata,callback)=>{
    const {name,location,contact_number,opening_hours,branches,owner_name,website,description,rating,img_url}=shopdata;
    const query='INSERT INTO shops (name,location,contact_number,opening_hours,branches,owner_name,website,description,rating,img_url) VALUES (?,?,?,?,?,?,?,?,?,?)';
    db.query(query,[name,location,contact_number,opening_hours,branches,owner_name,website,description,rating,img_url],callback);
}

exports.getShopById=(shopid,callback)=>{
    db.query('SELECT * FROM shops WHERE id= ?',[shopid],callback);
}

// exports.updateShop=(shopid,shopdata,callback)=>{
//     const {name,location,contact_number,opening_hours,branches,owner_name,website,description,rating,img_url}=shopdata;
//     const query='UPDATE shops SET name=? , location=? , contact_number=? , opening_hours=? , branches=? , owner_name=? , website=? , description=? , rating=?,img_url=? WHERE id=? ';
//     db.query(query,[name,location,contact_number,opening_hours,branches,owner_name,website,description,rating,img_url,shopid],callback);
// }
exports.updateShop = (shopId, shopData, callback) => {

    let query = 'UPDATE shops SET ';
    const values = [];

    for (const [key, value] of Object.entries(shopData)) {
        query += `${key} = ?, `;
        values.push(value);
    }

    query = query.slice(0, -2);

    query += ' WHERE id = ?';
    values.push(shopId);

    db.query(query, values, callback);
};

exports.deleteShop = (shopid, callback) => {
    const query = 'DELETE FROM shops WHERE id = ?';
    db.query(query, [shopid], callback);
};

// exports.searchShopsByLocation = (location, callback) => {
//     const query = 'SELECT * FROM Shops WHERE location LIKE ?';
//     const values = [`%${location}%`];
//     db.query(query, values, (err, results) => {
//         if (err) return callback(err);
//         callback(null, results);
//     });
// };

exports.searchShops = (searchTerm, searchBy, callback) => {
    const column = searchBy === 'name' ? 'name' : 'location';
    const query = `SELECT * FROM shops WHERE ${column} LIKE ?`;
    const values = [`%${searchTerm}%`];

  db.query(query,[values],callback);
};


// const query = 'SELECT * FROM Shops WHERE location LIKE ?';
// const values = [`%${searchTerm}%`];
