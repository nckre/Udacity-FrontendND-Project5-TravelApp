// Global Variables
import { handleSubmit } from './js/handleSubmit.js'
import { addTrip } from './js/addTrip.js'

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('trip').addEventListener('click', addTrip);
  });

import './styles/style.scss'

export {
  handleSubmit,
  addTrip
}
