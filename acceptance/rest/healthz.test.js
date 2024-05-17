describe('GET /healthz', () => {
    test('should return an ok response from healthz', async () => {
        const response = await fetch('http://localhost:5130/healthz', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();

        expect(json.sql).toBe('ok');
    });
});
