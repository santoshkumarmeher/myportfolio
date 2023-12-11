var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

class SpecialHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`
        <div class="header col-12">
            <div class="navbar">
                <div class="logo"><a href="index.html"><span style="color: aqua;">S</span>antosh <span style="color: aqua;">K</span>. <span style="color: aqua;">M</span>eher</a></div>
                <div class="dropdown">
        
                    <ul>
                        <a href="index.html"><li>Home</li></a>
                        <a href="about.html"><li>About</li></a>
                        <a href="projects.html"><li>Projects</li></a>
                        <a href="experience.html"><li>Experience</li></a>
                        <a href="resume.html"><li>Resume</li></a>
                        <a href="contact.html"><li>Contact</li></a>
                    </ul>
                </div>
            </div>
        </div>
        `
    }
}
customElements.define('special-header',SpecialHeader)