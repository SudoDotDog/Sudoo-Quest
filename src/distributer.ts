/**
 * @author WMXPY
 * @namespace Quest
 * @description Distributer
 */

import { QuestRequirementFunction } from "./declare";
import { QuestRequirement } from "./requirement";

export class QuestDistributer<Args extends any[] = []> {

    public static create<Args extends any[] = []>(): QuestDistributer<Args> {

        return new QuestDistributer<Args>();
    }

    private readonly _requirements: Array<QuestRequirement<Args>>;

    private constructor() {

        this._requirements = [];
    }

    public requires(description: string, requirement: QuestRequirementFunction<Args>): this {

        const requirementInstance: QuestRequirement<Args> = QuestRequirement.create(description, requirement);
        return this.addRequirement(requirementInstance);
    }

    public addRequirement(requirement: QuestRequirement<Args>): this {

        this._requirements.push(requirement);
        return this;
    }
}
