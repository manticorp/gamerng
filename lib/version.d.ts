import { numberlike } from './utils.js';
type vpart = string | numberlike;
export interface VersionInterface {
    major: vpart;
    minor: vpart;
    patch: vpart;
    prerelease?: vpart;
    build?: vpart;
}
export interface SemVerInterface {
    major: numberlike;
    minor: numberlike;
    patch: numberlike;
    prerelease?: vpart;
    build?: vpart;
}
export default class Version implements SemVerInterface {
    major: numberlike;
    minor: numberlike;
    patch: numberlike;
    build?: vpart;
    presplit: vpart[];
    constructor(major: Partial<VersionInterface> | vpart, minor?: vpart, patch?: vpart, prerelease?: vpart, build?: vpart);
    get prerelease(): string | undefined;
    set prerelease(prerelease: vpart | undefined);
    protected splitPre(prerelease: vpart | undefined): vpart[];
    static parse(verstr: string): SemVerInterface;
    plain(): SemVerInterface;
    toString(): string;
    protected comparePrerelease(other: SemVerInterface): number;
    gt(other: SemVerInterface | string): boolean;
    gteq(other: SemVerInterface | string): boolean;
    sameVer(other: SemVerInterface | string): boolean;
    eq(other: SemVerInterface | string): boolean;
    samePre(other: SemVerInterface | string): boolean;
    same(other: SemVerInterface | string): boolean;
    lt(other: SemVerInterface | string): boolean;
    lteq(other: SemVerInterface | string): boolean;
}
export {};
