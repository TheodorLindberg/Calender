

var currentDragElement = null;

$('.calender-day').on("dragover", function(event) {
    
    if(event.target.classList.contains("calender-column-info"))
    {
        var infoColumn = event.target;
        var id = event.target.id.slice(-1);
        console.log()
        console.log(currentDragElement);
        console.log(id);
    
        console.log(infoColumn);
    }
})

$('.encourage-list').on("dragstart",function(event){
    currentDragElement = event.target;
})