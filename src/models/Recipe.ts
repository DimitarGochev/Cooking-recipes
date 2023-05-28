import { IdType } from "../common-types";

export class RecipeCreateDto {
    constructor(
        public authorId: IdType,
        public title: string,
        public shortDescription: string,
        public cookingTime: number,
        public productsNeeded: string[],
        public imageUrl: string,
        public fullDescription: string,
        public tags: string[],
        public dateOfCreation: Date,
        public dateOfLastModification: Date) { }
}

export class Recipe extends RecipeCreateDto {
    constructor(
        public id: IdType,
        authorId: IdType,
        title: string,
        shortDescription: string,
        cookingTime: number,
        productsNeeded: string[],
        imageUrl: string,
        fullDescription: string,
        tags: string[],
        dateOfCreation: Date,
        dateOfLastModification: Date) {
        super(authorId, title, shortDescription, cookingTime, productsNeeded, imageUrl, fullDescription, tags, dateOfCreation, dateOfLastModification);
    }
}