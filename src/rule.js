PT = window.PT || {};

PT.Rule = (function (root) {
    function Rule(name, klass, constructorParams, valueRules) {
        this.name = name;
        this.klass = klass;
        this.constructorParams = constructorParams;
        this.valueRules = valueRules;
    }

    // json in format: [Person, 'name', 'age', 'gender', {}]
    function parseRule(name, json) {
        var klass = json[0];
        var constructorParams = json.slice(1, json.length - 1);
        var valueRules = json.length == 1 ? {} : json[json.length - 1];
        return new Rule(name, klass, constructorParams, valueRules);
    }

    Rule.parse = function(ruleName) {
        var ruleJson = root.Rules[ruleName];
        return parseRule(ruleName, ruleJson);
    };

    return Rule;

}(window));