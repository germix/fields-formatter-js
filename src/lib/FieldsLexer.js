"use strict";

const { Token } = require("./Token");
const { TOK_EOF, TOK_LEXEME } = require("./utils");

function isSpace(c)
{
    return (/^\s$/).test(c);
}

function isAlnum(c)
{
    return /^[a-zA-Z0-9]+$/i.test(c);
}

const FieldsLexer = function ()
{
    /**
     * Constructor
     * Iniciar el análisis léxico
     *
     * @param string string Cadena
     */
    function FieldsLexer(string)
    {
        this.in = string;           // String de análisis
        this.line = 0;              // Línea actual durante el análisis
        this.cache = null;          // Caracter de caché
        this.eof = false;
    }

    /**
     * Obtener el siguiente token
     *
     * @return Token Token
     */
    FieldsLexer.prototype.getToken = function()
    {
        let c;
        let s;

        while(!this.eof)
        {
            c = this.read();
            if(c == null)
            {
                return new Token(TOK_EOF, this.line, null);
            }
            if(c == "\n")
            {
                this.line++;
            }
            else if(c == "\r")
            {
                // NADA
            }
            else if(isSpace(c))
            {
                // NADA
            }
            else if(isAlnum(c))
            {
                // Guardar el primer caracter
                s = c;

                // Leer todos los caracteres válidos de un lexema de identificador (alfanumérico y '_')
                while(true)
                {
                    c = this.read();
                    if(!(!this.feof() && (isAlnum(c) || c == '_' || c == '-')))
                    {
                        break;
                    }
                    s += c;
                }
                // Si no se ha llegado al final, poner en cache el último caracter
                if(!this.feof())
                {
                    this.save(c);
                }
                return new Token(TOK_LEXEME, this.line, s);
            }
            else
            {
                return new Token(c, this.line, c);
            }
        }
        return new Token(TOK_EOF, this.line, null);
    }

    /**
     * Comprobar que se ha llegado al fin de la cadena
     *
     * @return boolean true|false
     */
    FieldsLexer.prototype.feof = function()
    {
        return this.eof == true;
    }

    /**
     * Leer el siguiente caracter en la cadena
     *
     * @return string Caracter
     */
    FieldsLexer.prototype.read = function()
    {
        let c;
        if(this.cache == null)
        {
            if(this.in.length == 0)
            {
                c = null;
                this.in = null;
                this.eof = true;
            }
            else
            {
                c = this.in[0];
                this.in = this.in.substr(1);
            }
            return c;
        }
        c = this.cache;
        this.cache = null;
        return c;
    }

    /**
     * Guardar un caracter en la caché
     *
     * @param string c Caracter
     */
    FieldsLexer.prototype.save = function(c)
    {
        this.cache = c;
    }

    return FieldsLexer;
}();

exports.FieldsLexer = FieldsLexer;
