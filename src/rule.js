PT = window.PT || {};

PT.Rule = (function (external) {
    external.Rules = external.Rules || {};

    function Rule(name, klass, keyFields, valueRules) {
        this.name = name;
        this.klass = klass;
        this.keyFields = keyFields;
        this.constructorParams = detectConstructorParams(klass);
        this.valueRules = valueRules;
    }

    // json in format: [Person, 'name', 'age', 'gender', {}]
    function parseRule(name, klass, json) {
        var keyFields = json.slice(1, json.length - 1);
        var valueRules = json.length == 1 ? {} : json[json.length - 1];
        return new Rule(name, klass, keyFields, valueRules);
    }

    function detectConstructorParams(klass) {
        var klassDesc = klass.toString();
        var constructorParams = klassDesc.match(/.*?\((.*?)\)/)[1];
        return constructorParams.replace(/\s/g, '').split(',');
    }

    Rule.parse = function(ruleName, klass) {
        var ruleJson = external.Rules[ruleName];
        if(ruleJson[0] != klass) {
            throw 'Should pass same class as configuration in rules when parsing rule.'
        }
        return parseRule(ruleName, klass, ruleJson);
    };

    return Rule;

}(window));