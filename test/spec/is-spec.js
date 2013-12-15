describe("Is", function () {
    describe("export global variables", function () {
        it("should export 'Is' to window", function () {
            expect(window.Is).toBe(PT.Is);
        });
    });

    describe("delegate value rule", function () {
        it("should create RangeValueRule by rangeOf", function () {
            var valueRange = PT.Is.rangeOf(0, 10);
            expect(valueRange instanceof PT.VR.RangeValueRule).toBeTruthy();
            expect(valueRange.range[0]).toBe(0);
            expect(valueRange.range[1]).toBe(10);
        });

        it("should create EnumValueRule by enumOf", function () {
            var valueRange = PT.Is.enumOf('A', 'B', 'C');
            expect(valueRange instanceof PT.VR.EnumValueRule).toBeTruthy();
            expect(valueRange.enums[0]).toBe('A');
            expect(valueRange.enums[1]).toBe('B');
            expect(valueRange.enums[2]).toBe('C');
        });

        it("should create AnyValueRule by anyOf", function () {
            var valueRange = PT.Is.anyOf(String);
            expect(valueRange instanceof PT.VR.AnyValueRule).toBeTruthy();
            expect(valueRange.klass).toBe(String);
        });

        it("should create EqualValueRule by equal", function () {
            var valueRange = PT.Is.equal('value');
            expect(valueRange instanceof PT.VR.EqualValueRule).toBeTruthy();
            expect(valueRange.value).toBe('value');
        });

        it("should create ListValueRule by listOf", function () {

            var valueRange = PT.Is.listOf(String, 5);
            expect(valueRange instanceof PT.VR.ListValueRule).toBeTruthy();
            expect(valueRange.number).toBe(5);
            expect(valueRange.clazz).toBe(String);
        });
    });
});