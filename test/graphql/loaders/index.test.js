import DataLoader from 'dataloader';

class Repository {
    constructor(loadFunction) {
        this.loadFunction = loadFunction;
    }

    load(key) {
        return this.loadFunction(key);
    }
}

describe('data loader', () => {
    test('SHOULD BATCH REQUESTS', async () => {
        const loadFunction = jest.fn().mockResolvedValue(['keyOne:value', 'keyTwo:value', 'keyThree:value']);
        // const loader = new Repository(loadFunction);
        const loader = new DataLoader((keys) => loadFunction(keys));

        await Promise.all([
            loader.load('keyOne'),
            loader.load('keyTwo'),
            loader.load('keyThree'),
        ]);

        expect(loadFunction).toHaveBeenCalledTimes(1);
    });

    test('MUST RETURN A PROMISE', async () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const resolver = (keys) => keys.map((key) => `${key}:value`);
        const loader = new DataLoader((keys) => resolver(keys));
        // const loader = new DataLoader((keys) => Promise.resolve(resolver(keys)));

        const value1 = await loader.load('keyOne');
        const value2 = await loader.load('keyTwo');

        expect(value1).toBe('keyOne:value');
        expect(value2).toBe('keyTwo:value');
    });

    // TODO: link to how we are doing this in Postgres
    test('SHOULD MAINTAIN ORDER', async () => {
        const keys = ['keyOne', 'keyTwo', 'keyThree'];
        const values = ['keyOne:value', 'keyTwo:value', 'keyThree:value'];
        const unordered = jest.fn().mockResolvedValue(values.toReversed());
        // const ordered = jest.fn().mockResolvedValue(values);
        const loader = new DataLoader((ks) => unordered(ks));

        const actualValues = await Promise.all([
            loader.load(keys[0]),
            loader.load(keys[1]),
            loader.load(keys[2]),
        ]);

        expect(actualValues).toStrictEqual(values);
    });

    // TODO: link to how we are doing this in Postgres
    test('REQUEST KEYS AND RESPONSE VALUES SHOULD HAVE SAME LENGTH', async () => {
        const keyValueMap = new Map([
            ['keyOne', 'valueOne'],
            ['keyTwo', 'valueTwo'],
            ['keyFour', 'valueFour'],
        ]);

        const selectWhereKeyIn = (keys) => {
            const values = [];

            keys.forEach((key) => {
                if (keyValueMap.has(key)) {
                    const val = keyValueMap.get(key);

                    values.push(val);
                }
            });

            return Promise.resolve(values);
        };
        const loader = new DataLoader((keys) => selectWhereKeyIn(keys));

        const [valueOne, valueTwo, valueThree, valueFour] = await Promise.all([
            loader.load('keyOne'),
            loader.load('keyTwo'),
            loader.load('keyThree'),
            loader.load('keyFour'),
        ]);

        expect(valueOne).toBe('valueOne');
        expect(valueTwo).toBe('valueTwo');
        expect(valueThree).toBeUndefined();
        expect(valueFour).toBe('valueFour');
    });

    test.todo('CUSTOM CACHE KEY FUNCTION -- FOR EXAMPLE, IF THE KEY IS AN OBJECT');
});

