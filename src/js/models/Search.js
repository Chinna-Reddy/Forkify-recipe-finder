import axios from 'axios';
import { key,proxy } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getresults() {

		try {
			// statements
			const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
			//console.log(this.result);
		} catch(error) {
			// statements
			console.log(error);
		}	

	}
}