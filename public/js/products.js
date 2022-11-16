function changeImg(newSrc){
    var newSrcNow= newSrc.src;
    var imageZome = document.getElementById('I-gallaryZome');
    imageZome.src = newSrcNow;
}
function addBtn(max) {
    document.getElementById("I-print-quantity").value = parseInt(document.getElementById("I-print-quantity").value) + 1;
    if (document.getElementById("I-print-quantity").value >= parseInt(max)) {
        document.getElementById("I-print-quantity").value = max;
    }
}
function subBtn(min) {
    document.getElementById("I-print-quantity").value = parseInt(document.getElementById("I-print-quantity").value) - 1;
    if (document.getElementById("I-print-quantity").value <= parseInt(min)) {
        document.getElementById("I-print-quantity").value = min;
    }
}