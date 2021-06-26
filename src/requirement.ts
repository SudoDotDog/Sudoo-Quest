/**
 * @author WMXPY
 * @namespace Quest
 * @description Requirement
 */

import { QuestRequirementFunction } from "./declare";

export class QuestRequirement<Args extends any[] = []> {

    public static create<Args extends any[] = []>(description: string, requirement: QuestRequirementFunction<Args>): QuestRequirement<Args> {

        return new QuestRequirement(description, requirement);
    }

    private readonly _description: string;
    private readonly _requirementFunction: QuestRequirementFunction<Args>;

    private constructor(description: string, requirement: QuestRequirementFunction<Args>) {

        this._description = description;
        this._requirementFunction = requirement;
    }
}
