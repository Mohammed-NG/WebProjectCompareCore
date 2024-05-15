

// async function generateChatResponse(message) {
//     try {
//        const response = await fetch('/compare/ask' + message );
//        console.log("AA")
//        return response.data.reply;
//        console.log("CC")
//     } catch (error) {
//        console.error('Error fetching response from ChatGPT API:', error);
//        return 'An error occurred while fetching response';
//     }
//  }

// Example using Fetch API
function compareSpecificDevices() {
    const device1 = 'iPhone 13';
    const device2 = 'Galaxy Note 10';

    fetch('/compare/devices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device1, device2 })
    })
    .then(response => response.json())
    .then(data => {
        // Display the summary to the user
        console.log('Comparison Summary:', data.comparisonSummary);
        document.getElementById('comparisonResult').innerText = data.comparisonSummary;
    })
    .catch(error => {
        console.error('Error comparing devices:', error);
        document.getElementById('comparisonResult').innerText = 'Failed to compare devices';
    });
}



// If you need any initialization to be done after the document loads
document.addEventListener("DOMContentLoaded", function() {
    // If you want to automatically trigger comparison on page load, uncomment the next line
    // compareSpecificDevices();
});




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

                })
                console.log("gpt ??????")
                console.log(generateChatResponse("MESSI IS GREATER THAN CR7"))
                ;
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
       // console.log(selectedId);
        const deviceResponse = await fetch('/compare/details/'+selectedId);
        if (!deviceResponse.ok) throw new Error('Failed to fetch devices');
        const device = await deviceResponse.json();

        const imageElement = document.getElementById('pic1')
       // console.log(device);
        const newImageSrc = device.img; 
        imageElement.src = newImageSrc;


        for (let i = 0; i < device.quickSpec.length; i++) {
            const paragraphId = `Comp${i + 1}`; // Construct the paragraph ID dynamically
            const paragraphElement = document.getElementById(paragraphId);
            if (paragraphElement) { // Check if the element exists
                if (device.quickSpec[i].value.trim() === '') {
                    paragraphElement.textContent = 'not found';
                } else {
                    paragraphElement.textContent = device.quickSpec[i].value;
                }
            } else {
                console.log(`Element with ID ${paragraphId} not found.`);
            }
        }
        
        const miscCategory = device.detailSpec.find(item => item.category === 'Misc');
        const priceId='Comp9'
        if (miscCategory) {
            const priceSpec = miscCategory.specifications.find(spec => spec.name === 'Price');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(priceId)).textContent = priceSpec.value;
            } else {
                document.getElementById(priceId).textContent = 'Price not found.';
            }
        } else {
            document.getElementById(priceId).textContent = 'Misc category not found.';
        }

        // console.log(device)
        const cpu = device.detailSpec.find(item => item.category === 'Platform');
        const cpuid='Comp10'
        if (cpu) {
            const priceSpec = cpu.specifications.find(spec => spec.name === 'CPU');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(cpuid)).textContent = priceSpec.value;
            } else {
                document.getElementById(cpuid).textContent = 'CPU not found.';
            }
        } else {
            document.getElementById(cpuid).textContent = 'Platform category not found.';
        }

        const gpu = device.detailSpec.find(item => item.category === 'Platform');
        const gpuid='Comp11'
        if (gpu) {
            const priceSpec = gpu.specifications.find(spec => spec.name === 'GPU');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(gpuid)).textContent = priceSpec.value;
            } else {
                document.getElementById(gpuid).textContent = 'GPU not found.';
            }
        } else {
            document.getElementById(gpuid).textContent = 'Platform category not found.';
        }

        const tech = device.detailSpec.find(item => item.category === 'Network');
        const techid='Comp12'
        if (gpu) {
            const priceSpec = tech.specifications.find(spec => spec.name === 'Technology');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(techid)).textContent = priceSpec.value;
            } else {
                document.getElementById(techid).textContent = 'Technology not found.';
            }
        } else {
            document.getElementById(techid).textContent = 'Network category not found.';
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
      //  console.log(selectedId);
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
                if (device.quickSpec[i].value.trim() === '') {
                    paragraphElement.textContent = 'not found';
                } else {
                    paragraphElement.textContent = device.quickSpec[i].value;
                }
            } else {
                console.log(`Element with ID ${paragraphId} not found.`);
            }
        }
        
        const miscCategory = device.detailSpec.find(item => item.category === 'Misc');
        const priceId='Comp21'
        if (miscCategory) {
            const priceSpec = miscCategory.specifications.find(spec => spec.name === 'Price');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(priceId)).textContent = priceSpec.value;
            } else {
                document.getElementById(priceId).textContent = 'Price not found.';
            }
        } else {
            document.getElementById(priceId).textContent = 'Misc category not found.';
        }
        const cpu = device.detailSpec.find(item => item.category === 'Platform');
        const cpuid='Comp22'
        if (cpu) {
            const priceSpec = cpu.specifications.find(spec => spec.name === 'CPU');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(cpuid)).textContent = priceSpec.value;
            } else {
                document.getElementById(cpuid).textContent = 'CPU not found.';
            }
        } else {
            document.getElementById(cpuid).textContent = 'Platform category not found.';
        }

        const gpu = device.detailSpec.find(item => item.category === 'Platform');
        const gpuid='Comp23'
        if (gpu) {
            const priceSpec = gpu.specifications.find(spec => spec.name === 'GPU');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(gpuid)).textContent = priceSpec.value;
            } else {
                document.getElementById(gpuid).textContent = 'GPU not found.';
            }
        } else {
            document.getElementById(gpuid).textContent = 'Platform category not found.';
        }

        const tech = device.detailSpec.find(item => item.category === 'Network');
        const techid='Comp24'
        if (gpu) {
            const priceSpec = tech.specifications.find(spec => spec.name === 'Technology');
            // console.log(priceSpec);
            if (priceSpec) {
                (document.getElementById(techid)).textContent = priceSpec.value;
            } else {
                document.getElementById(techid).textContent = 'Technology not found.';
            }
        } else {
            document.getElementById(techid).textContent = 'Network category not found.';
        }

    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}
)
///////////////////////////////////////////////////////////


}


);
