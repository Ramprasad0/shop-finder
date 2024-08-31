

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const searchCriteria = document.getElementById('search-criteria');
    const shopList = document.getElementById('shop-list');
    const adminButton = document.querySelector('.admin');

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.trim();
        const criteria = searchCriteria.value;

        if (query) {
            fetch(`/search?term=${encodeURIComponent(query)}&searchBy=${encodeURIComponent(criteria)}`)
                .then(response => response.json())
                .then(data => {
                    shopList.innerHTML = '';

                    if (data.length > 0) {
                        data.forEach(shop => {
                            const shopItem = document.createElement('div');
                            shopItem.className = 'shop';
                            shopItem.innerHTML = `
                                <img src="${shop.img_url}" alt="${shop.name}" />
                                <h2>${shop.name}</h2>
                                <p>${shop.description}</p>
                                <a href="/shop-details.html?id=${shop.id}">View Details</a>
                            `;
                            shopList.appendChild(shopItem);
                        });
                    } else {
                        shopList.innerHTML = '<p>No shops found.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching shops:', error);
                    shopList.innerHTML = '<p>Error fetching shops. Please try again later.</p>';
                });
        } else {
            shopList.innerHTML = '<p>Please enter a search term.</p>';
        }
    });

    adminButton.addEventListener('click', () => {
        window.location.href = '/login';
    });

    
//         // Example of sending the token in the Authorization header to a protected route
//       async function accessProtectedRoute() {
//     const token = localStorage.getItem('token');
//     console.log('Retrieved token:', token);

//     if (token) {
//         const response = await fetch('/index', {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         console.log('Response status:', response.status);
//         console.log('Response text:', await response.text());

//         if (response.ok) {
//             const data = await response.text();
//             document.body.innerHTML = data;
//         } else {
//             alert('Unauthorized or Error: ' + response.status);
//         }
//     } else {
//         alert('No token found, please login');
//         window.location.href = '/login';
//     }
// }

    
//         // Call this function when you want to access the protected route
//         accessProtectedRoute();
});
