import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comList, setComList] = useState([]);
    const [newComLoading, setNewComLoading] = useState(false);
    const [offset, setOffset] = useState(192);
    const [comEnded, setComEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {

        initial ? setNewComLoading(false) : setNewComLoading(true);

        getAllComics(offset)
            .then(onComListLoaded)
    }

    const onComListLoaded = (newComList) => {

        let ended = false;

        if (newComList.lenght < 8) {
            ended = true;
        }

        setComList(charList => [...charList, ...newComList]);
        setNewComLoading(false);
        setOffset(offset + 8);
        setComEnded(ended);
    }

    const renderItems = (arr) => {

        const items = arr.map((item, i) => {

            return (
                <>
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                            <div className="comics__item-name">
                                {item.title}
                            </div>
                            <div className="comics__item-price">
                                {item.price}
                            </div>
                        </Link>
                    </li>
                </>
            )
        });
        // эта конструкция для центровки спиннера / ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newComLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newComLoading}
                style={{ 'display': comEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;