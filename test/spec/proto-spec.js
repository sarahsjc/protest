describe("Proto", function () {
    beforeEach(function () {
        window.Rules = {
            adult:[Person, 'age',
                {name:Is.anyOf(String), age:Is.rangeOf(18, 100), gender:Is.enumOf('male', 'female')}]
        };
    });
    afterEach(function () {
        delete window.Rules;
    });

    describe("init", function () {
        it("should init correct valid proto", function () {
            var proto = new PT.Proto('adult', Person, true);
            expect(proto.name).toBe('adult');
            expect(proto.klass).toBe(Person);
            expect(proto.rule).not.toBeUndefined();
            expect(proto.isValid).toBe(true);
        });

        it("should init correct invalid proto", function () {
            var proto = new PT.Proto('adult', Person, false);
            expect(proto.name).toBe('adult');
            expect(proto.klass).toBe(Person);
            expect(proto.rule).not.toBeUndefined();
            expect(proto.isValid).toBe(false);
        });
    });

    describe("manufacturing", function () {
        describe("valid proto", function () {
            it("should create a valid proto by constructor", function () {
                var proto = new PT.Proto('adult', Person, true);
                check(function () {
                    var person = proto.manufacture();
                    expect(person.age >= 18 && person.age <= 100).toBeTruthy();
                    expect(person.gender == 'male' || person.gender == 'female').toBeTruthy();
                    expect(typeof person.name).toBe('string');
                });
            });

            it("should create a valid proto by constructor and set", function () {
                window.Rules.adult[2].nation = Is.enumOf('PRC', 'USA');

                var proto = new PT.Proto('adult', Person, true);
                check(function () {
                    var person = proto.manufacture();
                    expect(person.age >= 18 && person.age <= 100).toBeTruthy();
                    expect(person.gender == 'male' || person.gender == 'female').toBeTruthy();
                    expect(typeof person.name).toBe('string');
                    expect(person.nation == 'PRC' || person.nation == 'USA').toBeTruthy();
                });
            });
        });

        describe("invalid proto", function () {
            it("should create according to one key field", function () {
                var proto = new PT.Proto('adult', Person, false);
                check(function () {
                    var person = proto.manufacture();
                    expect(person.age >= 18 && person.age <= 100).toBeFalsy();
                    expect(person.gender == 'male' || person.gender == 'female').toBeTruthy();
                    expect(typeof person.name).toBe('string');
                });
            });

            it("should create according to multiple key field", function () {
                window.Rules.adult = [Person, 'age', 'nation',
                    {name:Is.anyOf(String), age:Is.rangeOf(18, 100), gender:Is.enumOf('male', 'female'), nation:Is.enumOf('PRC', 'USA')}];

                var proto = new PT.Proto('adult', Person, false);
                check(function () {
                    var person = proto.manufacture();
                    var ageCheck = person.age >= 18 && person.age <= 100;
                    var nationCheck = person.nation == 'PRC' || person.nation == 'USA';
                    expect(ageCheck && nationCheck).toBeFalsy();
                });
            });
        });
    });
});