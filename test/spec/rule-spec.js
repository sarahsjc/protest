describe("Rule", function () {
    var ruleName = 'adult';
    var ruleClass = Person;
    var constructorParams = ['name', 'age', 'gender'];
    var valueRules = {name: Is.anyOf(String), age: Is.rangeOf(0, 100), gender: Is.enumOf('male', 'female')};

    it("should set correct properties when init rule", function () {
        var rule = new PT.Rule(ruleName, ruleClass, constructorParams, valueRules);
        expect(rule.name).toBe('adult');
        expect(rule.klass).toBe(Person);
        expect(rule.constructorParams).toBe(constructorParams);
        expect(rule.valueRules).toBe(valueRules);
    });

    it("should parse a rule json to rule instance", function () {
        window.Rules = {
            adult: [Person, 'name', 'age', 'gender', valueRules]
        };
        var rule = PT.Rule.parse(ruleName);

        expect(rule.name).toBe('adult');
        expect(rule.klass).toBe(Person);
        expect(rule.constructorParams).toEqual(constructorParams);
        expect(rule.valueRules).toEqual(valueRules);
    });
});