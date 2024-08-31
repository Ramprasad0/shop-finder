
CREATE TABLE BusinessInfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    opening_hours VARCHAR(100),
    branches INT,
    owner_name VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    rating DECIMAL(3,2),
    img_url VARCHAR(255)
);

INSERT INTO shops (name, location, contact_number, opening_hours, branches, owner_name, website, description, rating, img_url) VALUES
('Big Bazaar', 'Mumbai', '+91 22 3001 1234', '10:00 AM - 10:00 PM', 100, 'Future Retail', 'https://www.bigbazaar.com', 'A popular chain of hypermarkets, discount department stores, and grocery stores.', 4.00, 'https://lh3.googleusercontent.com/QOURRt7rykkjrpBT8zl9VPThYpSeld08jHdlWG7nRcl9hD63kNsjtk9_IbS4VFvK2QYsJV5K3aKzkEaFCWRr1RTL2iJVR7r20OvHi7Mv'),
('Shoppers Stop', 'Mumbai', '+91 11 4109 5678', '11:00 AM - 9:00 PM', 80, 'Shoppers Stop Ltd.', 'https://www.shoppersstop.com', 'One of India\'s leading retail chains offering fashion, lifestyle, and home products.', 4.20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v1Ml1pOTOg1WjIklaVHO7U0NJvSh58jX-w&s'),
('Reliance Fresh', 'Mumbai', '+91 80 2233 4567', '8:00 AM - 10:00 PM', 120, 'Reliance Retail', 'https://www.reliancefreshdirect.com', 'A retail chain that provides a variety of groceries and fresh produce.', 4.10, 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/6bf0850262d8dd262ff9985b597cd4a5'),
('Pantaloons', 'Kolkata', '+91 33 4000 7890', '10:00 AM - 9:00 PM', 50, 'Aditya Birla Fashion & Retail Ltd.', 'https://www.pantaloons.com', 'A popular clothing and lifestyle retail store offering a wide range of apparel.', 4.30, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FWhatsAppChatshop%2F&psig=AOvVaw2TsT1a5gfpFoxIeik-fuSV&ust=1724922944958000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjZ0-ysl4gDFQAAAAAdAAAAABAE'),
('Croma', 'Chennai', '+91 44 4211 1234', '10:00 AM - 9:00 PM', 70, 'Tata Group', 'https://www.croma.com', 'An electronics and consumer durables retail chain offering a variety of gadgets and appliances.', 4.40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuJw-G69osCWDOvabS4K8FjdfiepJ_9FdfA&s');
