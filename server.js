'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));


app.listen(8000, () =>{console.log('server is listening at 8000')})