import request from 'supertest';
import express from 'express';
import { indexHandler } from '../routes';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

const app = express();

app.get('/index', indexHandler);

describe('index', () => {
  it('satisfies contracts', () => {
    const schema = require('buildkite-demo-client-contracts/contracts/buildkite-demo-server/index.get.contract.json');
    return request(app)
    .get('/index')
    .expect(function(res) {
      expect(res.body).toMatchSchema(schema);
    });
  });
});
