/**
 * Checker Script for mooc_git-entrega1_merge
 */


// IMPORTS
const should = require('chai').should();
const git = require('simple-git/promise');
const Utils = require("./utils");
const to = require("./to");
const path = require('path');
const fs = require('fs-extra');


// Parse input arguments
const args = JSON.parse(JSON.stringify(process.argv));
// Gets the student name from args[2]
if (!(args.length > 2)) {
    console.error("GitHub repository name not found");
    process.exit(1);
}
const student = args[2];

// CONSTS
const REPO_NAME = 'my_calculator';
const BRANCH_NAME = 'remotes/origin/sine';
const PATH_ASSIGNMENT = path.resolve(path.join(__dirname, "../"));
const REPO_URL = `git://github.com/${student}/${REPO_NAME}.git`;
const PATH_REPO = path.join(PATH_ASSIGNMENT, REPO_NAME);


// GLOBALS
let error_critical = null;
let output = null;
let branches = null;
let commit_1_master = null;
let commit_2_master = null;
let commit_head_sine = null;


let mygit = git(PATH_ASSIGNMENT);

describe('mooc_git-entrega1_merge', function () {

    it("", async function () {
        this.name = "1. Looking for the master branch";
        this.score = 1;
        this.msg_ok = `Master branch found at ${REPO_URL}`;
        [_, _] = await to(fs.remove(PATH_REPO));
        [error_repo, _] = await to(mygit.clone(REPO_URL));
        if (error_repo) {
            this.msg_err = `Master branch not found at ${REPO_URL}.\n\t\tError: >>${error_repo}<<`;
            error_critical = this.msg_err;
            should.not.exist(error_critical);
        }
        await to(mygit.cwd(PATH_REPO));
        should.not.exist(error_repo);
    });

    it("", async function () {
        const expected = 'README.md';
        this.name = `2. Looking for the file '${expected}' in the master branch first commit`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            [error_log, log] = await to(mygit.log());
            if (error_log) {
                this.msg_err = `Error reading logs from ${PATH_REPO}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            if (log.all.length < 2){
                this.msg_err = `Expected at least 2 commits in ${REPO_URL}, found: ${log.all.length}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            commit_1_master = log.all[log.all.length - 1].hash.substring(0, 7);
            commit_2_master = log.all[log.all.length - 2].hash.substring(0, 7);
            if (!commit_1_master) {
                this.msg_err = `Error: master branch commit not found.\n\t\t\tReceived: ${log.all[log.all.length - 1]}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);

            }
            [error_commit, output] = await to(mygit.show([commit_1_master, '--name-only', '--pretty=format:']));
            if (error_commit) {
                this.msg_err = `Error reading the master branch commit ${commit_1_master}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            this.msg_ok = `Found the file '${expected}' in the master branch commit ${commit_1_master}`;
            this.msg_err = `File '${expected}' not found in the master branch commit ${commit_1_master}`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "calculator.html";
        this.name = `3. Looking for the file '${expected}' in the master branch first commit`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `Found the file '${expected}' in the master branch commit ${commit_1_master}`;
            this.msg_err = `File '${expected}' not found in the master branch commit ${commit_1_master}`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "calculator.html";
        this.name = `4. Looking for the file '${expected}' in the master branch second commit`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Found the file '${expected}' in the master branch commit ${commit_2_master}`;
            this.msg_err = `File '${expected}' not found in the master branch commit ${commit_2_master}`;
            [error_show, output] = await to(mygit.show([commit_2_master]));
            if (error_show){
                this.msg_err = `Error reading the master branch commit ${commit_2_master}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "x^4";
        this.name = `5. Looking for 'x^4' in master branch second commit contents`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Found '${expected}' in master branch commit ${commit_2_master}`;
            this.msg_err = `'${expected}' not found in master branch commit ${commit_2_master}`;
            [err_show, output] = await to(mygit.show([commit_2_master]));
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = BRANCH_NAME;
        this.name = `6. Looking for branch '${BRANCH_NAME}'`;
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Found branch '${BRANCH_NAME}'`;
            [error_branch, branches] = await to(mygit.branch());
            if (error_branch) {
                this.msg_err = `Error reading branches from ${PATH_REPO}`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            } else {
                output = branches.all;
            }
            const no_branch = !Utils.search(expected, output);
            if (no_branch){
                this.msg_err = `Branch '${BRANCH_NAME}' not found`;
                error_critical = this.msg_err;
                should.not.exist(error_critical);
            }
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        this.name = `7. Checking that the branch '${BRANCH_NAME}' is integrated with master`;
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            const expected = branches.branches["master"].commit;
            const output = branches.branches[BRANCH_NAME].commit;
            this.msg_ok = `The branch '${BRANCH_NAME}' is integrated with master`;
            this.msg_err = `The last commit ${output} from branch '${BRANCH_NAME}' is not integrated with master commit ${expected}`;
            commit_head_sine = output;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "sin";
        this.name = `8. Looking for '${expected}' in final master merge contents`;
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            this.msg_ok = `Found '${expected}' in master merge commit ${commit_head_sine} contents`;
            this.msg_err = `'${expected}' not found in final master merge commit ${commit_head_sine} contents`;
            [err_show, output] = await to(mygit.show([commit_head_sine]));
            Utils.search(expected, output).should.be.equal(true);
        }
    });
});
