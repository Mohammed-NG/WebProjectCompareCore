document.addEventListener("DOMContentLoaded", async function () {
    const selectElement = document.getElementById("typeodDeviceis1");

    try {
        const response = await fetch('/compare/branddata');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.name;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

// document.addEventListener("DOMContentLoaded", async function () {
//     const selectElement = document.getElementById("typeodDeviceis3");
    
// });
//