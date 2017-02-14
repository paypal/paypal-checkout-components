"use strict";

var express = require('express');
var server = require('./server');

const PORT = 8002;

express().use('/checkout', server()).listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}/checkout`);
});
