/***************
 * TODO
 * ============
 * remove the .location.reload() by something that isn't ugly
 * 
 * 
 * extra's
 * ==========
 * collor options
 * font options
 * 
 */





function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
        "init": function() {

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            if(this._applicationDbContext._dbData.stickynotes.length == 0 ){
                this.repair();
            }else{console.log("all is okay")};


           // this.testApplicationDbContext(); // Test DbContextµ
           //this.repair();
           this.showAllApplicationDbContext();
           //this.edditApplicationDbContext();
           this.AddOneStickkyNote();
           this.removeOneStickyNote();
           this.editOneStickyNote();
           this.hideOneNote();
           this.hideNone();
           
        },

        
        "repair":function(){
        let sn = new StickyNote();
        sn.message = 'Je aller eerste note (pls make sure there is always one).';
        sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
    },

        "showAllApplicationDbContext":function(){
            let stickyNoteElement = document.querySelector(".sticky_board")


            let data = this._applicationDbContext.getStickyNotes();
          //  console.log(data)
            data.forEach(function(element) {
                let title = element.id;
                let message = element.message;
                let createDate = element.createDate;
                let modifiedDate = element.modifiedDate;
                let deleteDate = element.deletedDate;
                
               if(deleteDate == null){

                
                let tempStr = ""

                tempStr += 
                `
                <div class ="note"> 
                <div class="sub-main" id="btns">
                <button class="button-two" id="edit${title}"><span>Edit</span></button>
                <button class="button-two" id="hide${title}"><span>Hide</span></button>
                <button class="button-two" id="remove${title}"><span>Delete</span></button></div>
                <p> ${message}  </p>
                <span class="title"> ${title}  </span>
                </div>
                `
                stickyNoteElement.innerHTML += tempStr;
               // console.log(message)
            } else{
                console.log("failed")
            }
                

            }, this);

        },
     
        "AddOneStickkyNote":function(){
            var self = this;
            var btnConfirm = document.getElementById('confirm');
            btnConfirm.onclick = function(){
                //console.log("clicked!!!!!")
    
               // console.log("Writing")
                let tempStr = ""
                tempStr +=  document.getElementById('messages').value;
                
            let sn = new StickyNote();
            sn.message = tempStr;
            sn = self._applicationDbContext.addStickyNote(sn); // add to db and save it
           
            location.reload();
            console.log('get this far')
            }

        },
        "removeOneStickyNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                var title = element.id;
                let deleteDate = element.deletedDate;
              //  console.log(title)

              if(deleteDate == null){
                
                btnDelete = document.getElementById(`remove${title}`)
                btnDelete.onclick=function(){
                    console.log('deleted' + title)
                    const deleted = self._applicationDbContext.deleteStickyNoteById(title);
                    location.reload();
                }
            } else{
                console.log("failed")
            }
                
            }, this);
           
        }, 
        "editOneStickyNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                let message = element.message
                var title = element.id;
                let deleteDate = element.deletedDate;
                console.log(message)
                console.log(title)
                btnEdit = document.getElementById(`edit${title}`)

                if(deleteDate == null){
                btnEdit.onclick=function(){
                    console.log('edited' + title)
                    element.message = prompt("Please enter the change", message);
                    const updated = self._applicationDbContext.updateStickyNote(element);
                    console.log(updated);
                    console.log(element);
                    location.reload();
                }
            } else{
                console.log("failed")
            }
                
            }, this);
           
        },     
        
        "hideOneNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                let deleteDate = element.deletedDate
                var title = element.id;
                if(deleteDate == null){   
                    btnHide = document.getElementById(`hide${title}`)
                    btnHide.onclick=function(){
                        console.log('hide' + title)
                        const softDeleted = self._applicationDbContext.softDeleteStickyNoteById(title);
                        location.reload();
                   // location.reload();
                    }
                } else{
                console.log("failed")
                }
                
            }, this);
           
        },  

        "hideNone":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
          
            btnShow = document.getElementById(`showAll`)
            btnShow.onclick=function(){
                data.forEach(function(element) {
                    var title = element.id;
                    const softUnDeleted = self._applicationDbContext.softUnDeleteStickyNoteById(title);
                    console.log(softUnDeleted);
                    location.reload();
                }, this);   
            }
        }, 
    };

    App.init(); // Initialize the application
});