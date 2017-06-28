
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" +
            pad(this.getMonth() + 1, 2) + '-' +
            pad(this.getDate(), 2);

    return dateString;
}