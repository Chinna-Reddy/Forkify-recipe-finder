import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the App
* - Search Object
* - current recipe object
* - Shopping list object
*- liked recipes
*/

const state = {};
/** Search Controller**/

const controlSearch = async () => {
	//1. Get query from view
	const query = searchView.getInput();

	if (query) {
		//2. new search object and add to state
		state.search = new Search(query);

		//3. prepare UI for result
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			//4. search for recipes
			await state.search.getresults();

			//5. Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);

		} catch (err) {
			alert('Something wrong with the search..');
			clearLoader();

		}
		
	}
}

elements.searchform.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage, 10);
		
	}

});

/** Recipe Controller**/
const controlRecipe = async () => {
	//Get Id from URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		//prepare UI for changes

		//Create new recipe object
		state.recipe = new Recipe(id);

		try {
			//Get Recipe Data
			await state.recipe.getRecipe();

			//calculate servings and time

			//render recipe
			console.log(state.recipe);

		} catch (err) {
			alert('Error Processing Recipe!');
		}		


	}
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
