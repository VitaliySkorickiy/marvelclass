import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;

        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ char }) => {

    const { description, thumbnail, hompage, wiki, comics } = char;

    let objFit = null;

    if (thumbnail.indexOf('image_not_available.jpg') > 0) {
        objFit = { objectFit: "contain" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={'name'} style={objFit} />
                <div>
                    <div className="char__info-name">{'name'}</div>
                    <div className="char__btns">
                        <a href={hompage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list">

                {comics.length > 0 ? null : 'no comics =('}

                {
                    comics.slice(0, 10).map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;