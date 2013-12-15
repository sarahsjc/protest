PT = window.PT || {};

PT.VR = (function () {
    function ValueRule() {}

    function RangeValueRule(range) {
        this.range = range;
    }

    RangeValueRule.prototype = new ValueRule();

    RangeValueRule.prototype.manufacture = function() {
        var self = this;
        var size = self.range[1] - self.range[0];
        var random = Math.floor(Math.random() * (size + 1));
        return {
            valid : function() {
                return random + self.range[0];
            },
            invalid : function() {
                var isGreaterThanMax = Math.floor(Math.random() * 2);
                return isGreaterThanMax ? self.range[1] + random + 1 : self.range[0] - random - 1;
            }
        };
    };

    function EnumValueRule(enums) {
        this.enums = enums;
    }

    EnumValueRule.prototype = new ValueRule();

    EnumValueRule.prototype.manufacture = function() {
        var self = this;

        return {
            valid: function() {
                var random = Math.floor(Math.random() * self.enums.length);
                return self.enums[random];
            },
            invalid: function() {
                return genUndefined();
            }
        }
    };

    function AnyValueRule(klass) {
        this.klass = klass;
    }

    AnyValueRule.prototype = new ValueRule();

    AnyValueRule.prototype.manufacture = function() {
        var self = this;

        return {
            valid: function() {
                var random = Math.floor(Math.random() * 100000000);
                return self.klass(random);
            },
            invalid: function() {
                return genUndefined();
            }
        }
    };

    function EqualValueRule(value) {
        this.value = value;
    }

    EqualValueRule.prototype = new ValueRule();

    EqualValueRule.prototype.manufacture = function() {
        var self = this;

        return {
            valid: function() {
                return self.value;
            },
            invalid: function() {
                return genUndefined();
            }
        }
    };

    function ListValueRule(clazz, number) {
        this.clazz = clazz;
        this.number = number;
    };

    ListValueRule.prototype = new ValueRule();

    ListValueRule.prototype.manufacture = function() {
        var self = this;
        return {
            valid: function() {
                var target = [];
                for (i=0;i<self.number;i++){
                    if (self.clazz.name === "String" || self.clazz.name === "Number" || self.clazz.name === "Boolean") {
                        target.push(Is.anyOf(self.clazz).manufacture().valid());
                    } else if (self.clazz.name !== "Object"){
                        target.push(Is.kindOf(self.clazz).manufacture().valid());
                    } else {
                        target.push(new Object());
                    }

                }
                return target;
            },
            invalid: function() {
                return genUndefined();
            }
        }
    };

//    function KindValueRule(clazz) {
//        this.clazz =  clazz;
//    }
//
//    KindValueRule.prototype = new ValueRule();
//
//    KindValueRule.prototype.manufacture = function() {
//        var self = this;
//
//        return {
//            valid: function() {
//                var obj = new self.clazz();
//                for(var i in obj){
//                    obj[i] = Is.anyOf(typeof(i)).manufacture().valid();
//                }
//                return obj;
//            },
//            invalid: function() {
//                return genUndefined();
//            }
//        }
//
//    };

    function genUndefined() {
        return {}['undefined'];
    }

    return {
        RangeValueRule: RangeValueRule,
        EnumValueRule: EnumValueRule,
        AnyValueRule: AnyValueRule,
        EqualValueRule: EqualValueRule,
        KindValueRule: KindValueRule,
        ListValueRule:ListValueRule
    }
})();