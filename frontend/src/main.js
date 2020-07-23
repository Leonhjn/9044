/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
import {confirm_code, confirm_response_has_keys, reset} from '../tests/api/globals.js';
import Auth from './level0.js';
import login from './login.js';
import signup from './signup.js';
import post from './post.js';

function initApp(apiUrl) {
  // your app initialisation goes here
  console.log('apiUrl', apiUrl);
  Auth(apiUrl);
  const loginElement = document.querySelector('button[data-id-login]');
  loginElement.addEventListener('click', async (e) => {
  	login(apiUrl)
  })
  const signupElement = document.querySelector('button[data-id-signup]')
  signupElement.addEventListener('click', async (e) => {
  	console.log('haha')
  	signup(apiUrl)
  })
  // const postElement = document.querySelector('button[post-id-button]')
  // postElement.addEventListener('click', async (e) => {
  //   console.log('aaa')
  //   post(apiUrl)
  // })
}
export default initApp;
