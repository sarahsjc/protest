PT = window.PT || {};

PT.Is = (function (external, VR) {
    var is = {
        rangeOf: function() {
            return new VR.RangeValueRule(arguments);
        },
        enumOf: function() {
            return new VR.EnumValueRule(arguments);
        },
        anyOf: function(klass) {
            return new VR.AnyValueRule(klass);
        },
        equal: function(value) {
            return new VR.EqualValueRule(value);
        },
        kindOf: function(clazz) {
            return new VR.KindValueRule(clazz);
        },
        listOf: function(clazz, number) {
            return new VR.ListValueRule(clazz, number);
        }
    };

    external.Is = is;

    return is;

}(window, PT.VR));