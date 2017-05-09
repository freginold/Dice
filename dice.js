
// Dice.js


function dice(el) {
    var props = {};
    var newEl = document.createElement('span');
    var found = false;
    var errorPrefix = "Dice.js error ";
    var errors = [
        errorPrefix + "0: Argument is not a valid node.",
        errorPrefix + "1: No valid text was node found.",
        errorPrefix + "2: Text node passed in is empty.",
        errorPrefix + "3: No text nodes found as children of argument node.",
        errorPrefix + "4: Argument node is no longer part of the DOM tree.",
        errorPrefix + "5: Argument does not have 'parentNode' property."
    ];
    var defaultID = "diced";
    var targetNode, thisChar, txt;
    
    try {
        if (el.parentNode === null) {
            console.log(errors[4]);     // node has no parent; already removed from DOM
            return;
        }
    }
    catch(e) {
        console.log(errors[5]);         // el does not have parentNode property; not a node
        return;
    }
    if (arguments.length > 1) {         // if properties were passed in
        if ((typeof arguments[1]).toLowerCase() === "object") {
            props = arguments[1];
        }
    }
    try {
        if (!!el.nodeType) {    // is a node; see if text node, else find text node child
            if (el.nodeType == 3) {         // argument is a text node
                if (!validNode(el)) {
                    console.log(errors[2]);     // argument text node is empty
                    return;
                }
                targetNode = el;
            }
            else {
                // el is not a text node -- check children for 1st non-empty text node
                var nodes = el.childNodes;
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeType == 3 && !found) {       // text node
                        if (!validNode(nodes[i])) {         // empty text node; keep looking
                            continue;
                        }
                        found = true;
                        targetNode = nodes[i];
                        break;
                    }
                }
            }
            if (targetNode === undefined) {
                console.log(errors[3]);         // no text node that's a direct child
                return;
            }
        }
        else {
            console.log(errors[1]);     // no node found
            return;
        }
    }
    catch(e) {
        // not a node;
        console.log(errors[0]);
        return;
    }
    // create individual spans
    props = getProps(props);
    var txt = trim(targetNode.wholeText);    
    var newStr = "";
    var idPrefix;
    var thisClass;
    var count = 0;
    for (var j = 0; j < txt.length; j++) {
        // loop through chars
        count++;
        thisClass = "";
        // remove unwanted characters & wrap each character in a span
        thisChar = txt.slice(j, j + 1);
        if (!!props.skip) {
            var patt = new RegExp(thisChar);
            if (patt.test(props.skip)) {
                // don't assign class or ID to skipped chars
                newStr += "<span>" + thisChar + "</span>";
                count--;
                continue;
            }
        }
        if (thisChar.charCodeAt(0) < 32) { continue; }      // disregard control ASCII chars
        idPrefix = props.id ? " id='" + props.id + count + "'" : "";
        if (props.even && (count % 2)) { thisClass += props.odd + " "; }
        if (props.odd && !(count % 2)) { thisClass += props.even + " "; }
        if (props.all) { thisClass += props.all; }
        if (thisClass !== "") {
            thisClass = "class='" + trim(thisClass) + "' ";
        }
        newStr += "<span " + thisClass + idPrefix + ">" + thisChar + "</span>";
    }
    newEl.innerHTML = newStr;
    // then add the span wrapper back in as HTML
    newEl.style.visibility = "hidden";
    targetNode.parentNode.insertBefore(newEl, targetNode);
    targetNode.parentNode.removeChild(targetNode);
    newEl.style.visibility = "visible";
    return count;

    function getProps(obj) {
        // get any user-defined properties; else defaults
        if ((typeof obj.id).toLowerCase() === "boolean" && !obj.id) { obj.id = ""; }
        else { if ((typeof obj.id).toLowerCase() !== "string") { obj.id = defaultID; } }
        if ((typeof obj.skip).toLowerCase() !== "string") { obj.skip = ""; }
        if ((typeof obj.odd).toLowerCase() !== "string") { obj.odd = false; }
        if ((typeof obj.even).toLowerCase() !== "string") { obj.even = false; }
        if ((typeof obj.all).toLowerCase() !== "string") { obj.all = false; }
        return obj;
    }
    function validNode(thisNode) {
        // check text node to see if empty
        var tempTxt;
        try { tempTxt = thisNode.wholeText; }
        catch(e) {
            // wholeText undefined
            try { tempTxt = thisNode.textContent; }
            catch (e2) {
                // textContent undefined
                tempTxt = "";
            }
        }
        tempTxt = trim(tempTxt);
        if (tempTxt == "") {        // empty text node
            return false;
        }
        else { return true; }
    }
    function trim(str) {
        // trim v1.1 for Dice
        var done = false;
        var len;
        while (!done) {
            len = str.length;
	    str = checkFirst(str);
        }
        function checkFirst(strF) {
            if (strF.charCodeAt(0) < 33) {
                strF = strF.slice(1);
            }
            strF = checkLast(strF);
            return strF;
        }
        function checkLast(strL) {
            if (strL.charCodeAt(strL.length - 1) < 33) {
                strL = strL.slice(0, strL.length - 1);
            }
            checkIfDone(strL);
            return strL;
        }
        function checkIfDone(strD) {
            if (strD.length === len) {
                done = true;
            }
        }
        return str;
    }
}
