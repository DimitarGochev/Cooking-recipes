import { Recipe } from "./models/Recipe";

export type IdType = number;

export interface Identifiable {
    id: IdType;
}

export interface RecipeListener {
    (post: Recipe): void;
}