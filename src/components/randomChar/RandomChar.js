import { Component } from 'react';
import MarvelService from '../../services/MarvelService'

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading()
        this.marvelService
            .getCaracter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar" >
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Случайный персонаж на сегодня!
                        Вы хотите узнать его получше?
                    </p>
                    <p className="randomchar__title">
                        Или выберите другой
                    </p>
                    <button
                        className="button button__main"
                        onClick={this.updateChar}
                    >
                        <div className="inner">обновить</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {

    const { name, description, thumbnail, hompage, wiki } = char;
    let objFit = null;

    if (thumbnail.indexOf('image_not_available.jpg') > 0) {
        objFit = { objectFit: "contain" };
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={objFit} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description || 'no data =('}
                </p>
                <div className="randomchar__btns">
                    <a href={hompage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;