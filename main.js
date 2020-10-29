const colorContainer = document.getElementById("colors");
class color {
    constructor(elem) {
        this.elem = elem;
        this.dragging = false;
    }
    move(e) {
        this.elem.style.top = (e.clientY - (this.elem.clientHeight / 2)) + "px";
        this.elem.style.left = (e.clientX - (this.elem.clientWidth / 2)) + "px";
    }
    duplicate(e) {
        let dup = document.createElement("div");
        dup.innerHTML = this.elem.id.split("-")[0].trim();
        dup.classList.add("color");
        dup.style.backgroundColor = this.elem.id.split("-")[0].trim();
        dup.style.top = e.clientY + 'px';
        dup.style.left = e.clientX + 'px';
        colorContainer.appendChild(dup);
        const dupColor = new color(dup);
        dupColor.elem.addEventListener("mousedown", e => {
            if (e.button == 0) {
                console.log(dupColor.dragging);
                dupColor.dragging = !dupColor.dragging;
                if (dupColor.dragging) {
                    dupColor.move(e);
                }
            }
            else if (e.button == 1) {
                e.preventDefault();
                colorContainer.removeChild(dupColor.elem);
            }
        });
        dupColor.elem.addEventListener("contextmenu", e => {
            this.duplicate(e);
            e.preventDefault();
        });
        console.log(this.elem.id.split("-")[0].trim(), colors[this.elem.id.split("-")[0].trim()]);
        colors[this.elem.id.split("-")[0].trim()].push(dupColor);
    }
}
const colors = {
    red: [new color(document.getElementById("red-color"))],
    blue: [new color(document.getElementById("blue-color"))],
    green: [new color(document.getElementById("green-color"))],
    pink: [new color(document.getElementById("pink-color"))],
    orange: [new color(document.getElementById("orange-color"))],
    yellow: [new color(document.getElementById("yellow-color"))],
    black: [new color(document.getElementById("black-color"))],
    white: [new color(document.getElementById("white-color"))],
    purple: [new color(document.getElementById("purple-color"))],
    brown: [new color(document.getElementById("brown-color"))],
    cyan: [new color(document.getElementById("cyan-color"))],
    lime: [new color(document.getElementById("lime-color"))],
};
document.addEventListener("mousemove", e => {
    for (let c in colors) {
        let c2 = colors[c];
        for (let c3 of c2) {
            if (c3.dragging) {
                c3.move(e);
            }
        }
    }
});
let i = 1;
let widest = 0;
for (let color in colors) {
    let c = colors[color][0];
    c.elem.style.top = i + "em";
    if (c.elem.clientWidth > widest) {
        widest = c.elem.clientWidth;
        colorContainer.style.width = widest + "px";
    }
    c.elem.addEventListener("mousedown", e => {
        if (e.button == 0) {
            c.dragging = !c.dragging;
            if (c.dragging) {
                c.move(e);
            }
        }
        else if (e.button == 1) {
            e.preventDefault();
            colorContainer.removeChild(c.elem);
        }
    });
    c.elem.addEventListener("contextmenu", e => {
        c.duplicate(e);
        e.preventDefault();
    });
    i += 2;
    colorContainer.style.height = i + "em";
}
