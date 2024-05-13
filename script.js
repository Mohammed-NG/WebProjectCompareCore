document.addEventListener("DOMContentLoaded", async function () {
    const selectElement1 = document.getElementById("typeodDeviceis1");
    const selectElement3 = document.getElementById("typeodDeviceis3");

    try {
        const response = await fetch('/compare/branddata');
        if (!response.ok) throw new Error('Network response was not ok');
        const brands = await response.json();
        brands.forEach(brand => {
            //console.log(brand)
            const option = new Option(brand.name, brand.id);
            selectElement1.appendChild(option);
        });

        selectElement1.addEventListener('change', async () => {
            try {
                const selectedId = selectElement1.value;
                console.log(selectedId);
                const deviceResponse = await fetch('/compare/'+selectedId);
                if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
                const devices = await deviceResponse.json();
                selectElement3.innerHTML = '';
                devices.forEach(device => {
                    console.log(device)
                    const option = new Option(device.name);
                    selectElement3.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
