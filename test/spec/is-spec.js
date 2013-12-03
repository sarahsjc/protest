describe("Is", function () {
    describe("export global variables", function () {
        it("should export 'Is' to window", function () {
            expect(window.Is).toBe(PT.Is);
        });
    });

    describe("delegate value rule", function () {
        it("should create RangeValueRule by rangeOf", function () {
            var valueRange = PT.Is.rangeOf([0, 10]);
            expect(valueRange instanceof PT.VR.RangeValueRule).toBeTruthy();
        });

        it("should create EnumValueRule by enumOf", function () {
            var valueRange = PT.Is.enumOf(['A', 'B', 'C']);
            expect(valueRange instanceof PT.VR.EnumValueRule).toBeTruthy();
        });

        it("should create AnyValueRule by anyOf", function () {
            var valueRange = PT.Is.anyOf(String);
            expect(valueRange instanceof PT.VR.AnyValueRule).toBeTruthy();
        });

        it("should create EqualValueRule by equal", function () {
            var valueRange = PT.Is.equal('value');
            expect(valueRange instanceof PT.VR.EqualValueRule).toBeTruthy();
        });
    });
});