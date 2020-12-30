"use strict";

const Token = function()
{
    function Token(id, line, lexeme)
    {
        this.id = id;
        this.line = line;
        this.lexeme = lexeme;
        if(lexeme == null)
        {
            this.lexeme = id;
        }
    }

    return Token;
}();

exports.Token = Token;
