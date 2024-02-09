function tabs(evt, section) {
    var i, secContent, secLinks;

    secContent = document.getElementsByClassName("container2");
    for (i=0; i<secContent.length; i++) {
        secContent[i].style.display = "none";
    }

    secLinks = document.getElementsByClassName("tabs");
    for(i=0; i<secLinks.length; i++) {
        secLinks[i].className = secLinks[i].className.replace(" active", "");
    }

    document.getElementById(section).style.display = "block";
    evt.currentTarget.className += " active";
}
