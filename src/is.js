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
        }
    };

    external.Is = is;

    return is;

}(window, PT.VR));