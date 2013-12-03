PT = window.PT || {};

PT.Is = (function (external, VR) {
    var is = {
        rangeOf: function(range) {
            return new VR.RangeValueRule(range);
        },
        enumOf: function(enums) {
            return new VR.EnumValueRule(enums);
        },
        anyOf: function(klass) {
            return new VR.AnyValueRule(klass);
        },
        equal: function(value) {
            return new VR.EqualValueRule(value);
        }
    };

    external.Is = is;

    return is;

}(window, PT.VR));