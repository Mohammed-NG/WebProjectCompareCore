document.addEventListener("DOMContentLoaded", function() {
    // Function to handle button click for btn1
    function handleBtn1Click() {
        // Select all <th> elements with style="color: red;"
        var redThElements = document.querySelectorAll('th[style="color: red;"]');
        
        // Loop through each <th> element and update its text content
        redThElements.forEach(function(thElement) {
            switch (thElement.textContent.trim()) {
                case "Dimensions":
                    thElement.textContent = "Dimensions";
                    break;
                case "Weight":
                    thElement.textContent = "Weight";
                    break;
                case "Charging speed":
                    thElement.textContent = "Charging Speed";
                    break;
                case "Screen size":
                    thElement.textContent = "Screen Size";
                    break;
                case "Resolution":
                    thElement.textContent = "Resolution";
                    break;
                case "Refresh Rate":
                    thElement.textContent = "Refresh Rate";
                    break;
                case "Processor":
                    thElement.textContent = "Processor";
                    break;
                case "Ram":
                    thElement.textContent = "RAM";
                    break;
                case "Storage":
                    thElement.textContent = "Storage";
                    break;
                case "Camera":
                    thElement.textContent = "Camera";
                    break;
                case "5G Support":
                    thElement.textContent = "5G Support";
                    break;
                default:
                    // Do nothing
                    break;
            }
        });
    }

    // Function to handle button click for btn2
    function handleBtn2Click() {
        // Select all <th> elements with style="color: red;"
        var redThElements = document.querySelectorAll('th[style="color: red;"]');
        
        // Loop through each <th> element and update its text content
        redThElements.forEach(function(thElement) {
            switch (thElement.textContent.trim()) {
                case "Dimensions":
                    thElement.textContent = "";
                    break;
                case "Weight":
                    thElement.textContent = "Weight";
                    break;
                case "Charging speed":
                    thElement.textContent = "Display type";
                    break;
                case "Screen size":
                    thElement.textContent = "Display size";
                    break;
                case "Resolution":
                    thElement.textContent = "Resolution";
                    break;
                case "Refresh Rate":
                    thElement.textContent = "Refresh Rate";
                    break;
                case "Processor":
                    thElement.textContent = "CPU Type";
                    break;
                case "Ram":
                    thElement.textContent = "CPU Speed";
                    break;
                case "Storage":
                    thElement.textContent = "RAM";
                    break;
                case "Camera":
                    thElement.textContent = "GPU";
                    break;
                case "5G Support":
                    thElement.textContent = "Capacity";
                    break;
                default:
                    // Do nothing
                    break;
            }
        });
    }

    // Function to handle button click for btn3
    function handleBtn3Click() {
        // Select all <th> elements with style="color: red;"
        var redThElements = document.querySelectorAll('th[style="color: red;"]');
        
        // Loop through each <th> element and update its text content
        redThElements.forEach(function(thElement) {
            switch (thElement.textContent.trim()) {
                case "Dimensions":
                    thElement.textContent = "Dimensions";
                    break;
                case "Weight":
                    thElement.textContent = "Weight";
                    break;
                case "Charging speed":
                    thElement.textContent = "Cards Supported";
                    break;
                case "Screen size":
                    thElement.textContent = "Sensor Size";
                    break;
                case "Resolution":
                    thElement.textContent = "Cards Supported";
                    break;
                case "Refresh Rate":
                    thElement.textContent = "Display Size";
                    break;
                case "Processor":
                    thElement.textContent = "shutter speed minimum";
                    break;
                case "Ram":
                    thElement.textContent = "shutter speed maximum";
                    break;
                case "Storage":
                    thElement.textContent = "HDR (high dynamic range imaging)";
                    break;
                case "Camera":
                    thElement.textContent = "Battery Life";
                    break;
                case "5G Support":
                    thElement.textContent = "Cam Resolution";
                    break;
                default:
                    // Do nothing
                    break;
            }
        });
    }

    // Function to handle button click for btn4
    function handleBtn4Click() {
        // Select all <th> elements with style="color: red;"
        var redThElements = document.querySelectorAll('th[style="color: red;"]');
        
        // Loop through each <th> element and update its text content
        redThElements.forEach(function(thElement) {
            switch (thElement.textContent.trim()) {
                case "Dimensions":
                    thElement.textContent = "Audio Control";
                    break;
                case "Weight":
                    thElement.textContent = "Connector Type";
                    break;
                case "Charging speed":
                    thElement.textContent = "Battery Type";
                    break;
                case "Screen size":
                    thElement.textContent = "Battery life";
                    break;
                case "Resolution":
                    thElement.textContent = "Weight";
                    break;
                case "Refresh Rate":
                    thElement.textContent = "";
                    break;
                case "Processor":
                    thElement.textContent = "";
                    break;
                case "Ram":
                    thElement.textContent = "";
                    break;
                case "Storage":
                    thElement.textContent = "";
                    break;
                case "Camera":
                    thElement.textContent = "";
                    break;
                case "5G Support":
                    thElement.textContent = "";
                    break;
                default:
                    // Do nothing
                    break;
            }
        });
    }

    // Add event listeners to the buttons
    document.getElementById("btn1").addEventListener("click", handleBtn1Click);
    document.getElementById("btn2").addEventListener("click", handleBtn2Click);
    document.getElementById("btn3").addEventListener("click", handleBtn3Click);
    document.getElementById("btn4").addEventListener("click", handleBtn4Click);
});
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle button click for btn2
    function handleBtn2Click() {
        // Select the img element by its ID
        var imgElement = document.getElementById("pic1");
        var imgElement1 = document.getElementById("pic2");
        // Change the src attribute to the new image file
        imgElement.src = "assests/msi.png";
        imgElement1.src = "assests/mac.png";

    }

    // Add event listener to btn2
    document.getElementById("btn2").addEventListener("click", handleBtn2Click);
});
