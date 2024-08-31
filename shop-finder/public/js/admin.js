document.addEventListener('DOMContentLoaded', () => {
    const addShopForm = document.getElementById('add-shop-form');
    const deleteShopForm = document.getElementById('delete-shop-form');
    // const updateShopForm=document.getElementById('update-shop-form');
    const getShopsBtn = document.getElementById('get-shops-btn');
    const tableHeaders = document.getElementById('table-headers');
    const shopsTableBody = document.querySelector('#shops-table tbody');

    addShopForm.addEventListener('submit', event => {
        event.preventDefault();

        const shopData = {
            name: document.getElementById('shop-name').value.trim(),
            location: document.getElementById('shop-location').value.trim(),
            contact_number: document.getElementById('shop-contact-number').value.trim() || null,
            opening_hours: document.getElementById('shop-opening-hours').value.trim() || null,
            branches: document.getElementById('shop-branches').value.trim() || null,
            owner_name: document.getElementById('shop-owner-name').value.trim() || null,
            website: document.getElementById('shop-website').value.trim() || null,
            img_url: document.getElementById('shop-img').value.trim() || null,
            description: document.getElementById('shop-description').value.trim() || null,
            rating: document.getElementById('shop-rating').value.trim() || null
        };

        fetch('/shops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shopData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            addShopForm.reset();
        })
        .catch(error => {
            console.error('Error adding shop:', error);
            alert('Error adding shop. Please try again later.');
        });
    });

    deleteShopForm.addEventListener('submit', event => {
        event.preventDefault();

        const id = document.getElementById('shop-id').value;

        fetch(`/shops/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Operation Failed.');
            deleteShopForm.reset();
        })
        .catch(error => {
            console.error('Error deleting shop:', error);
            alert('Error finding shop');
        });
    });

    const updateShopForm = document.getElementById('update-shop-form');
    const fetchShopBtn = document.getElementById('fetch-shop-btn');
    const updateFields = document.getElementById('update-fields');

    fetchShopBtn.addEventListener('click', () => {
        const shopId = document.getElementById('update-shop-id').value.trim();

        if (shopId) {
            fetch(`/shops/${encodeURIComponent(shopId)}`)
                .then(response => response.json())
                .then(shop => {
                    if (shop) {
                        // Show update fields
                        updateFields.style.display = 'block';

                        // Populate the fields with existing data
                        document.getElementById('update-shop-name').value = shop.name || '';
                        document.getElementById('update-shop-location').value = shop.location || '';
                        document.getElementById('update-shop-contact-number').value = shop.contact_number || '';
                        document.getElementById('update-shop-opening-hours').value = shop.opening_hours || '';
                        document.getElementById('update-shop-branches').value = shop.branches || '';
                        document.getElementById('update-shop-owner-name').value = shop.owner_name || '';
                        document.getElementById('update-shop-website').value = shop.website || '';
                        document.getElementById('update-shop-img').value = shop.img_url || '';
                        document.getElementById('update-shop-description').value = shop.description || '';
                        document.getElementById('update-shop-rating').value = shop.rating || '';
                    } else {
                        alert('Shop not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching shop:', error);
                    alert('Error fetching shop. Please try again later.');
                });
        } else {
            alert('Please enter a valid Shop ID.');
        }
    });

    updateShopForm.addEventListener('submit', event => {
        event.preventDefault();

        const shopId = document.getElementById('update-shop-id').value.trim();
        const shopData = {
            name: document.getElementById('update-shop-name').value.trim(),
            location: document.getElementById('update-shop-location').value.trim(),
            contact_number: document.getElementById('update-shop-contact-number').value.trim(),
            opening_hours: document.getElementById('update-shop-opening-hours').value.trim(),
            branches: document.getElementById('update-shop-branches').value.trim(),
            owner_name: document.getElementById('update-shop-owner-name').value.trim(),
            website: document.getElementById('update-shop-website').value.trim(),
            img_url: document.getElementById('update-shop-img').value.trim(),
            description: document.getElementById('update-shop-description').value.trim(),
            rating: document.getElementById('update-shop-rating').value.trim()
        };

        // Make sure to only send fields with values
        const updatedShopData = {};
        for (const [key, value] of Object.entries(shopData)) {
            if (value) updatedShopData[key] = value;
        }

        fetch(`/shops/${shopId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedShopData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Shop updated successfully.');
            updateShopForm.reset();
            updateFields.style.display = 'none'; // Hide the fields after updating
        })
        .catch(error => {
            console.error('Error updating shop:', error);
            alert('Error updating shop. Please try again later.');
        });
    });
    getShopsBtn.addEventListener('click', () => {
        fetch('/shops')
            .then(response => response.json())
            .then(data => {
                tableHeaders.innerHTML = '';
                shopsTableBody.innerHTML = '';
    
                if (Array.isArray(data) && data.length > 0) {
                    const headers = Object.keys(data[0]);
    
                    headers.forEach(header => {
                        const th = document.createElement('th');
                        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
                        tableHeaders.appendChild(th);
                    });
    

                    data.forEach(shop => {
                        const row = document.createElement('tr');
                        headers.forEach(header => {
                            const td = document.createElement('td');
    
                           
                            if (header === 'img_url') {
                                const img = document.createElement('img');
                                img.src = shop[header] || 'default-image-url.jpg';
                                img.alt = shop['name'] || 'Shop Image'; 
                                img.width = 50;
                                td.appendChild(img);
                            } else {
                                td.textContent = shop[header] !== null && shop[header] !== undefined ? shop[header] : 'N/A';
                            }
    
                            row.appendChild(td);
                        });
                        shopsTableBody.appendChild(row);
                    });
                } else {
                    shopsTableBody.innerHTML = '<tr><td colspan="100%">No shops found.</td></tr>'; 
                }
            })
            .catch(error => {
                console.error('Error fetching shops:', error);
                shopsTableBody.innerHTML = '<tr><td colspan="100%">Error fetching shops. Please try again later.</td></tr>'; 
            });
    });

    const searchIdButton = document.getElementById('search-id-button');
    const searchId = document.getElementById('search-id');
    const searchResults = document.getElementById('search-results');

    searchIdButton.addEventListener('click', () => {
        const id = searchId.value.trim();
        if (id) {
            fetch(`/shops/${encodeURIComponent(id)}`)
                .then(response => response.json())
                .then(shop => {
                    searchResults.innerHTML = '';

                    if (shop) {
                        const shopItem = document.createElement('div');
                        shopItem.className = 'shop';
                        shopItem.innerHTML = `
                            <img src="${shop.img_url}" alt="${shop.name}" />
                            <h2>${shop.name}</h2>
                            <p>${shop.description}</p>
                            <a href="/shop-details.html?id=${shop.id}">View Details</a>
                        `;
                        searchResults.appendChild(shopItem);
                    } else {
                        searchResults.innerHTML = '<p>No shop found with the given ID.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching shop:', error);
                    searchResults.innerHTML = '<p>Error fetching shop. Please try again later.</p>';
                });
        } else {
            searchResults.innerHTML = '<p>Please enter an ID to search.</p>';
        }
    });
});
