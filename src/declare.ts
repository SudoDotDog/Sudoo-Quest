/**
 * @author WMXPY
 * @namespace Quest
 * @description Declare
 */

export type QuestRequirementFunction<Args extends any[] = []> = (...args: Args) => boolean;
