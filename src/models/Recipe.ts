import { IdType } from "../common-types";

export class RecipeCreateDto {
    constructor(
        public title: string,
        public author: string,
        public shortDescription: string,
        public cookingTime: number,
        public productsNeeded: string[],
        public imageURL: string,
        public fullDescription: string,
        public tags: string[],
        public dateOfCreation: Date,
        public dateOfLastModification: Date) { }
}

export class Recipe extends RecipeCreateDto {
    constructor(
        public id: IdType,
        author: string,
        title: string,
        shortDescription: string,
        cookingTime: number,
        productsNeeded: string[],
        imageURL: string,
        fullDescription: string,
        tags: string[],
        dateOfCreation: Date,
        dateOfLastModification: Date) {
        super(title, author, shortDescription, cookingTime, productsNeeded, imageURL, fullDescription, tags, dateOfCreation, dateOfLastModification);
    }
}