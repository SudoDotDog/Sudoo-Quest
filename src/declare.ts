/**
 * @author WMXPY
 * @namespace Quest
 * @description Declare
 */

export type QuestRequirementFunction<Args extends any[] = []> = (...args: Args) => boolean;

export type QuestStatus = {

    readonly current: number;
    readonly total: number;
};
