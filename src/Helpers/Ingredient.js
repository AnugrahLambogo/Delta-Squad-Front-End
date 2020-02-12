
import config from "../config";
import TokenService from './Token'


const IngredientHelper = {

  addIngredient(ingredientData) {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/pantry`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: ingredientData
    }).then(res => {
      console.log('res from POST is', res);
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    }
    );
  },

  updateRecipe(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/recipes/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }
}


export default IngredientHelper;
