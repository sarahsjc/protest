PT = window.PT || {};

PT.fn = (function (external, Proto) {
    var MAX_LOOP_SIZE = 100;
    var fn = {
        _for: function(protos, run) {
            for(var i=0;i<MAX_LOOP_SIZE;i++) {
                var instances = [];
                for(var j=0;j<protos.length;j++) {
                    instances.push(protos[j].manufacture());
                }
            }
            run.apply(window, instances);
        },
        all: function() {
            var protos = arguments;
            return protos;
        },
        valid: function(name, klass) {
            return new Proto(name, klass, true);
        },
        invalid: function(name, klass) {
            return new Proto(name, klass, false);
        }
    };

    external._for = fn._for;
    external.all = fn.all;
    external.valid = fn.valid;
    external.invalid = fn.invalid;

    return fn;

}(window, PT.Proto));