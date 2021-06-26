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

    private readonly _requirements: Map<QuestRequirement<Args>, boolean>;

    private constructor() {

        this._requirements = new Map();
    }

    public requires(description: string, requirement: QuestRequirementFunction<Args>): this {

        const requirementInstance: QuestRequirement<Args> = QuestRequirement.create(description, requirement);
        this._requirements.set(requirementInstance, false);

        return this;
    }

    public execute(...args: Args): boolean {

        for (const requirement of this._requirements.keys()) {

            if (!this._requirements.get(requirement)) {

                const result: boolean = requirement.execute(...args);
                if (result) {

                    this._requirements.set(requirement, true);
                }
            }
        }
        return this.verify();
    }

    public verify(): boolean {

        for (const result of this._requirements.values()) {

            if (!result) {
                return false;
            }
        }
        return true;
    }
}
