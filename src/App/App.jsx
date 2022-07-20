import React, { useEffect, useReducer } from 'react';
import './App.css';
import { Footer } from '../Components/Footer/footer.js';
import { Keyboard } from '../Components/Keyboard/keyboard.js';
import { TextBox } from '../Components/Textbox/textBox.js';
import { randCity } from '../CheckOrGenerate/randomCity.js'
import { popularCities } from '../Utils/cities.js';
import { Timerwithscore } from '../Components/Timer/timer.js';
import { reducer } from '../Utils/reducer.js';
import { HowTo } from '../Components/HowTo/howToInstruction.jsx';
import { PopUp } from '../Components/GameOverPopUp/popUp'

function App() {

  let generatedCity = randCity(popularCities);
  let nextCity = generatedCity[generatedCity.length - 2].toUpperCase();
 
  const [state, dispatch] =
    useReducer(reducer,
      {
        randomCity: generatedCity, nextCity: nextCity,
        message: '', guessed: 0, started: false, usedCities: [],
        minutes: 1, seconds: 20, gameOver: false
      });

  useEffect(() => {
    const myInterval = setInterval(() => {

        dispatch({ type: "START_TIMER"})
      
    }, 1000)
    return () => {
      clearInterval(myInterval);
    }
  },[state.seconds])

  const popUp = <PopUp guessed={state.guessed} dispatch={dispatch} />
  return (
    <>

    {state.gameOver? popUp : ''}

    <div id='score-howTo'>
      <HowTo />
      <Timerwithscore minute={state.minutes} second={state.seconds} guessed={state.guessed} dispatch={dispatch} />
      </div>  
      <div className="container">
        <div>
          <TextBox randomCity={state.randomCity} thatLetter={state.nextCity} message={state.message} dispatch={dispatch} />
        </div>
        <div id="keyBoard">
          <Keyboard dispatch={dispatch} />
        </div>
      </div>

      <div id='footer'>
        <Footer />
      </div>


    </>
  );
};

export default App;