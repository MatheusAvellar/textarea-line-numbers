let update_line_numbers = function(ta, el) {
    let lines = ta.value.split("\n").length;
    let child_count = el.children.length;
    let difference = lines - child_count;

    if(difference > 0) {
        let frag = document.createDocumentFragment();
        while(difference > 0) {
            let line_number = document.createElement("span");
            line_number.className = "tln-line";
            frag.appendChild(line_number);
            difference--;
        }
        el.appendChild(frag);
    } else if(difference < 0) {
        while(difference < 0) {
            el.removeChild(el.firstChild);
            difference++;
        }
    }
}

let append_line_numbers = function(id) {
    let ta = document.getElementById(id);
    if(ta == null) {
        return console.warn("[tln.js] Couldn't find textarea of id '"+id+"'");
    }
    if(ta.className.indexOf("tln-active") != -1) {
        return console.warn("[tln.js] textarea of id '"+id+"' is already numbered");
    }
    ta.classList.add("tln-active");
    ta.style = {};

    let el = document.createElement("div");
    ta.parentNode.insertBefore(el, ta);
    el.className = "tln-wrapper";
    update_line_numbers(ta, el);

    ta.onpropertychange = ta.oninput = ta.onkeydown = ta.onkeyup = function(ta, el) {
        return function(e) {
            if((e.keyCode==36||e.which==36||e.code=="Home"||e.key=="Home")
            ||  e.keyCode==13||e.which==13||e.code=="Enter"
            ||  e.code=="NumpadEnter"||e.key=="Enter")
                ta.scrollLeft = 0;
            update_line_numbers(ta, el);
        }
    }(ta, el);
    ta.onchange = ta.onmousewheel = ta.onscroll = function(ta, el) {
        return function() {  el.scrollTop = ta.scrollTop;  }
    }(ta, el);
}