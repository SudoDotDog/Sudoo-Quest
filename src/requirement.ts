/**
 * @author WMXPY
 * @namespace Quest
 * @description Requirement
 */

import { QuestRequirementFunction } from "./declare";

export class Requirement<Args extends any[] = []> {

    public static create<Args extends any[] = []>(description: string, requirement: QuestRequirementFunction<Args>): Requirement<Args> {

        return new Requirement(description, requirement);
    }

    private readonly _description: string;
    private readonly _requirementFunction: QuestRequirementFunction<Args>;

    private constructor(description: string, requirement: QuestRequirementFunction<Args>) {

        this._description = description;
        this._requirementFunction = requirement;
    }
}
