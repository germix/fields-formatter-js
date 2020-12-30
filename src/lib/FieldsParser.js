"use strict";

const { FieldsLexer } = require("./FieldsLexer");
const { TOK_EOF, TOK_LEXEME } = require("./utils");
const { throwUnexpectedTokenException } = require("./utils");

const FieldsParser = function ()
{
    /**
     * Constructor
     */
    function FieldsParser()
    {
    }

    /**
     * Parsear
     *
     * @param string $fields
     *
     * @return array
     */
    FieldsParser.prototype.parse = function(fields)
    {
        this.lex = new FieldsLexer(fields);

        this.next();
        return this.parseField();
    }

    /**
     * Parsear campos
     *
     * @return array
     */
    FieldsParser.prototype.parseField = function()
    {
        let data = [];

        while(this.tok.id != TOK_EOF)
        {
            if(this.tok.id == TOK_LEXEME)
            {
                let name = this.tok.lexeme;
                this.next();

                if(this.tok.id == '{')
                {
                    this.next();
                    data.push([
                        name,
                        this.parseField(),
                    ]);
                }
                else
                {
                    data.push(name);
                }
            }
            else if(this.tok.id == '}')
            {
                this.match('}');
                return data;
            }
            else
            {
                this.next();
            }
        }
        return data;
    }

    /**
     * Obtener el siguiente token
     *
     * @return Token
     */
    FieldsParser.prototype.next = function()
    {
        this.tok = this.lex.getToken();
        
        return this.tok;
    }

    /**
     * Comprobar que el token actual es el token esperado, y pasa al siguiente
     *
     * @param string t
     *
     * @return Token
     */
    FieldsParser.prototype.match = function(t)
    {
        if(this.tok.id == t)
        {
            return this.next();
        }
        else
        {
            throwUnexpectedTokenException(t, this.tok);
        }
    }

    return FieldsParser;
}();

exports.FieldsParser = FieldsParser;
