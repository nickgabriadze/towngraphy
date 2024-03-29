import { ACTIONS } from "./actions.js";
import { checkCity } from "../CheckOrGenerate/checkCity.js";
import { cities } from "./cities.js";
import { randCity } from "../CheckOrGenerate/randomCity.js";
import { popularCities } from "./cities.js";

export function reducer(state, { type, char }) {

    switch (type) {

        case ACTIONS.ADD_LETTER:


            if (state.gameOver) return state;

            if (state.nextCity[state.nextCity.length - 1] === ' ') {
                return ({
                    ...state, nextCity: state.nextCity + char.toUpperCase()
                })
            }

            if (state.nextCity[state.nextCity.length - 1] === '-') {
                return ({
                    ...state, nextCity: state.nextCity + char.toUpperCase()
                })
            }

            return ({
                ...state,
                nextCity: state.nextCity + char,
                message: '', 
                wrongAnswer:''
            });

        case ACTIONS.REMOVE_LETTER:
            if (state.gameOver) return state;

            if (state.nextCity.length === 1) {
                return state;
            };
            return ({
                ...state,
                nextCity: state.nextCity.slice(0, -1),
                message: ''
            });

        case ACTIONS.ENTER:
            if (state.gameOver) return state;

            state.nextCity = state.nextCity.trim()
         

            if (state.nextCity.length === 1) {
                return state;
            }

            if (!state.started & state.enterCounter === 0) {
                state.usedCities[0] = state.randomCity;
            }

            if (!checkCity(cities, state.nextCity)) {
                return ({
                    ...state,
                    message: 'is neither a city nor a country!',
                    wrongAnswer: `${state.nextCity}`,
                    nextCity: state.randomCity[state.randomCity.length - 2].toUpperCase(),
                    enterCounter: state.enterCounter + 1,
                    
                })
            }

            if(state.usedCities[0] === state.nextCity & !state.started){
                return({
                    ...state,
                    message: "That is displayed right now!",
                    nextCity: state.randomCity[state.randomCity.length - 2].toUpperCase(),
                    enterCounter: state.enterCounter + 1
                })
            }

            if (state.usedCities[0] === state.nextCity) {
                return ({
                    ...state,
                    message: "That was displayed at the start!",
                    nextCity: state.randomCity[state.randomCity.length - 2].toUpperCase(),
                    enterCounter: state.enterCounter + 1
                })

            } else {
                for (let i = 1; i < state.usedCities.length; i++) {
                    if (state.usedCities[i] === state.nextCity) {
                        return ({
                            ...state,
                            message: "Already Said!",
                            nextCity: state.randomCity[state.randomCity.length - 2].toUpperCase(),
                            enterCounter: state.enterCounter + 1
                        })
                    }
                }
            }


            let currentCity = state.nextCity
            let nextOne = currentCity[currentCity.length - 2].toUpperCase()

            return ({
                ...state,
                randomCity: currentCity,
                nextCity: nextOne,
                started: true,
                guessed: state.guessed + 1,
                usedCities: [...state.usedCities, currentCity],
                enterCounter: state.enterCounter + 1
            });
        case ACTIONS.START_TIMER:
            if (!state.started) return state;

            if (state.seconds) {
                return ({
                    ...state,
                    seconds: state.seconds - 1
                })
            }
            if (state.minutes) {
                return ({
                    ...state,
                    minutes: state.minutes - 1,
                    seconds: 59
                })
            }
            if (state.minutes === 0 & state.seconds === 0) {
                return ({
                    ...state,
                    message: '',
                    started: false,
                    gameOver: true,
                    nextCity: '',
                    randomCity: ''
                })
            }
            break;
        case ACTIONS.RESTART:

            let generatedCity = randCity(popularCities);
            let nextCity = generatedCity[generatedCity.length - 2].toUpperCase();


            return ({
                ...state,
                randomCity: generatedCity, nextCity: nextCity,
                message: '', guessed: 0, started: false, usedCities: [],
                minutes: 1, seconds: 40, gameOver: false,
                enterCounter: 0, wrongAnswer: ''
            })



        default: return state;
    }
}