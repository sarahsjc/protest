function check(tester, times) {
    times = times || 100;
    for (var i = 0; i < times; i++) {
        tester();
    }
}