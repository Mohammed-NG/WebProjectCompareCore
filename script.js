document.addEventListener("DOMContentLoaded", async function () {
    const selectElement1 = document.getElementById("typeodDeviceis1");
    const selectElement3 = document.getElementById("typeodDeviceis3");
    
    const selectElement2 = document.getElementById("typeodDeviceis2");
    const selectElement4 = document.getElementById("typeodDeviceis4");


    // const detailElement = document.getElementById("typeodDeviceis3");
    
    ///Buttons 1 and 3
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
                // console.log(selectedId);
                const deviceResponse = await fetch('/compare/'+ selectedId);
                if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
                const devices = await deviceResponse.json();
                selectElement3.innerHTML = '';
                devices.forEach(device => {
                    // console.log(device)
                    const option = new Option(device.name, device.id);
                    selectElement3.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }

//////////////////////////////////////buttons 2 and 4


    try {
        const response = await fetch('/compare/branddata');
        if (!response.ok) throw new Error('Network response was not ok');
        const brands = await response.json();
        brands.forEach(brand => {
            //console.log(brand)
            const option = new Option(brand.name, brand.id);
            selectElement2.appendChild(option);
        });

        selectElement2.addEventListener('change', async () => {
            try {
                const selectedId = selectElement2.value;
                // console.log(selectedId);
                const deviceResponse = await fetch('/compare/'+selectedId);
                if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
                const devices = await deviceResponse.json();
                selectElement4.innerHTML = '';
                devices.forEach(device => {
                    // console.log(device)
                    const option = new Option(device.name,device.id);
                    // console.log(device.id)
                    selectElement4.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
///detailss

selectElement3.addEventListener('change', async () => {
    try {
        const selectedId = selectElement3.value;
        console.log(selectedId);
        const deviceResponse = await fetch('/compare/details/'+selectedId);
        if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
        const device = await deviceResponse.json();

        const imageElement = document.getElementById('pic1')
        console.log(device);
        const newImageSrc = device.img; 
        imageElement.src = newImageSrc;


        for (let i = 0; i < device.quickSpec.length; i++) {
            const paragraphId = `Comp${i + 1}`; // Construct the paragraph ID dynamically
            const paragraphElement = document.getElementById(paragraphId);
            if (paragraphElement) { // Check if the element exists
                paragraphElement.textContent = device.quickSpec[i].value;
            } else {
                console.log(`Element with ID ${paragraphId} not found.`);
            }
        }

    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}
)
////////////////////////////////////////////////////
selectElement4.addEventListener('change', async () => {
    try {
        const selectedId = selectElement4.value;
        console.log(selectedId);
        const deviceResponse = await fetch('/compare/details/'+selectedId);
        if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
        const device = await deviceResponse.json();

        const imageElement = document.getElementById('pic2')
        console.log(device);
        const newImageSrc = device.img; 
        imageElement.src = newImageSrc;


        for (let i = 0; i < device.quickSpec.length; i++) {
            const paragraphId = `Comp${i + 13}`; // Construct the paragraph ID dynamically
            const paragraphElement = document.getElementById(paragraphId);
            if (paragraphElement) { // Check if the element exists
                paragraphElement.textContent = device.quickSpec[i].value;
            } else {
                console.log(`Element with ID ${paragraphId} not found.`);
            }
        }

    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}
)
///////////////////////////////////////////////////////////


}


);
