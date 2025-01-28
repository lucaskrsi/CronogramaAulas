"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const uuid_1 = require("uuid");
class Usuario {
    constructor(nome, email, senha, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
    }
    setId(id) {
        (0, uuid_1.validate)(id);
        this._id = id;
    }
    getId() {
        return this._id;
    }
    setNome(nome) {
        this._nome = nome;
    }
    getNome() {
        return this._nome;
    }
    setEmail(email) {
        this._email = email;
    }
    getEmail() {
        return this._email;
    }
    setSenha(senha) {
        this._senha = senha;
    }
    getSenha() {
        return this._senha;
    }
}
exports.Usuario = Usuario;
