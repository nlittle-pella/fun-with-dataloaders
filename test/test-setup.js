import Chance from 'chance';

global.chance = new Chance();

afterEach(() => {
    jest.resetAllMocks();
});
