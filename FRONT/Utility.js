Number.prototype.clamped = function (min, max) {
    if (this < min) {
        return min;
    }
    else if (this > max) {
        return max;
    }
    return this;
};

Number.prototype.clampedLower = function (min) {
    if (this < min) {
        return min;
    }
    return this;
};

Number.prototype.clampedUpper = function (max) {
    if (this > max) {
        return max;
    }
    return this;
};