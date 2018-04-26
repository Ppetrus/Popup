// This file will contains the functions to create the elements of a popup.

class BoxController {
	constructor() {
		this._groups = {}
	}
	
	addBoxInGroup(box, group) {
		if (this._groups.hasOwnProperty(group)) {
			this._groups[group].push(box);
		} else {
			this._groups[group] = new Array(box);
		}
	}
	
	removeBoxFromGroup(box, group) {
		if (this._groups.hasOwnProperty(group)) {
			let groupElements = this._groups[group];
			let index = groupElements.indexOf(box);
			
			if (index !== -1) {
				groupElements.splice(index, 1);
			}
		}
	}
	        
	collapseOthers(box, group) {
		if (this._groups.hasOwnProperty(group)) {
			let groupElements = this._groups[group];
			
			for (let i = 0; i < groupElements.length; ++i) {
				let currentBox = groupElements[i];
				if (currentBox !== box) {
					currentBox.collapse();
				}
			}
		}
	}
}

var controller = new BoxController();


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
    
    getBoxes() {
        return this.box;
    }
    
    getBox(id) {
        return this.box[id];
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
        this.number = number;
        
        this.margin = options.margin;
        this.border = options.border;
        this.backgroundColor = options.backgroundColor;
        
        this.isExpanded = options.expanded;
        this.deletable = options.deletable;
        this.expandable = options.expandable;
        this.group = options.group;
        this.title = options.title;
        
        this.setDefaultValues();
        
        this.onExpand = options.onExpand;
        this.onReduce = options.onReduce;
        this.onReset = options.onReset;
        this.onDelete = options.onDelete;

        
        this.setDefaultFunctions();
        
        var old_box = document.getElementById(this.id);
        // We delete the old box before show up a new one.
        if (old_box) {
            old_box.parentNode.removeChild(old_popup);
        }
        
        this.drawBox();
        
        this.addCloseButton();
        
        if (this.expandable === false ){
            this.onExpand = function (that) {};
        } else {
            this.addExpandButton();
        }
        
        if(this.isExpanded === true) {
            this.expand();
            this.isExpanded = true;
        } 
        this.setTitle(this.title);
        
        controller.addBoxInGroup(this, this.group);

    }
    
    setDefaultValues() {
        if (this.isExpanded === undefined) {
            this.isExpanded = false;
        }        
        if (this.deletable === undefined) {
            this.deletable = false;
        }
        if (this.expandable === undefined) {
            this.expandable = false;
        }
        if (this.group === undefined) {
            this.group = 0;
        }
        if (this.title === undefined) {
            this.title = "no title yet.";
        }
    }
    
    /* 
     * for each internal function, if they are not defined by the creation of the box, 
     * Then, it takes the default value.
     */
    setDefaultFunctions() {
        // default expanding function.
        if (this.onExpand === undefined) {
            this.onExpand = function (that) {
                this.box.setAttribute("style", "margin:" + this.margin + "border:" + this.border + "background-color:" + this.backgroundColor + "min-height:50px;");
                
                if (this.content !== undefined){
                    this.content.style.visibility='visible';
                }
                this.isExpanded = ! this.isExpanded;
                var that = this;
                var expandbutton = document.getElementById(that.id + "_expander");
                expandbutton.onclick = function() {that.collapse();};
            }
        }
        
        // default reducing function.        
        if(this.onReduce === undefined) {
            this.onReduce = function (that) {
                this.box.setAttribute("style", "margin:" + this.margin + "border:" + this.border + "background-color:" + this.backgroundColor + "height:50px;");  
                
                if (this.content !== undefined){
                    this.content.style.visibility='hidden';
                }
                this.isExpanded = ! this.isExpanded;
                var that = this;
                var expandbutton = document.getElementById(that.id + "_expander");
                expandbutton.onclick = function() {that.expand();};
            }
        }
        
        // default reset function.
        if(this.onReset === undefined) {
            this.onReset = function (that) {}
        }
        
        // default delete function.
        if(this.onDelete === undefined) {
            this.onDelete = function (that) {
                var box = document.getElementById(this.id);
                if ( box ) {
                  box.parentNode.removeChild(box);
                }
            }
        }
    }
    
    drawBox() {
        // Create a div containing the box and add it on the  
        this.box = document.createElement('div');
        this.box.className="my_box";  
        this.box.id = this.id;
        this.parentNode.appendChild(this.box);
        var that = this;
        this.setNumber(this.number);
        this.setStyle();
    }
    
    addCloseButton() {
        if (this.deletable === false ){
            this.onDelete = function (that) {};
        } else {
            var closeButton = document.createElement('button');
            closeButton.className = "my_box_close";
            
            // Variable that allow to add the inner close() function to the button.
            var that = this;
            closeButton.addEventListener("click", function() { that.delete(); } ) 
            closeButton.innerHTML = "x";
            
            this.box.appendChild(closeButton);
        }
    }
    
    addExpandButton() {
            var expanderButton = document.createElement('button');
            expanderButton.className = "my_box_expander";
            
            // Variable that allows to add the inner close() function to the button.
            var that = this;
            expanderButton.onclick = function() {that.expand();};
            expanderButton.innerHTML = ">";
            expanderButton.id = (this.id + "_expander");
            
            this.box.appendChild(expanderButton);
    }
    
    expand() {
        var that = this;
        this.onExpand(that);
        var expandbutton = document.getElementById(that.id + "_expander");
        expandbutton.innerHTML = "^"
        
        var that = this;
        controller.collapseOthers(that, that.group);
    }
    
    setTitle(newTitle) {
        var old_popup_title = document.getElementById(this.id+ "_title");
        // We delete the old box title before show up a new one.
        if (old_popup_title) {
            old_popup_title.innerHTML = newTitle;
        } else {
            var popupTitle = document.createElement('p');
            popupTitle.className="my_box_title";  
            popupTitle.innerHTML= newTitle;
            popupTitle.id = this.id + "_title";
            this.box.appendChild(popupTitle);
        }
    }
    
    collapse() {
        var that = this;
        this.onReduce(that);
        var expandbutton = document.getElementById(that.id + "_expander");
        expandbutton.innerHTML = ">";
    }
    
    reset() {
        var that = this;
        this.onReset(that);
        
    }
    
    delete() {
        controller.removeBoxFromGroup(this, this.group);
        var that = this;
        this.onDelete(that);
    }
    
    setStyle(margin, border, backgroundColor) {
        this.box.setAttribute("style", "margin:" + this.margin + "border:" + this.border + "background-color:" + this.backgroundColor + "height:50px;");
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
    
    setContent(Element) {
        var old_box_content = document.getElementById(this.id+ "_content");
        if (old_box_content) {
            old_box_content.parentNode.removeChild(old_box_content);
        }

        this.content = document.createElement('p');
        this.content.className = "my_box_content";
        this.content.id = this.id + "_content";
        this.content.innerHTML = Element.innerHTML;        
        
        if (this.isExpanded) {
            this.content.style.visibility='visible';
        } else {
            this.content.style.visibility='hidden';
        }
        this.box.appendChild(this.content);
    }
    
}



