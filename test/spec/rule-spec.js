describe("Rule", function () {
    var ruleName = 'adult';
    var ruleClass = Person;
    var keyFields = ['age'];
    var valueRules = {name: Is.anyOf(String), age: Is.rangeOf(18, 100), gender: Is.enumOf('male', 'female')};

    it("should set correct properties when init rule", function () {
        var rule = new PT.Rule(ruleName, ruleClass, keyFields, valueRules);
        expect(rule.name).toBe('adult');
        expect(rule.klass).toBe(Person);
        expect(rule.keyFields).toBe(keyFields);
        expect(rule.constructorParams).toEqual(['name', 'age', 'gender']);
        expect(rule.valueRules).toBe(valueRules);
    });

    it("should parse a rule json to rule instance", function () {
        window.Rules = {
            adult: [Person, 'age', valueRules]
        };
        var rule = PT.Rule.parse(ruleName);

        expect(rule.name).toBe('adult');
        expect(rule.klass).toBe(Person);
        expect(rule.keyFields).toEqual(keyFields);
        expect(rule.constructorParams).toEqual(['name', 'age', 'gender']);
        expect(rule.valueRules).toEqual(valueRules);
    });
});