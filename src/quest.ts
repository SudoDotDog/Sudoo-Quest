/**
 * @author WMXPY
 * @namespace Quest
 * @description Quest
 */

import { QuestRequirementFunction } from "./declare";
import { QuestRequirement } from "./requirement";

export class Quest<Args extends any[] = []> {

    public static create<Args extends any[] = []>(): Quest<Args> {

        return new Quest();
    }

    private readonly _requirements: Array<QuestRequirement<Args>>;

    private constructor() {

        this._requirements = [];
    }

    public requires(description: string, requirement: QuestRequirementFunction<Args>): this {

        const requirementInstance: QuestRequirement<Args> = QuestRequirement.create(description, requirement);
        this._requirements.push(requirementInstance);

        return this;
    }
}
