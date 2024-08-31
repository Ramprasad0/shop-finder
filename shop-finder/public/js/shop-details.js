document.addEventListener('DOMContentLoaded', () => {
    const shopId = new URLSearchParams(window.location.search).get('id');
    if (shopId) {
        fetch(`/shops/${shopId}`)
            .then(response => response.json())
            .then(shop => {
                const shopDetails = document.getElementById('shop-details');
                shopDetails.innerHTML = `
                    <img src="${shop.img_url}" alt="${shop.name}" style="max-width: 300px; height: auto; display: block; margin: 0 auto;" />
                    <h2>${shop.name}</h2>
                    <p><strong>Description:</strong> ${shop.description}</p>
                    <p><strong>Location:</strong> ${shop.location}</p>
                    <p><strong>Contact:</strong> ${shop.contact_number}</p>
                    <p><strong>Opening Hours:</strong> ${shop.opening_hours}</p>
                    <p><strong>Website:</strong> <a href="${shop.website}" target="_blank">${shop.website}</a></p>
                    <p><strong>Rating:</strong> ${shop.rating}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching shop details:', error);
                document.getElementById('shop-details').innerHTML = '<p>Error fetching shop details. Please try again later.</p>';
            });
    } else {
        document.getElementById('shop-details').innerHTML = '<p>No shop ID provided.</p>';
    }
});
