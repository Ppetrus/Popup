// This file will contains the functions to create the elements of a popup.

class Boxes {
    constructor(parentNode, uniqueID, options) {
        this.parentNode = parentNode;
        this.id = uniqueID;
        var description = options.description;
        var information = options.information;
        var title = options.title;
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
            old_popup_description.innerHTML = newDescription;
        } else {
            var popupDesc = document.createElement('div');
            popupDesc.className="my_popup_description";  
            popupDesc.innerHTML= newDescription;
            popupDesc.id = this.id + "_description";
            this.popup.appendChild(popupDesc);
        }
    }
    
    setInformation(newInformation) {    
        var old_popup_information = document.getElementById(this.id+ "_information");
        // We delete the old popup information before show up a new one.
        if (old_popup_information) {
            old_popup_information.innerHTML = newInformation;
        } else {
            var popupInfo = document.createElement('div');
            popupInfo.className="my_popup_information";  
            popupInfo.innerHTML= newInformation;
            popupInfo.id = this.id + "_information";
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

    close() {
        // element_focused = undefined ;
        var popup = document.getElementById(this.id);
        if ( popup ) {
          popup.parentNode.removeChild(popup);
        }
    }
}

class Box {
    constructor(parentNode, uniqueID, options) {
        this.parentNode = parentNode;
        this.id = uniqueID;
    }
}

function popupCreate(parentNode, uniqueID) {
    // On start, the first box is expanded.
    // Given parameter overwrote default in the object (same name)

    var c = new Boxes(parentNode, uniqueID,{movable: false, resizable: false, closable: false,
                       resetable: false,
                       margin: [0,0,0,0] | 0, // 0% == full screen
                       //border: style, background: style
                       // 🗘 ♻ ♺ keepValues: "never" | "page" | "always",
                       });
    c.setTitle('Exporter la colonne "TP_1" vers un tableur.');
    c.setDescription("L'objectif de cette popup est de faire pleins de trucs parce que c'est vraiment cool en de fait de faire des trucs avec des grosses description.");
    c.setInformation("Il n'y a pas d'erreur.");
    /*c.titleNode ;
    json = c.encode() ; // Get user choices
    c.decode(json) ; // Initialise choices
    c.close() ;*/
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}




