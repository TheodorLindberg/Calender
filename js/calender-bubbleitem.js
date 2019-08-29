String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};


var encurageInsertItems = [
    {name:"Programming", level: 20, id: 1},
    {name:"Homework", level: 19, id: 2},
    {name:"Electronics", level: 18, id: 3},
    {name:"Read", level: 13, id: 4},
    {name:"Training", level: 18, id: 5},
    {name:"Meditate", level: 15, id: 6},
    {name:"Outside", level: 14, id: 7}
];
var encurageElementsList = [{

}];

var encourageList;
window.onload = function(){
    encourageList = document.getElementsByClassName("encourage-list")[0];
    console.log(encourageList);
    InsertItems(encurageInsertItems);
}

window.addEventListener("resize", function(){
    UpdateItems(encurageElementsList);
})

elementTemplate = '<div class="bubbleitem bubbleitem-encourage {0}" draggable="true"><p>{1}</p></div>'



var layout = [
    [1,1,1,1,1,2,2,2],
    [1,1,1,1,1,2,2,2],
    [3,3,3,3,3,2,2,2],
    [3,3,3,3,3,2,2,2],
    [4,4,4,4,5,5,5,5],
    [4,4,4,4,5,5,5,5],
    [4,4,4,4,5,5,5,5],
    [4,4,4,4,7,7,7,7],
    [6,6,6,6,7,7,7,7],
    [6,6,6,6,7,7,7,7],
    [6,6,6,6,7,7,7,7],
]

function GetElementAreaInsideLayout(id, list) {
    var top = -1;
    var left = -1;
    var width = -1;
    var height = -1;
    for(let i = 0; i < layout.length; i++) {
        let arr = layout[i];

        let result = arr.findIndex(function(element) {
            return element == id;
        });

        if(result != -1)
        {
            
            if(top == -1) {
                top = i;
                height = 1;
            }   else {
                height++;
            }
            if(left == -1) {
                left = result;

                width = 0;
                for(let i = result; id == arr[i]; i++) {width ++;}
            }
            
        }         
    }
    if(left == -1 || width == -1 || top == -1 || height==-1) {console.log("Error in area func for id: " + id)}
    return{"left": left, "top": top, "width": width, "height": height}
}



//This function creates the elements
function InsertItems(itemsList) {
    
    //All of these are in pixel (px) format
    console.log(encourageList);
    var totalWidth = encourageList.clientWidth;
    var totalHeight = encourageList.clientHeight;
    var spacing = 10;

    var tileSize = (totalWidth - spacing) / layout[0].length - spacing;
    var tileTotalSize = tileSize + spacing;
    console.log(tileTotalSize);
    console.log(tileSize);
    var padding = 2;
    var fontsize = 17;
    var borderSize = 7;

    encurageElementsList = [];

    var baseElement = document.createElement("h1");

    itemsList.forEach((element, index) => {
        
        baseElement.innerHTML = elementTemplate.format(element.name.toLowerCase(),element.name);
        var item = baseElement.firstChild;
        encourageList.appendChild(item);
        item.style.padding = padding + "px";
        item.style.fontSize = fontsize + "px";
        item.style.borderWidth = borderSize + "px";
        item.style.borderRadius = borderSize * 2 + "px";


        
        encurageElementsList.push({element: item, data: element});
    });
    UpdateItems(encurageElementsList);
    console.log(encurageElementsList);
}
//Update the elements to fit nicely inside the area
function UpdateItems(elementsList) {
    //Factor to scale everything
    var widthFactor = window.innerWidth / 1080;
    console.log({w: window.innerWidth, h: window.innerHeight, ow: window.outerWidth, oh: window.outerHeight, dw: document.documentElement.clientWidth});
    var listStyle= window.getComputedStyle(encourageList.parentElement, null);
    
    var totalWidth = encourageList.offsetWidth - listStyle.borderWidth.slice(0, -2);

    console.log(totalWidth + ":" + listStyle.borderWidth.slice(0, -2));
    var extraSideSpacing = encourageList.offsetWidth - encourageList.clientWidth - listStyle.borderWidth.slice(0, -2);
console.log(extraSideSpacing + "space");
    var totalHeight = encourageList.clientHeight;
    var spacing = 10 * widthFactor;
    var padding = 2 * widthFactor;
    var fontsize = 17 * widthFactor;
    var borderSize = 7 * widthFactor;


        var tileSize = (totalWidth - spacing) / layout[0].length - spacing;
        var tileTotalSize = tileSize + spacing;
        encourageList.parentElement.style.borderWidth = borderSize + "px";
        encourageList.parentElement.style.borderRadius = borderSize * 2+ "px";
        
    
    elementsList.forEach((element, index) => {
        
        item = element.element;

        item.style.padding = padding + "px";
        item.style.fontSize = fontsize + "px";
        item.style.borderWidth = borderSize + "px";
        item.style.borderRadius = borderSize * 2 + "px";
        var size = GetElementAreaInsideLayout(element.data.id);
        item.style.left = spacing + tileTotalSize * size.left +"px";
        item.style.top = spacing + tileTotalSize * size.top  + "px";
        item.style.width = tileTotalSize * size.width - spacing  - borderSize  * 2 +"px";
        item.style.height = tileTotalSize * size.height - spacing - borderSize  * 2+ "px";
    });
}