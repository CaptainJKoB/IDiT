function drawImage() {
    $("#image").append(c);
    c.id = "canvas";
    c.width = w;
    c.height = h;
    ctx = c.getContext('2d');
    ctx.drawImage(image, 0, 0);
};
