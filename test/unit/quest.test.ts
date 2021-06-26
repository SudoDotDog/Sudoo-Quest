/**
 * @author WMXPY
 * @namespace Quest
 * @description Quest
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Quest } from "../../src/quest";

describe('Given {Quest} Class', (): void => {

    const chance: Chance.Chance = new Chance('quest-quest');

    it('should be able to create and complete simple requirements', (): void => {

        const firstCondition: string = chance.string();
        const secondCondition: string = chance.string();

        const quest: Quest<[value: number]> = Quest.create();

        quest.requires(firstCondition, (value: number) => value >= 1);
        quest.requires(secondCondition, (value: number) => value >= 2);

        expect(quest.progress()).to.be.equal(0 / 2);

        quest.execute(1);

        expect(quest.progress()).to.be.equal(1 / 2);

        quest.execute(2);

        expect(quest.progress()).to.be.equal(2 / 2);
    });
});
