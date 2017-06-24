import { Locations } from '../api/sql/models';
import { createJsonRoute } from '../utils/endpoint';
import * as express from 'express';
import { Response } from 'express-serve-static-core';

const locations = new Locations();
export const getLocations = createJsonRoute(async () => {
  const locs = await locations.getAll();
  return locs;
});
