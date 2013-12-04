PT = window.PT || {};

PT.Proto = (function (Rule) {
    function Proto(name, klass, isValid) {
        this.name = name;
        this.klass = klass;
        this.rule = Rule.parse(name, klass);
        this.isValid = isValid;
    }

    Proto.prototype.manufacture = function () {
        return createClassInstance(this.rule, this.isValid);
    };

    function createClassInstance(rule, isValid) {
        var constructorParams = rule.constructorParams;
        var params = [rule.klass];
        var invalidHolder = [];

        for (var index in constructorParams) {
            var field = constructorParams[index];
            var valueRule = rule.valueRules[field];
            params.push(manufactureValue(isValid, field, rule, valueRule, invalidHolder));
        }
        var instance = new (rule.klass.bind.apply(rule.klass, params))();

        var valueRuleKeys = objectKeys(rule.valueRules);
        var fieldShouldSetDirectly = setSub(valueRuleKeys, constructorParams);

        for (var index in fieldShouldSetDirectly) {
            var field = fieldShouldSetDirectly[index];
            var valueRule = rule.valueRules[field];
            instance[field] = manufactureValue(isValid, field, rule, valueRule, invalidHolder);
        }

        return instance;
    }

    function manufactureValue(isValid, field, rule, valueRule, invalidHolder) {
        if(!isValid && inArray(rule.keyFields, field) && randomlyInvalid(rule.keyFields, field, invalidHolder)) {
            return valueRule.manufacture().invalid();
        }
        return valueRule.manufacture().valid();
    }

    function randomlyInvalid(keyFields, field, holder) {
        holder.noInvalid = typeof holder.noInvalid == 'undefined' ? true : holder.noInvalid;
        var invalid = !!Math.floor(Math.random() * 2);

        if (holder.length + 1 == keyFields.length && holder.noInvalid) {
            invalid = true;
        }

        holder.push(field);
        if (invalid) holder.noInvalid = false;
        return invalid;

    }

    function objectKeys(object) {
        var keys = [];
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    function setSub(set1, set2) {
        var result = [];
        for (var idx in set1) {
            var value = set1[idx];
            if (!inArray(set2, value)) {
                result.push(value);
            }
        }
        return result;
    }

    function inArray(array, element) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] == element) {
                return true;
            }
        }
        return false;
    }

    return Proto;

}(PT.Rule));