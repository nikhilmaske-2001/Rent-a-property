import './App.css';
import Header from './components/Header';
import Products from "./components/Products";
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <Products />
    </div>
  );
}

export default App;
