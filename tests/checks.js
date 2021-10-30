// IMPORTS
const git = require('simple-git/promise');
const Utils = require("./testutils");
const path = require('path');
const fs = require('fs-extra');


// CONSTS
const REPO_NAME = 'my_calculator';
const BRANCH_NAME = 'remotes/origin/sine';
const PATH_ASSIGNMENT = path.resolve(path.join(__dirname, "../"));
const PATH_REPO = path.join(PATH_ASSIGNMENT, REPO_NAME);


// GLOBALS
let error_critical = null;
let output = null;
let branches = null;
let commit_1_main = null;
let commit_2_main = null;
let commit_head_sine = null;
let student = null;
let REPO_URL = "";


let mygit = git(PATH_ASSIGNMENT);

describe('Commit', function () {
    it("(Prechecks) Comprobando", async function () {
        this.score = 0;
        this.msg_err = "No se ha encontrado el fichero 'git_account' que debe contener el nombre de usuario de github";

        student = fs.readFileSync(path.join(PATH_ASSIGNMENT, 'git_account'), {encoding: 'utf8'}).replace(/^\s+|\s+$/g, '');;
        REPO_URL = `git@github.com:${student}/${REPO_NAME}.git`;
        this.msg_ok = `Se ha encontrado el fichero 'git_account': ${student}`;
        should.exist(student);
    });

    it("(Prechecks) Buscando la rama main", async function () {
        this.score = 2;
        this.msg_ok = `Se ha encontrado la rama main ${REPO_URL}`;
        [_, _] = await Utils.to(fs.remove(PATH_REPO));
        [error_repo, _] = await Utils.to(mygit.clone(REPO_URL));
        if (error_repo) {
            this.msg_err = `No se encuentra rama main en ${REPO_URL}`;
            error_critical = this.msg_err;
            should.not.exist(error_critical);
        }
        await Utils.to(mygit.cwd(PATH_REPO));
        should.not.exist(error_repo);
    });

    it("Buscando commits en la rama main", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            [error_log, log] = await Utils.to(mygit.log());
            if (error_log) {
                this.msg_err = `Error al leer los logs en ${PATH_REPO}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            
            if (log.all.length < 2){
                this.msg_err = `Se esperaban por lo menos 2 commits en ${REPO_URL}. Resultado: ${log.all.length}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }

            commit_1_main = log.all[log.all.length - 1].hash.substring(0, 7);
            commit_2_main = log.all[log.all.length - 2].hash.substring(0, 7);
            if (!commit_1_main) {
                this.msg_err = `Error: al leer el commit en la rama main.\n\t\t\tResultado: ${log.all[log.all.length - 1]}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);

            }
            [error_commit, output] = await Utils.to(mygit.show([commit_1_main, '--name-only', '--pretty=format:']));
            if (error_commit) {
                this.msg_err = `Error al leer el commit ${commit_1_main} de la rama main`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            this.msg_ok = `Se ha encontrado el primer commit en la rama main ${commit_1_main}`;
            this.msg_err = `No se encuentra el primer commit de la rama main ${commit_1_main}`;
        }
    });

    it("Buscando el fichero index.html en el primer commit", async function () {
        const expected = "index.html";
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `Se ha encontrado el fichero '${expected}'  en el primer commit del la rama main ${commit_1_main}`;
            this.msg_err = `El fichero '${expected}' no se encuentra en el primer commit de la rama main ${commit_1_main}`;

            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("Buscando el fichero index.html en el segundo commit", async function () {
        const expected = "index.html";
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Se ha encontrado el fichero '${expected}'  en el primer commit del la rama main ${commit_2_main}`;
            this.msg_err = `El fichero '${expected}' no se encuentra en el primer commit de la rama main ${commit_2_main}`;

            [error_show, output] = await Utils.to(mygit.show([commit_2_main]));
            if (error_show){
                this.msg_err = `Error al leer el commit ${commit_2_main} de la rama main`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("Buscando x^4 en los commits de la rama main", async function () {
        const expected = "x^4";
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Se ha encontrado '${expected}' en la rama main ${commit_2_main}`;
            this.msg_err = `No se ha encontrado'${expected}' en la rama main ${commit_2_main}`;
            [err_show, output] = await Utils.to(mygit.show([commit_2_main]));
            Utils.search(expected, output).should.be.equal(true);
        }
    });
});