describe("ProtoTest", function () {
    beforeEach(function () {
        window.Rules = {
            adult:[Person, 'age',
                {name:Is.anyOf(String), age:Is.rangeOf(18, 100), gender:Is.enumOf('male', 'female')}]
        };
    });
    afterEach(function () {
        delete window.Rules;
    });
    describe("export global variable", function () {
        it("should export _for", function () {
            expect(typeof window._for).toBe('function');
            expect(window._for).toBe(PT.fn._for);
        });

        it("should export all", function () {
            expect(typeof window.all).toBe('function');
            expect(window.all).toBe(PT.fn.all);
        });

        it("should export valid", function () {
            expect(typeof window.valid).toBe('function');
            expect(window.valid).toBe(PT.fn.valid);
        });

        it("should export invalid", function () {
            expect(typeof window.invalid).toBe('function');
            expect(window.invalid).toBe(PT.fn.invalid);
        });
    });

    describe("valid & invalid", function () {
        it("should delegate valid proto", function () {
            var proto = PT.fn.valid('adult', Person);

            expect(proto instanceof PT.Proto);
            expect(proto.name).toBe('adult');
            expect(proto.klass).toBe(Person);
            expect(proto.isValid).toBeTruthy();
        });

        it("should delegate invalid proto", function () {
            var proto = PT.fn.invalid('adult', Person);

            expect(proto instanceof PT.Proto);
            expect(proto.name).toBe('adult');
            expect(proto.klass).toBe(Person);
            expect(proto.isValid).toBeFalsy();
        });
    });

    describe("all", function () {
        it("should list all protos", function () {
            var proto0 = PT.fn.valid('adult', Person);
            var proto1 = PT.fn.invalid('adult', Person);
            var protos = PT.fn.all(proto0, proto1);
            expect(protos.length).toBe(2);
            expect(protos[0]).toBe(proto0);
            expect(protos[1]).toBe(proto1);
        });
    });

    describe("_for", function () {
        it("should generate instances and pass to callback in loop", function () {
            var protos = [PT.fn.valid('adult', Person), PT.fn.invalid('adult', Person)];

            PT.fn._for(protos, function (adult, invalidAdult) {
                expect(adult.age >= 18 && adult.age <= 100).toBeTruthy();
                expect(invalidAdult.age >= 18 && invalidAdult.age <= 100).toBeFalsy();
            });
        });
    });
});