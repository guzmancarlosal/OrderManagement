/* eslint-disable no-console */
import { parse } from 'fast-csv';
import fs from 'fs';

const HEADERS = ['Model Number', 'Unit Price', 'Quantity'];

export const validateCSV = (path) =>
  new Promise((resolve, reject) => {
    const errors = [];
    let index = 0;
    fs.createReadStream(path)
      .pipe(parse({ headers: true }))
      .on('error', (error) => errors.push(error.message))
      .on('headers', (headers) => {
        if (headers.length !== HEADERS.length) {
          errors.push('Wrong Headers in CSV');
          return resolve({ valid: false, errors });
        }
        if (!headers.every((h) => HEADERS.includes(h))) {
          errors.push('Wrong Headers in CSV');
          return resolve({ valid: false, errors });
        }
      })
      .on('data', (row) => {
        index++;
        for (let header of HEADERS) {
          if (!row[header]) {
            errors.push(`ROW-${index}: missing ${header} data`);
          }
        }
      })
      .on('end', (rowCount) => {
        resolve({ valid: errors.length === 0, errors });
      });
  });

export const deleteCSV = async (path) =>
  new Promise((resolve) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
      resolve();
    });
  });
