// This file will contains the functions to create the elements of a popup.

class Boxes {
    constructor(parentNode, uniqueID, options) {
        this.parentNode = parentNode;
        this.id = uniqueID;
        this.box = [];
        this.numberBox = 0;
        var description = options.description;
        var information = options.information;
        var title = options.title;
        var margin = options.margin;
        var border = options.border;
        var backgroundColor = options.backgroundColor;
        
        if (options.description === undefined) {
            description = "No description yet.";
        }
        if (options.information === undefined) {
            information = "No information yet.";
        }
        if (options.title === undefined) {
            title = "no title yet.";
        }
        
        var old_popup = document.getElementById(this.id);
        // We delete the old popup before show up a new one.
        if (old_popup) {
            old_popup.parentNode.removeChild(old_popup);
        }
        
        // Create a div containing the popup and add it on the  
        this.popup = document.createElement('div');
        this.popup.className="my_popup";  
        this.popup.id = this.id;
        this.parentNode.appendChild(this.popup);
        
        this.drawCloseButton();
        this.setTitle(title);
        this.setDescription(description);
        this.setInformation(information);
        this.setStyle(margin, border, backgroundColor);
    }
    
    drawCloseButton() {
        var closeButton = document.createElement('button');
        closeButton.className = "my_popup_close";
        
        // Variable that allow to add the inner close() function to the button.
        var that = this;
        closeButton.addEventListener("click", function() { that.close(); } ) 
        closeButton.innerHTML = "x";
        
        this.popup.appendChild(closeButton);    
    }
    
    setDescription(newDescription) {        
        var old_popup_description = document.getElementById(this.id+ "_description");
        // We delete the old popup description before show up a new one.
        if (old_popup_description) {
            old_popup_description.innerHTML = '<p class="my_description_icon">&#9432;</p> <p class="my_popup_text">' + newDescription + '</p>';
        } else {
            var popupDesc = document.createElement('div');
            popupDesc.className="my_popup_description";  
            popupDesc.innerHTML= '<p class="my_description_icon">&#9432;</p> <p class="my_popup_text">' + newDescription + '</p>';
            popupDesc.id = this.id + "_description";
            this.popup.appendChild(popupDesc);
        }
    }
    
    setInformation(newInformation) {    
        var old_popup_information = document.getElementById(this.id+ "_information");
        // We delete the old popup information before show up a new one.
        if (old_popup_information) {
            old_popup_information.innerHTML = '<p class="my_warning_icon">⚠</p> <p class="my_popup_text">' + newInformation + '</p>';
        } else {
            var infoText = document.createElement("p");
            infoText.innerHTML = "⚠";
            
            var popupInfo = document.createElement('div');
            popupInfo.className="my_popup_information";  
            popupInfo.innerHTML= '<p class="my_warning_icon">⚠</p> <p class="my_popup_text">' + newInformation + '</p>';
            popupInfo.id = this.id + "_information";
            popupInfo.appendChild(infoText);
            this.popup.appendChild(popupInfo);
        }
    }
        
    setTitle(newTitle) {
        var old_popup_title = document.getElementById(this.id+ "_title");
        // We delete the old popup title before show up a new one.
        if (old_popup_title) {
            old_popup_title.innerHTML = newTitle;
        } else {
            var popupTitle = document.createElement('h2');
            popupTitle.className="my_popup_title";  
            popupTitle.innerHTML= newTitle;
            popupTitle.id = this.id + "_title";
            this.popup.appendChild(popupTitle);
        }
    }

    setStyle(margin, border, backgroundColor) {
        this.popup.setAttribute("style", "margin:" + margin + "border:" + border + "background-color:" + backgroundColor);
    }
    
    addBox(uniqueID, number, options) {
        this.box.push(new Box(this.popup, uniqueID, number, options));
    }
    
    close() {
        // element_focused = undefined ;
        var popup = document.getElementById(this.id);
        if ( popup ) {
          popup.parentNode.removeChild(popup);
        }
    }
}

class Box {
    constructor(parentNode, uniqueID, number, options) {
        this.parentNode = parentNode;
        this.id = uniqueID;
        
        var description = options.description;
        var information = options.information;
        var number = number;
        var margin = options.margin;
        var border = options.border;
        var backgroundColor = options.backgroundColor;
        
        if (options.description === undefined) {
            description = "No description yet.";
        }
        if (options.information === undefined) {
            information = "No information yet.";
        }
        
        var old_popup = document.getElementById(this.id);
        // We delete the old box before show up a new one.
        if (old_popup) {
            old_popup.parentNode.removeChild(old_popup);
        }
        
        // Create a div containing the box and add it on the  
        this.box = document.createElement('div');
        this.box.className="my_box";  
        this.box.id = this.id;
        this.parentNode.appendChild(this.box);
        
        // this.drawCloseButton();
        this.setNumber(number);
        /*
        this.setDescription(description);
        this.setInformation(information);*/
        this.setStyle(margin, border, backgroundColor);
        
    }
    
    setStyle(margin, border, backgroundColor) {
        this.box.setAttribute("style", "margin:" + margin + "border:" + border + "background-color:" + backgroundColor);
    }
    
    setNumber(newNumber) {
        var old_box_number = document.getElementById(this.id+ "_number");
        // We delete the old box title before show up a new one.
        if (old_box_number) {
            old_box_number.innerHTML = newNumber;
        } else {
            var boxNumber = document.createElement('div');
            boxNumber.className="my_box_number";  
            boxNumber.innerHTML= newNumber;
            boxNumber.id = this.id + "_number";
            this.box.appendChild(boxNumber);
        }
    }
}




