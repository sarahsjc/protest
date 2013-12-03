describe("ValueRule", function () {
    describe("manufacturing", function () {
        describe("range value rule", function () {
            it("should create a valid value", function () {
                var valueRule = new PT.VR.RangeValueRule([0, 10]);
                check(function () {
                    var validValue = valueRule.manufacture().valid();
                    expect(validValue >= 0 && validValue <= 10).toBeTruthy();
                });
            });

            it("should create an invalid value", function () {
                var valueRule = new PT.VR.RangeValueRule([0, 10]);
                check(function () {
                    var invalidValue = valueRule.manufacture().invalid();
                    expect(invalidValue >= 0 && invalidValue <= 10).toBeFalsy();
                });
            });
        });

        describe("enum value rule", function () {
            it("should create a valid value", function () {
                var valueRule = new PT.VR.EnumValueRule(['A', 'B']);
                check(function () {
                    var validValue = valueRule.manufacture().valid();
                    expect(validValue == 'A' || validValue == 'B').toBeTruthy();
                });
            });

            it("should create an invalid value", function () {
                var valueRule = new PT.VR.EnumValueRule(['A', 'B']);
                check(function () {
                    var invalidValue = valueRule.manufacture().invalid();
                    expect(invalidValue).toBeUndefined();
                });
            });
        });

        describe("any value rule", function () {
            it("should create a valid string", function () {
                var valueRule = new PT.VR.AnyValueRule(String);
                check(function () {
                    var validValue = valueRule.manufacture().valid();
                    expect(typeof validValue == 'string').toBeTruthy();
                });
            });

            it("should create a valid number", function () {
                var valueRule = new PT.VR.AnyValueRule(Number);
                check(function () {
                    var validValue = valueRule.manufacture().valid();
                    expect(typeof validValue == 'number').toBeTruthy();
                });
            });

            it("should create an invalid value", function () {
                var valueRule = new PT.VR.AnyValueRule(String);
                check(function () {
                    var invalidValue = valueRule.manufacture().invalid();
                    expect(invalidValue).toBeUndefined();
                });
            });
        });

        describe("equal value rule", function () {
            it("should create a valid value", function () {
                var valueRule = new PT.VR.EqualValueRule('value');
                check(function () {
                    var validValue = valueRule.manufacture().valid();
                    expect(validValue == 'value').toBeTruthy();
                });
            });

            it("should create an invalid value", function () {
                var valueRule = new PT.VR.EqualValueRule('value');
                check(function () {
                    var invalidValue = valueRule.manufacture().invalid();
                    expect(invalidValue).toBeUndefined();
                });
            });
        });
    });
});