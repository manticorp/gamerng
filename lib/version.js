import validate from './number.js';
import { isNumeric, strToNum } from './utils.js';
// Thank you https://semver.org/
const semverregex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const compareAsStringOrNumber = (a, b) => {
    const anum = isNumeric(a);
    const bnum = isNumeric(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    if (a === b)
        return 0;
    if (anum && !bnum)
        return -1;
    if (bnum && !anum)
        return 1;
    if (a < b)
        return -1;
    return 1;
};
export default class Version {
    constructor(major, minor, patch = 0, prerelease, build) {
        var _a;
        this.major = 0;
        this.minor = 0;
        this.patch = 0;
        this.presplit = [];
        if (major instanceof Version) {
            this.major = major.major;
            this.minor = major.minor;
            this.patch = major.patch;
            this.presplit = major.presplit;
            this.build = major.build;
        }
        else if (typeof major === 'object') {
            ({ major = 0, minor, patch = 0, prerelease, build } = major);
            this.major = (typeof major === 'string' ? strToNum(major) : major);
            this.minor = (_a = (typeof minor === 'string' ? strToNum(minor) : minor)) !== null && _a !== void 0 ? _a : (this.major === 0 ? 1 : 0);
            this.patch = (typeof patch === 'string' ? strToNum(patch) : patch);
            this.prerelease = prerelease;
            this.build = build;
        }
        else if (typeof major === 'string' && typeof minor === 'undefined') {
            ({ major, minor, patch, prerelease, build } = Version.parse(major));
            this.major = major;
            this.minor = minor;
            this.patch = patch;
            this.prerelease = prerelease;
            this.build = build;
        }
        else {
            major = (typeof major === 'string' ? strToNum(major) : major);
            minor = (typeof minor === 'string' ? strToNum(minor) : minor);
            patch = (typeof patch === 'string' ? strToNum(patch) : patch);
            this.major = major;
            this.minor = minor !== null && minor !== void 0 ? minor : (major === 0 ? 1 : 0);
            this.patch = patch;
            this.prerelease = prerelease;
            this.build = build;
        }
        validate({ major: this.major }).gteq(0).integer();
        validate({ minor: this.minor }).gteq(0).integer();
        validate({ patch: this.patch }).gteq(0).integer();
    }
    get prerelease() {
        if (this.presplit.length === 0) {
            return undefined;
        }
        return this.presplit.join('.');
    }
    set prerelease(prerelease) {
        this.presplit = this.splitPre(prerelease);
    }
    splitPre(prerelease) {
        if (typeof prerelease === 'undefined' || prerelease === '') {
            return [];
        }
        else {
            prerelease = `${prerelease}`.trim();
            return prerelease.split('.').map((id) => {
                if (isNumeric(id)) {
                    const num = +id;
                    if (num >= 0 && num < Number.MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        }
    }
    static parse(verstr) {
        const matches = semverregex.exec(verstr);
        if (matches === null) {
            throw new Error('Invalid semver string.');
        }
        let [major, minor, patch, prerelease, build] = Array.from(matches).slice(1);
        major = strToNum(major);
        minor = strToNum(minor);
        patch = strToNum(patch);
        return new Version({ major, minor, patch, prerelease, build });
    }
    plain() {
        return {
            major: this.major,
            minor: this.minor,
            patch: this.patch,
            prerelease: this.prerelease,
            build: this.build,
        };
    }
    toString() {
        let str = `${this.major}.${this.minor}.${this.patch}`;
        if (this.presplit.length > 0) {
            str = `${str}-${this.presplit.join('.')}`;
        }
        if (typeof this.build !== 'undefined') {
            str = `${str}+${this.build}`;
        }
        return str;
    }
    comparePrerelease(other) {
        const otherver = new Version(other);
        if (this.presplit.length && !otherver.presplit.length) {
            return -1;
        }
        else if (!this.presplit.length && otherver.presplit.length) {
            return 1;
        }
        else if (!this.presplit.length && !otherver.presplit.length) {
            return 0;
        }
        let i = 0;
        do {
            const a = this.presplit[i];
            const b = otherver.presplit[i];
            if (a === undefined && b === undefined) {
                return 0;
            }
            else if (b === undefined) {
                return 1;
            }
            else if (a === undefined) {
                return -1;
            }
            else if (a === b) {
                continue;
            }
            else {
                return compareAsStringOrNumber(a, b);
            }
        } while (++i);
        return 0;
    }
    gt(other) {
        const otherver = new Version(other);
        if (this.presplit.length > 0 && otherver.presplit.length > 0) {
            if (this.sameVer(otherver)) {
                const r = this.comparePrerelease(otherver);
                if (r <= 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        if (this.major > otherver.major) {
            return true;
        }
        if (this.minor > otherver.minor) {
            return true;
        }
        if (this.patch > otherver.patch) {
            return true;
        }
        if (this.presplit.length === 0 && otherver.presplit.length > 0) {
            return true;
        }
        return false;
    }
    gteq(other) {
        const otherver = new Version(other);
        return this.gt(otherver) || this.eq(otherver);
    }
    sameVer(other) {
        const otherver = new Version(other);
        return this.major === otherver.major &&
            this.minor === otherver.minor &&
            this.patch === otherver.patch;
    }
    eq(other) {
        const otherver = new Version(other);
        return this.sameVer(otherver) &&
            this.samePre(otherver);
    }
    samePre(other) {
        const otherver = new Version(other);
        return this.prerelease === otherver.prerelease;
    }
    same(other) {
        const otherver = new Version(other);
        return this.eq(other) &&
            this.build === otherver.build;
    }
    lt(other) {
        const otherver = new Version(other);
        if (this.presplit.length > 0 && otherver.presplit.length > 0) {
            if (this.sameVer(otherver)) {
                const r = this.comparePrerelease(otherver);
                if (r >= 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        if (this.major < otherver.major) {
            return true;
        }
        if (this.minor < otherver.minor) {
            return true;
        }
        if (this.patch < otherver.patch) {
            return true;
        }
        return false;
    }
    lteq(other) {
        return this.lt(other) || this.eq(other);
    }
}
//# sourceMappingURL=version.js.map