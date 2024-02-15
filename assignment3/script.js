document.querySelectorAll('.scrolling-content').forEach(function(wrapper) {
    var scrollContent = wrapper.querySelector('.scroll-content');
    var fadeOut = document.createElement('div');
    fadeOut.classList.add('scroll-fade-out');
    wrapper.appendChild(fadeOut);

    wrapper.addEventListener('scroll', function() {
        var scrollTop = wrapper.scrollTop;
        var wrapperHeight = wrapper.clientHeight;
        var contentHeight = scrollContent.clientHeight;
        var fadeOutHeight = fadeOut.clientHeight;

        if (contentHeight - scrollTop <= wrapperHeight) {
            fadeOut.style.opacity = 1;
        } else {
            fadeOut.style.opacity = 0;
        }
    });
});
