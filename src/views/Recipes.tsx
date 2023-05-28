import React, { useMemo, useState } from "react";
import { Recipe } from "../models/Recipe";
import { NavLink, useSearchParams } from "react-router-dom";
import ErrorBoundary from "../util/ErrorBoundary";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { RecipesClientService } from "../services/recipes-service";

const Recipes = () => {
  // const filteredRecipes = useMemo(
  //   () =>
  //     recipes.filter((recipe) => (!filter ? true : recipe.status === filter)),
  //   [recipes, filter]
  // );

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  let [searchParams, setSearchParams] = useSearchParams();

  useAsyncEffect(async () => {
    try {
      const allRecipes = await RecipesClientService.findAll();
      console.log(allRecipes);
      setRecipes(allRecipes);
      return allRecipes;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>Recipes List</h1>
      <div className="RecipeList">
        {recipes.map((recipe: Recipe) => (
          <ErrorBoundary key={recipe.id}>
            <NavLink
              to={{
                pathname: `/recipes/${recipe?.id}`,
                search: searchParams.toString(),
              }}
              relative="path"
            >
              {({ isActive }) => (
                <span className={isActive ? "active" : undefined}>
                  {recipe.title}
                </span>
              )}
            </NavLink>
          </ErrorBoundary>
        ))}
      </div>
    </>
  );
};

export default Recipes;
