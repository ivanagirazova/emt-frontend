import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Routes} from "react-router-dom";
import Books from "../Books/BookList/Books";
import ELibraryService from "../../repository/eLibraryRepository";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: []
        };
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/books"} exact element={<Books books={this.state.books} onDelete={this.deleteBook}/>}/>
                            <Route path={"/"} exact element={<Books books={this.state.books}/>}/>
                            <Route path={"/categories"} exact element={<Categories categories={this.state.categories}/>}/>
                            {/*<Redirect to={"/books"}/>*/}
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }

    loadBooks = () => {
        ELibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        ELibraryService.fetchCategories()
            .then((data) => {
                this.setState( {
                    categories: data.data
                })
            })
    }

    deleteBook = (id) => {
        ELibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
    }

}

export default App;
