/**
 * @author WMXPY
 * @namespace Quest
 * @description Quest
 */

import { QuestRequirementFunction } from "./declare";

export class Quest<Args extends any[] = []> {

    public static create<Args extends any[] = []>(): Quest<Args> {

        return new Quest();
    }

    private readonly _requirements: Array<QuestRequirementFunction<Args>>;

    private constructor() {

        this._requirements = [];
    }

    public requires(description: string, requirement: QuestRequirementFunction<Args>): this {

        this._requirements.push(requirement);
        return this;
    }
}