function popupExample() {
            var c = new Boxes(document.body, "my_popup1",{movable: false, resizable: false, 
                        closable: false, resetable: false, margin: "5% 5% 5% 5%;", border: "4px solid #636363;", backgroundColor: "#BBBBBB;"});
            c.setTitle('Exporter la colonne "TP_1" vers un tableur.');
            c.setDescription("L'objectif de cette popup est de faire pleins de trucs parce que c'est vraiment cool en de fait de faire des trucs avec des grosses description.");
            c.setInformation("Il n'y a pas d'erreur. Il n'y a pas d'erreur. Il n'y a pas d'erreur. Il n'y a pas d'erreur. Il n'y a pas d'erreur. ");
            // c.titleNode ;
            c.addBox("titi1",1, {margin: "1% 0% 0% 1%;", border: "4px solid #454545;", backgroundColor: "#F5F5F5;", expanded: true, title:"Elements à exporter", deletable: true, expandable: true, group: 1});
            c.addBox("titi2",2, {margin: "1% 0% 0% 1%;", border: "4px solid #454545;", backgroundColor: "#F5F5F5;", deletable: false, title:"Configuration d'exportation", expandable: true, group: 1});
            c.addBox("titi3",3, {margin: "1% 0% 0% 1%;", border: "4px solid #454545;", backgroundColor: "#F5F5F5;", deletable: false, title:"Données à exporter", expandable: true, group: 1});
            c.addBox("titi4",4, {margin: "1% 0% 0% 1%;", border: "4px solid #454545;", backgroundColor: "#F5F5F5;", deletable: false, title:"Aperçu et erreurs", expandable: true});
            c.addBox("titi5",5, {margin: "1% 0% 0% 1%;", border: "4px solid #454545;", backgroundColor: "#F5F5F5;", deletable: false, title:"Finalisation", expandable: true});
            
            var elem = document.createElement('div');
            elem.innerHTML = "toto, voila, on peut enfin ajouter des éméments. ça manquait vraiment je pense quand même.toto, voila, on peut enfin ajouter des éméments. ça manquait vraiment je pense quand même.toto, voila, on peut enfin ajouter des éméments. ça manquait vraiment je pense quand même.toto, voila, on peut enfin ajouter des éméments. ça manquait vraiment je pense quand même.toto, voila, on peut enfin ajouter des éméments. ça manquait vraiment je pense quand même."
            
            c.getBox(0).setContent(elem);
            c.getBox(0).setContent(elem);
            c.getBox(1).setContent(elem);
            /* new Box({ initialValue: "not yet", // usable by encode to reset
                         onPrinter: "expanded" | "reduced" | "asDisplayed"});*/
                         
            /*b.setContent('the content') ;
            b.setStatus('ok' | 'normal' | 'warning' | 'error' | 'disabled' | 'running') ;
            
            b.IDNode;
            b.resumeNode ;
            b.contentNode ;*/
}


