$(document).ready(function () {
    $("#brgsld").change(function () {
        brightness();
    })
    $("#graysld").change(function () {
        grayscale();
    })
    $("#sharpsld").change(function () {
        sharpen();
    })
    $("#blursld").change(function () {
        blur();
        console.log(blurSwitch(parseInt($("#blursld").val())));
    })
})


/*Thanks to Ilmari Heikkinen - Google Dev. -- Filter script :-)*/
Filters = {};
Filters.getPixels = function (img) {
    var c, ctx;
    if (img.getContext) {
        c = img;
        try {
            ctx = c.getContext('2d');
        } catch (e) {}
    }
    if (!ctx) {
        c = this.getCanvas(img.width, img.height);
        ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
    }
    return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function (w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};

Filters.filterImage = function (filter, image, var_args) {
    var args = [this.getPixels(image)];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

Filters.grayscale = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        // CIE luminance for the RGB
        var v = (0.2126 * r) + 0.7152 * g + 0.0722 * b;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    return pixels;
};

Filters.brightness = function (pixels, adjustment) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] += adjustment;
        d[i + 1] += adjustment;
        d[i + 2] += adjustment;
    }
    return pixels;
};

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function (w, h) {
    return this.tmpCtx.createImageData(w, h);
};

Filters.convolute = function (pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;

    var w = sw;
    var h = sh;
    var output = Filters.createImageData(w, h);
    var dst = output.data;

    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy * sw + scx) * 4;
                    var wt = weights[cy * side + cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff + 1] * wt;
                    b += src[srcOff + 2] * wt;
                    a += src[srcOff + 3] * wt;
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};

if (!window.Float32Array)
    Float32Array = Array;

Filters.convoluteFloat32 = function (pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;

    var w = sw;
    var h = sh;
    var output = {
        width: w,
        height: h,
        data: new Float32Array(w * h * 4)
    };
    var dst = output.data;

    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy * sw + scx) * 4;
                    var wt = weights[cy * side + cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff + 1] * wt;
                    b += src[srcOff + 2] * wt;
                    a += src[srcOff + 3] * wt;
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};

function runFilter(filter, arg1, arg2, arg3) {
    var idata = Filters.filterImage(filter, image, arg1, arg2, arg3);
    c.width = idata.width;
    c.height = idata.height;
    var ctx = c.getContext('2d');
    ctx.putImageData(idata, 0, 0);
}

grayscale = function () {
    runFilter(Filters.grayscale);
}

brightness = function () {
    runFilter(Filters.brightness, parseInt($("#brgsld").val()));
}

threshold = function () {
    runFilter(Filters.threshold, 128);
}

sharpen = function () {
    runFilter(Filters.convolute, [0, -1, 0,
           -1, parseInt($("#sharpsld").val()), -1,
            0, -1, 0]);
}

blur = function () {
    blurSwitch(parseInt($("#blursld").val()));
    runFilter(Filters.convolute, dim);
}
