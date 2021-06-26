/**
 * @author WMXPY
 * @namespace Quest
 * @description Quest
 */

import { QuestRequirementFunction, QuestStatus } from "./declare";
import { QuestRequirement } from "./requirement";

export class Quest<Args extends any[] = []> {

    public static create<Args extends any[] = []>(): Quest<Args> {

        return new Quest([]);
    }

    public static withRequirements<Args extends any[] = []>(...requirements: Array<QuestRequirement<Args>>): Quest<Args> {

        return new Quest(requirements);
    }

    public static withRequirementList<Args extends any[] = []>(requirements: Array<QuestRequirement<Args>>): Quest<Args> {

        return new Quest(requirements);
    }

    private readonly _requirements: Map<QuestRequirement<Args>, boolean>;

    private constructor(requirements: Iterable<QuestRequirement<Args>>) {

        this._requirements = new Map();

        for (const requirement of requirements) {
            this.addRequirement(requirement);
        }
    }

    public requires(description: string, requirement: QuestRequirementFunction<Args>): this {

        const requirementInstance: QuestRequirement<Args> = QuestRequirement.create(description, requirement);
        return this.addRequirement(requirementInstance);
    }

    public addRequirement(requirement: QuestRequirement<Args>): this {

        this._requirements.set(requirement, false);
        return this;
    }

    public progress(): number {

        const status: QuestStatus = this.status();
        if (status.total === 0) {
            return 0;
        }
        return status.current / status.total;
    }

    public status(): QuestStatus {

        const completed: Array<QuestRequirement<Args>> = this.completed();
        return {

            current: completed.length,
            total: this._requirements.size,
        };
    }

    public completed(): Array<QuestRequirement<Args>> {

        const result: Array<QuestRequirement<Args>> = [];
        for (const requirementEntry of this._requirements.entries()) {

            const requirement: QuestRequirement<Args> = requirementEntry[0];
            const requirementResult: boolean = requirementEntry[1];

            if (requirementResult) {
                result.push(requirement);
            }
        }
        return result;
    }

    public uncompleted(): Array<QuestRequirement<Args>> {

        const result: Array<QuestRequirement<Args>> = [];
        for (const requirementEntry of this._requirements.entries()) {

            const requirement: QuestRequirement<Args> = requirementEntry[0];
            const requirementResult: boolean = requirementEntry[1];

            if (!requirementResult) {
                result.push(requirement);
            }
        }
        return result;
    }

    public execute(...args: Args): boolean {

        for (const requirementEntry of this._requirements.entries()) {

            const requirement: QuestRequirement<Args> = requirementEntry[0];
            const result: boolean = requirementEntry[1];

            if (!result) {

                const executeResult: boolean = requirement.execute(...args);
                if (executeResult) {
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

    public clone(): Quest<Args> {

        return new Quest(this._requirements.keys());
    }
}
