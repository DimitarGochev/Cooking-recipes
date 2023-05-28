import { Recipe } from '../models/Recipe';
import { Api, ApiClient } from "./api-client";

export interface RecipesService extends Api<Recipe> {}

export const RecipesClientService = new ApiClient<Recipe>('recipes');