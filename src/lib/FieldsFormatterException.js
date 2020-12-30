"use strict";

var FieldsFormatterException = function()
{
    function FieldsFormatterException(message)
    {
        this.message = message;

        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(this, FieldsFormatterException);
        else
            this.stack = (new Error()).stack;
    }

    FieldsFormatterException.prototype = Object.create(Error.prototype);
    FieldsFormatterException.prototype.name = "FieldsFormatterException";
    FieldsFormatterException.prototype.constructor = FieldsFormatterException;

    return FieldsFormatterException;
}();

exports.FieldsFormatterException = FieldsFormatterException;
