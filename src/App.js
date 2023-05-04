import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import QuestionGenerator from './components/QuestionGenerator/QuestionGenerator';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-between">
      <Navbar />
      <QuestionGenerator />
      <Footer />
    </div>
  );
}

export default App;
