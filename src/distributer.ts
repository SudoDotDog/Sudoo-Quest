/**
 * @author WMXPY
 * @namespace Quest
 * @description Distributer
 */

import { QuestRequirementFunction } from "./declare";
import { QuestRequirement } from "./requirement";

export class QuestDistributer<Args extends any[] = []> {

    public static create<Args extends any[] = []>(): QuestDistributer<Args> {

        return new QuestDistributer<Args>([]);
    }

    public static withRequirements<Args extends any[] = []>(...requirements: Array<QuestRequirement<Args>>): QuestDistributer<Args> {

        return new QuestDistributer(requirements);
    }

    public static withRequirementList<Args extends any[] = []>(requirements: Array<QuestRequirement<Args>>): QuestDistributer<Args> {

        return new QuestDistributer(requirements);
    }

    private readonly _requirements: Array<QuestRequirement<Args>>;

    private constructor(requirements: Array<QuestRequirement<Args>>) {

        this._requirements = requirements;
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
